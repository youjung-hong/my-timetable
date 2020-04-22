const { ItemList } = require('./itemList')
const { Item } = require('../Item/item')

let item1, item2, item3
beforeAll(() => {
  item1 = new Item('2020-04-14 00:00:00', '2020-04-15 03:00:00')
  item2 = new Item('2020-04-15 03:00:00', '2020-04-15 06:00:00')
  item3 = new Item('2020-04-17 00:00:00', '2020-04-17 03:00:00')
})

test('아이템 목록은 비어있다.', () => {
  const list = new ItemList()
  expect(list.items.length).toBe(0)
})

test('아이템을 넣어서 초기화할 수 있다.', () => {
  const list = new ItemList([item1, item2, item3])
  expect(list.items).toEqual([item1, item2, item3])
})

test('아이템을 추가할 수 있다.', () => {
  const list = new ItemList()
  list.add(item1)
  expect(list.items).toEqual([item1])
})

test('Item 타입인 아이템만 추가할 수 있다.', () => {
  const list1 = new ItemList()
  list1.add()
  expect(list1.items).toEqual([])

  const list2 = new ItemList()
  list2.add(0)
  expect(list2.items).toEqual([])

  const list3 = new ItemList()
  list3.add(null)
  expect(list3.items).toEqual([])
})

test('아이템을 삭제할 수 있다.', () => {
  const list = new ItemList([item1, item2, item3])
  list.remove(item2)
  expect(list.items).toEqual([item1, item3])
})

test('아이템을 아이디로 삭제할 수 있다.', () => {
  const list = new ItemList([item1, item2, item3])
  list.remove(item2.id)
  expect(list.items).toEqual([item1, item3])
})

test('아이템을 수정할 수 있다.', () => {
  const list = new ItemList([item1, item2, item3])
  item1.startAt = '2020-04-01 00:00:00'
  expect(list.items[0]).not.toEqual(item1)
  list.update(item1)
  expect(list.items[0]).toEqual(item1)
})
