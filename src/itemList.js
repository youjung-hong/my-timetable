import { Item } from './item'

export class ItemList {
  constructor(items) {
    this.items = items ? items : []
  }

  add(item) {
    if (item instanceof Item) {
      this.items.push(item)
    }
  }

  remove(removeIdx) {
    const id = removeIdx instanceof Item ? removeIdx.id : removeIdx
    this.items = this.items.filter((item) => item.id !== id)
  }
}
