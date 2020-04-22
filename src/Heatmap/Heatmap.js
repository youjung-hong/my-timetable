import UI_TEMPLATE from './template/HeatmapTemplate'

export class Heatmap {
  constructor(id) {
    this.rootElement = document.getElementById(id)

    if (this.rootElement) {
      this.rootElement.innerHTML = UI_TEMPLATE
    }
  }
}
