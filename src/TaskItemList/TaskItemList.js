import { TaskItem } from '../TaskItem/TaskItem'

/**
 * @class
 * @constructor
 * @param {TaskItem[]} items - task items
 */
export class TaskItemList {
  constructor(items) {
    this.items = []

    if (items) {
      items.forEach((item) => this.add(item))
    }
  }

  /**
   * add an item to list
   * @param {TaskItem} item - a task item
   */
  add(item) {
    if (item instanceof TaskItem) {
      this.items.push(TaskItem.clone(item))
    }
  }

  /**
   * delete an item from list
   * @param {number} removeId - an id of a task item which user wants to delete
   */
  remove(removeId) {
    const id = removeId instanceof TaskItem ? removeId.id : removeId
    this.items = this.items.filter((item) => item.id !== id)
  }

  /**
   * update an existing item from list
   * @param {TaskItem} updateItem - an item having new data that user wants to update
   */
  update(updateItem) {
    this.items = this.items.map((item) => {
      if (item.id === updateItem.id) {
        return TaskItem.clone(updateItem)
      }

      return item
    })
  }
}
