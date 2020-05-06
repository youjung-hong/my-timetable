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
      this.items.push(TaskItem.clone(item))
    }
  }

  remove(removeId) {
    const id = removeId instanceof TaskItem ? removeId.id : removeId
    this.items = this.items.filter((item) => item.id !== id)
  }

  update(updateItem) {
    this.items = this.items.map((item) => {
      if (item.id === updateItem.id) {
        return TaskItem.clone(updateItem)
      }

      return item
    })
  }
}
