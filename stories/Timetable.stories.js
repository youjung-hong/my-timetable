import { Timetable } from '../src/Timetable/Timetable'
import '../src/index.css'

export default {
  title: 'Timetable',
}

export const TheFirstState = () => {
  document.body.innerHTML = '<div id="timetable" style="width: 20%"></div>'
  new Timetable('timetable')
}
