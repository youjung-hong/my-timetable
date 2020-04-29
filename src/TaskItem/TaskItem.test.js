const { TaskItem } = require('./TaskItem')

const RealDate = Date

beforeAll(() => {
  global.Date = jest.fn((date) => {
    if (!date) {
      return new RealDate('2020-04-13 00:00:00')
    }

    return new RealDate(date)
  })
})

afterAll(() => {
  global.Date = RealDate
})

test('아이템의 시작시간과 종료시간을 입력할 수 있다.', () => {
  const item = new TaskItem('2020-04-14 00:00:00', '2020-04-15 03:00:00')
  expect(item.startAt).toEqual(new Date('2020-04-14 00:00:00'))
  expect(item.endAt).toEqual(new Date('2020-04-15 03:00:00'))
  expect(item.duration).toBe(97200000)
})

test('아이템의 수행시간은 현재 시간을 기준으로 생성된다.', () => {
  const item = new TaskItem()

  expect(item.startAt).toEqual(new Date('2020-04-13 00:00:00'))
  expect(item.endAt).toEqual(new Date('2020-04-13 00:00:00'))
  expect(item.duration).toBe(0)
})

test('아이템의 시작시간만 입력되었을 때, 종료시간은 시작시간과 같다.', () => {
  const item = new TaskItem('2020-04-14 00:00:00')
  expect(item.startAt).toEqual(new Date('2020-04-14 00:00:00'))
  expect(item.endAt).toEqual(new Date('2020-04-14 00:00:00'))
  expect(item.duration).toBe(0)
})

test('아이템의 종료시간만 입력되었을 때, 시작시간은 현재시간과 같다.', () => {
  // new Date() mocked to return '2020-04-13 00:00:00'
  const item = new TaskItem(null, '2020-04-14 00:00:00')
  expect(item.startAt).toEqual(new Date('2020-04-13 00:00:00'))
  expect(item.endAt).toEqual(new Date('2020-04-14 00:00:00'))
  expect(item.duration).toBe(86400000)
})

test('아이템의 종료시간이 시작시간보다 이전이면, 종료시간이 시작시간으로 변경된다', () => {
  const item = new TaskItem('2020-04-14 00:00:00', '2020-04-13 23:00:00')
  expect(item.startAt).toEqual(new Date('2020-04-14 00:00:00'))
  expect(item.endAt).toEqual(new Date('2020-04-14 00:00:00'))
  expect(item.duration).toBe(0)
})

test('아이템의 시작시간을 변경할 수 있다.', () => {
  const item = new TaskItem('2020-04-14 00:00:00', '2020-04-15 03:00:00')
  item.startAt = '2020-04-14 03:00:00'
  expect(item.startAt).toEqual(new Date('2020-04-14 03:00:00'))
  expect(item.endAt).toEqual(new Date('2020-04-15 03:00:00'))
  expect(item.duration).toBe(86400000)
})

test('아이템의 시작시간이 아이템의 종료시간보다 크면, 아이템의 종료시간은 duration만큼 이동한다.', () => {
  const item = new TaskItem('2020-04-14 00:00:00', '2020-04-15 03:00:00')
  item.startAt = '2020-04-16 03:00:00'
  expect(item.startAt).toEqual(new Date('2020-04-16 03:00:00'))
  expect(item.endAt).toEqual(new Date('2020-04-17 06:00:00'))
  expect(item.duration).toBe(97200000)
})

test('아이템의 종료시간이 아이템의 시작시간보다 작으면, 아이템의 종료시간은 변경되지 않는다.', () => {
  const item = new TaskItem('2020-04-14 00:00:00', '2020-04-15 03:00:00')
  item.endAt = '2020-04-13 03:00:00'
  expect(item.startAt).toEqual(new Date('2020-04-14 00:00:00'))
  expect(item.endAt).toEqual(new Date('2020-04-15 03:00:00'))
  expect(item.duration).toBe(97200000)
})
