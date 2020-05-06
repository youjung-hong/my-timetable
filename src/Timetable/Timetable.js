import UI_TEMPLATE from './template/TimetableTemplate'
import { TaskItemList } from '../TaskItemList/TaskItemList'
import TaskItemDomUtil from '../TaskItemDomUtil/TaskItemDomUtil'
import { TaskItem } from '../TaskItem/TaskItem'

export class Timetable {
  constructor(id, items) {
    this.rootElement = document.getElementById(id)

    if (this.rootElement) {
      this.rootElement.className = 'root'
      this.rootElement.innerHTML = UI_TEMPLATE
    }

    this.list = new TaskItemList(items)

    this.drawItems(this.list.items)
  }

  insert(item) {
    this.list.add(item)
    this.drawItem(item)
  }

  update(item) {
    this.list.update(item)
    this.eraseItem(item.id)
    this.drawItem(item)
  }

  delete(item) {
    this.list.remove(item.id)
    this.eraseItem(item.id)
  }

  eraseItem(itemId) {
    Array.from(
      this.rootElement.querySelectorAll(`div[data-item-id='${itemId}']`)
    ).forEach((element) => {
      element.parentElement.removeChild(element)
    })
  }

  drawItem(item) {
    const positions = TaskItemDomUtil.calculatePositions(item)

    positions.forEach((position) => {
      if (position.hour >= 24) {
        return
      }

      const element = document.createElement('div')
      element.dataset.itemId = item.id
      element.className = 'task-log'
      element.style.width = position.width + '%'
      element.style.height = position.height + '%'
      element.style.top = position.top + '%'
      element.style.left = position.left + '%'

      this.rootElement.appendChild(element)
    })
  }

  drawItems(items) {
    items.forEach((item) => this.drawItem(item))
  }
}
