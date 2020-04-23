import { Item } from '../Item/item'

export class ItemList {
  constructor(items) {
    this.items = []

    if (items) {
      items.forEach((item) => this.add(item))
    }
  }

  add(item) {
    if (item instanceof Item) {
      this.items.push(Object.assign({}, item))
    }
  }

  remove(removeIdx) {
    const id = removeIdx instanceof Item ? removeIdx.id : removeIdx
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
