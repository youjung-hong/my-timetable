import UI_TEMPLATE from './template/TimetableTemplate'
import { TaskItemList } from '../TaskItemList/TaskItemList'

export class Timetable {
  constructor(id, items) {
    this.rootElement = document.getElementById(id)

    if (this.rootElement) {
      this.rootElement.innerHTML = UI_TEMPLATE
    }

    this.list = new TaskItemList(items)
  }
}
