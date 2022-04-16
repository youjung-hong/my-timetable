import { Timetable } from './Timetable'
import { TaskItem } from '../TaskItem/TaskItem'

beforeEach(() => {
  document.body.innerHTML = '<div id="timetable"></div>'
})

test('id로 루트엘리먼트를 찾는다.', () => {
  const timetable = new Timetable('timetable')
  expect(timetable.rootElement).toBe(document.getElementById('timetable'))
})

test('루트엘리먼트를 찾을 수 없으면 rootElement가 null이다.', () => {
  document.body.innerHTML = ''

  expect(new Timetable('').rootElement).toBe(null)
  expect(new Timetable(null).rootElement).toBe(null)
})

test('초기화하면 아이템 목록이 비어있다.', () => {
  const timetable = new Timetable('timetable')
  expect(timetable.list.items).toEqual([])
})

test('초기화할 때, 아이템 목록을 넘겨줄 수 있다.', () => {
  const item1 = new TaskItem('2020-04-24 00:00:00')
  const timetable = new Timetable('timetable', [item1])
  expect(timetable.list.items.length).toBe(1)
  expect(timetable.list.items[0].startAt).toEqual(item1.startAt)
  expect(timetable.list.items[0].endAt).toEqual(item1.endAt)
  expect(timetable.list.items[0].duration).toEqual(item1.duration)
})
