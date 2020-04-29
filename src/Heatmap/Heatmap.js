import UI_TEMPLATE from './template/HeatmapTemplate'
import { TaskItemList } from '../TaskItemList/TaskItemList'

export class Heatmap {
  constructor(id, items) {
    this.rootElement = document.getElementById(id)

    if (this.rootElement) {
      this.rootElement.innerHTML = UI_TEMPLATE
    }

    this.list = new TaskItemList(items)
  }
}
