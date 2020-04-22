import { Heatmap } from './Heatmap'

test('id로 루트엘리먼트를 찾는다.', () => {
  document.body.innerHTML = '<div id="heatmap"></div>'

  const heatmap = new Heatmap('heatmap')
  expect(heatmap.rootElement).toBe(document.getElementById('heatmap'))
})

test('루트엘리먼트를 찾을 수 없으면 rootElement가 null이다.', () => {
  document.body.innerHTML = ''

  expect(new Heatmap('').rootElement).toBe(null)
  expect(new Heatmap().rootElement).toBe(null)
  expect(new Heatmap(null).rootElement).toBe(null)
})
