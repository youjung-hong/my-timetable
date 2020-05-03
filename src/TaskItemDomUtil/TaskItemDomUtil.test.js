import TaskItemDomUtil, { DateUtil } from './TaskItemDomUtil'
import { TaskItem } from '../TaskItem/TaskItem'

test('같은 hour 내에 수행한 TaskItem의 화면상의 위치를 계산한다.', () => {
  const item1 = new TaskItem('2020-04-30T07:04:00', '2020-04-30T07:43:00')
  expect(TaskItemDomUtil.calculatePosition(item1)).toEqual([
    {
      hour: 7,
      minutes: [
        4 * DateUtil.ONE_MINUTE_TO_MILLISECONDS,
        43 * DateUtil.ONE_MINUTE_TO_MILLISECONDS,
      ],
    },
  ])

  const item2 = new TaskItem('2020-04-30T08:05:03', '2020-04-30T08:43:00')
  expect(TaskItemDomUtil.calculatePosition(item2)).toEqual([
    {
      hour: 8,
      minutes: [
        5 * DateUtil.ONE_MINUTE_TO_MILLISECONDS +
          3 * DateUtil.ONE_SECOND_TO_MILLISECONDS,
        43 * DateUtil.ONE_MINUTE_TO_MILLISECONDS,
      ],
    },
  ])

  const item3 = new TaskItem('2020-04-30 11:00:00', '2020-04-30 11:01:00')
  expect(TaskItemDomUtil.calculatePosition(item3)).toEqual([
    {
      hour: 11,
      minutes: [
        0 * DateUtil.ONE_MINUTE_TO_MILLISECONDS,
        1 * DateUtil.ONE_MINUTE_TO_MILLISECONDS,
      ],
    },
  ])
})

test('다른 hour 내에 수행한 TaskItem의 화면상의 위치를 계산한다.', () => {
  const item1 = new TaskItem('2020-04-30T07:04:00', '2020-04-30T08:43:00')
  expect(TaskItemDomUtil.calculatePosition(item1)).toEqual([
    {
      hour: 7,
      minutes: [
        4 * DateUtil.ONE_MINUTE_TO_MILLISECONDS,
        60 * DateUtil.ONE_MINUTE_TO_MILLISECONDS,
      ],
    },
    {
      hour: 8,
      minutes: [0, 43 * DateUtil.ONE_MINUTE_TO_MILLISECONDS],
    },
  ])

  const item2 = new TaskItem('2020-04-30T07:04:00', '2020-04-30T09:43:00')
  expect(TaskItemDomUtil.calculatePosition(item2)).toEqual([
    {
      hour: 7,
      minutes: [
        4 * DateUtil.ONE_MINUTE_TO_MILLISECONDS,
        60 * DateUtil.ONE_MINUTE_TO_MILLISECONDS,
      ],
    },
    {
      hour: 8,
      minutes: [0, 60 * DateUtil.ONE_MINUTE_TO_MILLISECONDS],
    },
    {
      hour: 9,
      minutes: [0, 43 * DateUtil.ONE_MINUTE_TO_MILLISECONDS],
    },
  ])
})

test('엣지에서 수행한 TaskItem의 화면상의 위치를 계산한다.', () => {
  const item1 = new TaskItem('2020-04-30T07:00:00', '2020-04-30T11:00:00')
  expect(TaskItemDomUtil.calculatePosition(item1)).toEqual([
    {
      hour: 7,
      minutes: [0, 60 * DateUtil.ONE_MINUTE_TO_MILLISECONDS],
    },
    {
      hour: 8,
      minutes: [0, 60 * DateUtil.ONE_MINUTE_TO_MILLISECONDS],
    },
    {
      hour: 9,
      minutes: [0, 60 * DateUtil.ONE_MINUTE_TO_MILLISECONDS],
    },
    {
      hour: 10,
      minutes: [0, 60 * DateUtil.ONE_MINUTE_TO_MILLISECONDS],
    },
  ])

  const item2 = new TaskItem('2020-04-30T07:04:00', '2020-04-30T09:00:00')
  expect(TaskItemDomUtil.calculatePosition(item2)).toEqual([
    {
      hour: 7,
      minutes: [
        4 * DateUtil.ONE_MINUTE_TO_MILLISECONDS,
        60 * DateUtil.ONE_MINUTE_TO_MILLISECONDS,
      ],
    },
    {
      hour: 8,
      minutes: [0, 60 * DateUtil.ONE_MINUTE_TO_MILLISECONDS],
    },
  ])
})
