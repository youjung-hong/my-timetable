import UI_TEMPLATE from './template/TimetableTemplate'
import { TaskItemList } from '../TaskItemList/TaskItemList'
import TaskItemDomUtil from '../TaskItemDomUtil/TaskItemDomUtil'
import { TaskItem } from '../TaskItem/TaskItem'

/**
 * @class
 * @constructor
 * @param {string} id - root element id
 * @param {TaskItem[]} items - task items
 * @param {meta: any => void} onClickTimeLogBar - call when click time log bar
 * @example
 * const timetable = new Timetable('root');
 * @example
 * const timetable = new Timetable('root', [new TaskItem()])
 * @example
 * const timetable = new Timetable('root', [new TaskItem()], { id: 1 })
 */
export class Timetable {
  rootElement: HTMLElement
  onClickTimeLogBar: (meta: any) => void
  list: TaskItemList
  eventHandlerMap: Map<Element, EventListenerOrEventListenerObject>
  constructor(id: string, items?: TaskItem[], onClickTimeLogBar?: (meta: any) => void) {
    this.rootElement = document.getElementById(id)

    if (this.rootElement) {
      this.rootElement.className = 'root'
      this.rootElement.innerHTML = UI_TEMPLATE
    }

    this.onClickTimeLogBar = onClickTimeLogBar || (() => {})

    this.list = new TaskItemList(items)

    this.eventHandlerMap = new Map<Element, EventListenerOrEventListenerObject>();
    this.drawItems(this.list.items)
  }

  /**
   * insert new item and draw it on timetable
   * @param {TaskItem} item - a new item
   */
  insert(item: TaskItem) {
    this.list.add(item)
    this.drawItem(item)
  }

  /**
   * update an item and redraw it on timetable
   * @param {TaskItem} item - an existing item to update
   */
  update(item: TaskItem) {
    this.list.update(item)
    this.eraseItem(item.id)
    this.drawItem(item)
  }

  /**
   * delete an item and erase it on timetable
   * @param {TaskItem} item - an existing item to delete
   */
  delete(item: TaskItem) {
    this.list.remove(item.id)
    this.eraseItem(item.id)
  }

  /**
   * delete an element having item id data from timetable
   * @private
   * @param {number} itemId
   */
  eraseItem(itemId: number) {
    Array.from(
      this.rootElement.querySelectorAll(`div[data-item-id='${itemId}']`)
    ).forEach((element) => {
      element.removeEventListener('click', this.eventHandlerMap.get(element))
      this.eventHandlerMap.set(element, null)
      element.parentElement.removeChild(element)
    })
  }

  /**
   * draw an item on timetable
   * @private
   * @param {TaskItem} item - a task item
   */
  drawItem(item: TaskItem) {
    const positions = TaskItemDomUtil.calculatePositions(item)

    positions.forEach((position) => {
      // if (position.endOfHour >= 24) {
      //   return
      // }

      const element = document.createElement('div')
      element.dataset.itemId = item.id.toString()
      element.className = 'task-log'
      element.style.width = position.width
      element.style.height = position.height
      element.style.top = position.top
      element.style.left = position.left

      if (position.meta.startOfHour) {
        element.style.borderTopLeftRadius = '0 0'
        element.style.borderBottomLeftRadius = '0 0'
      }

      if (position.meta.endOfHour) {
        element.style.borderTopRightRadius = '0 0'
        element.style.borderBottomRightRadius = '0 0'
      }

      if (this.eventHandlerMap.get(element)) {
        element.removeEventListener('click', this.eventHandlerMap.get(element))
      }
      this.eventHandlerMap.set(element, (() => {
        this.onClickTimeLogBar(position.meta.data)
      }).bind(this))
      element.addEventListener('click', this.eventHandlerMap.get(element))

      this.rootElement.appendChild(element)
    }, this)
  }

  /**
   * draw all items on timetable
   * @param {TaskItem[]} items - all task items
   */
  drawItems(items: TaskItem[]) {
    items.forEach((item) => this.drawItem(item))
  }
}
