import UI_TEMPLATE from './template/HeatmapTemplate'
import { ItemList } from '../ItemList/itemList'

export class Heatmap {
  constructor(id, items) {
    this.rootElement = document.getElementById(id)

    if (this.rootElement) {
      this.rootElement.innerHTML = UI_TEMPLATE
    }

    this.list = new ItemList(items)
  }
}
