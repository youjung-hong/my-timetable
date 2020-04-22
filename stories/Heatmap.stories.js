import { Heatmap } from '../src/Heatmap/Heatmap'
import '../src/index.css'

export default {
  title: 'Heatmap',
}

export const TheFirstState = () => {
  document.body.innerHTML = '<div id="heatmap" style="width: 20%"></div>'
  new Heatmap('heatmap')
}
