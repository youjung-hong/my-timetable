import { TaskItem } from '../TaskItem/TaskItem'

export class TaskItemList {
  constructor(items) {
    this.items = []

    if (items) {
      items.forEach((item) => this.add(item))
    }
  }

  add(item) {
    if (item instanceof TaskItem) {
      this.items.push(Object.assign({}, item))
    }
  }

  remove(removeIdx) {
    const id = removeIdx instanceof TaskItem ? removeIdx.id : removeIdx
    this.items = this.items.filter((item) => item.id !== id)
  }

  update(updateItem) {
    this.items = this.items.map((item) => {
      if (item.id === updateItem.id) {
        return Object.assign({}, updateItem)
      }

      return item
    })
  }
}
