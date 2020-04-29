import { Heatmap } from './Heatmap'
import { TaskItem } from '../TaskItem/TaskItem'

beforeAll(() => {
  document.body.innerHTML = '<div id="heatmap"></div>'
})

test('id로 루트엘리먼트를 찾는다.', () => {
  const heatmap = new Heatmap('heatmap')
  expect(heatmap.rootElement).toBe(document.getElementById('heatmap'))
})

test('루트엘리먼트를 찾을 수 없으면 rootElement가 null이다.', () => {
  document.body.innerHTML = ''

  expect(new Heatmap('').rootElement).toBe(null)
  expect(new Heatmap().rootElement).toBe(null)
  expect(new Heatmap(null).rootElement).toBe(null)
})

test('초기화하면 아이템 목록이 비어있다.', () => {
  const heatmap = new Heatmap('heatmap')
  expect(heatmap.list.items).toEqual([])
})

test('초기화할 때, 아이템 목록을 넘겨줄 수 있다.', () => {
  const item1 = new TaskItem('2020-04-24 00:00:00')
  const heatmap = new Heatmap('heatmap', [item1])
  expect(heatmap.list.items.length).toBe(1)
  expect(heatmap.list.items[0]).toEqual(item1)
})
