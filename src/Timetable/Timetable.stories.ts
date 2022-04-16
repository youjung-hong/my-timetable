import { Timetable } from './Timetable'
import { TaskItem } from '../TaskItem/TaskItem'
import '../index.css'

function createRootElement() {
  const rootElement = document.createElement('div')
  rootElement.id = 'timetable'
  rootElement.style.width = '20%'

  return rootElement
}

function createTimetable(taskItems?: TaskItem[]) {
  const rootElement = createRootElement()

  setTimeout(() => {
    new Timetable('timetable', taskItems)
  })

  return rootElement
}

function createTimetableThenInsertItem(item: TaskItem) {
  const rootElement = createRootElement()

  setTimeout(() => {
    const timetable = new Timetable('timetable')
    timetable.insert(item)
  })

  return rootElement
}

function createTimetableThenUpdateItem(initial: TaskItem, updatedStartAt: string) {
  const rootElement = createRootElement()

  setTimeout(() => {
    const timetable = new Timetable('timetable', [initial])
    initial.startAt = new Date(updatedStartAt)
    timetable.update(initial)
  })

  return rootElement
}

function createTimetableThenSetOnClickTimeLogBar(taskItems: TaskItem[], onClickTimeLogBar: { (data: any): void; (meta: any): void }) {
  const rootElement = createRootElement()

  setTimeout(() => {
    new Timetable('timetable', taskItems, onClickTimeLogBar)
  })

  return rootElement
}

export default {
  title: 'Timetable',
  component: Timetable,
}

export const InitialState = () => createTimetable()

InitialState.story = {
  name: '초기 상태',
}

export const OneTaskDuringSameHour = () =>
  createTimetable([new TaskItem('2020-05-05T18:00:00', '2020-05-05T18:45:00')])
OneTaskDuringSameHour.story = {
  name: '[R] 18:00:00 - 18:45:00',
}

export const OneTaskDuringDifferentHour = () =>
  createTimetable([
    new TaskItem('2020-05-05T04:50:00', '2020-05-05T05:05:00'),
    new TaskItem('2020-05-05T05:05:00', '2020-05-05T07:15:00'),
  ])
OneTaskDuringDifferentHour.story = {
  name: '[R] 04:50:00 - 05:05:00\n05:05:00 - 07:15:00',
}

export const OneTaskInserted = () =>
  createTimetableThenInsertItem(
    new TaskItem('2020-05-05T04:50:00', '2020-05-05T05:05:00')
  )
OneTaskInserted.story = {
  name: '[C] 04:50:00 - 05:05:00',
}

export const OneTaskUpdated = () =>
  createTimetableThenUpdateItem(
    new TaskItem('2020-05-05T04:50:00', '2020-05-05T05:05:00'),
    '2020-05-05T04:05:00'
  )
OneTaskUpdated.story = {
  name: '[U] 04:50:00 - 05:05:00\n -> 04:05:00 - 05:05:00',
}

export const OneTaskClicked = () =>
  createTimetableThenSetOnClickTimeLogBar(
    [new TaskItem('2020-05-05T04:50:00', '2020-05-05T05:05:00', { id: 1 })],
    (data: any) => {
      alert('데이터: ' + JSON.stringify(data))
    }
  )
OneTaskClicked.story = {
  name: '[R] 04:50:00 - 05:05:00 클릭',
}
