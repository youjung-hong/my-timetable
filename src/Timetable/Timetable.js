import UI_TEMPLATE from './template/TimetableTemplate'
import { TaskItemList } from '../TaskItemList/TaskItemList'
import TaskItemDomUtil from '../TaskItemDomUtil/TaskItemDomUtil'
import { TaskItem } from '../TaskItem/TaskItem'

/**
 * @class
 * @constructor
 * @param {string} id - root element id
 * @param {TaskItem[]} items - task items
 * @example
 * const timetable = new Timetable('root');
 * @example
 * const timetable = new Timetable('root', [new TaskItem()])
 */
export class Timetable {
  constructor(id, items, onClickTimeLogBar) {
    this.rootElement = document.getElementById(id)

    if (this.rootElement) {
      this.rootElement.className = 'root'
      this.rootElement.innerHTML = UI_TEMPLATE
    }

    this.onClickTimeLogBar = onClickTimeLogBar || (() => {})

    this.list = new TaskItemList(items)

    this.eventHandlerMap = {}

    this.drawItems(this.list.items)
  }

  /**
   * insert new item and draw it on timetable
   * @param {TaskItem} item - a new item
   */
  insert(item) {
    this.list.add(item)
    this.drawItem(item)
  }

  /**
   * update an item and redraw it on timetable
   * @param {TaskItem} item - an existing item to update
   */
  update(item) {
    this.list.update(item)
    this.eraseItem(item.id)
    this.drawItem(item)
  }

  /**
   * delete an item and erase it on timetable
   * @param {TaskItem} item - an existing item to delete
   */
  delete(item) {
    this.list.remove(item.id)
    this.eraseItem(item.id)
  }

  /**
   * delete an element having item id data from timetable
   * @private
   * @param {number} itemId
   */
  eraseItem(itemId) {
    Array.from(
      this.rootElement.querySelectorAll(`div[data-item-id='${itemId}']`)
    ).forEach((element) => {
      element.removeEventListener(this.eventHandlerMap[element])
      this.eventHandlerMap[element] = null
      element.parentElement.removeChild(element)
    })
  }

  /**
   * draw an item on timetable
   * @private
   * @param {TaskItem} item - a task item
   */
  drawItem(item) {
    const positions = TaskItemDomUtil.calculatePositions(item)

    positions.forEach((position) => {
      if (position.hour >= 24) {
        return
      }

      const element = document.createElement('div')
      element.dataset.itemId = item.id
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

      if (this.eventHandlerMap[element]) {
        element.removeEventListener('click', this.eventHandlerMap[element])
      }
      this.eventHandlerMap[element] = ((e) => {
        this.onClickTimeLogBar(position.meta.data)
      }).bind(this)
      element.addEventListener('click', this.eventHandlerMap[element])

      this.rootElement.appendChild(element)
    }, this)
  }

  /**
   * draw all items on timetable
   * @param {TaskItem[]} items - all task items
   */
  drawItems(items) {
    items.forEach((item) => this.drawItem(item))
  }
}
