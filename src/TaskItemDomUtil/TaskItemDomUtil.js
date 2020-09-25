/**
 * @private
 * @module
 */
export const DateUtil = {
  ONE_DAY_TO_HOURS: 24,
  ONE_HOUR_TO_MINUTES: 60,
  ONE_HOUR_TO_MILLISECONDS: 3600000,
  ONE_MINUTE_TO_MILLISECONDS: 60000,
  ONE_SECOND_TO_MILLISECONDS: 1000,

  /**
   * get midnight datetime of date
   * @param {Date} date
   * @returns {Date} midnight of a date
   */
  getStartTimeOfHour: function (date) {
    const startTime = new Date(date)
    startTime.setMinutes(0)
    startTime.setSeconds(0)
    startTime.setUTCMilliseconds(0)

    return startTime
  },
}

/**
 * UI position of a task item
 * @typedef TaskItemPosition
 * @property {number} top
 * @property {number} left
 * @property {number} width
 * @property {number} height
 */

/**
 * calculate UI position of a task item
 * @private
 * @module
 */
const TaskItemDomUtil = {
  /**
   * calculate percent positions depends on startAt and endAt time
   * @param {TaskItem} item
   * @returns {TaskItemPosition[]} positions of which will be drawn to screen
   */
  calculatePositions: function calculatePositions(item) {
    const positions = []
    const hourDiff = item.endAt.getHours() - item.startAt.getHours()
    const currentStartTime = DateUtil.getStartTimeOfHour(item.startAt)
    const currentEndTime = new Date(
      +new Date(currentStartTime) + DateUtil.ONE_HOUR_TO_MILLISECONDS
    )
    for (let i = 0; i <= hourDiff; i += 1) {
      const currentStartAt = i === 0 ? item.startAt : currentStartTime
      const currentEndAt = i === hourDiff ? item.endAt : currentEndTime
      const currentHour = currentStartTime.getHours()
      const position = {
        top: (currentHour / DateUtil.ONE_DAY_TO_HOURS) * 100 + '%',
        left:
          ((currentStartAt - currentStartTime) /
            DateUtil.ONE_HOUR_TO_MILLISECONDS) *
            100 +
          '%',
        width:
          ((currentEndAt - currentStartAt) /
            DateUtil.ONE_HOUR_TO_MILLISECONDS) *
            100 +
          '%',
        height: (1 / DateUtil.ONE_DAY_TO_HOURS) * 100 + '%',
        meta: {
          data: item.meta,
          startOfHour: currentStartAt.getTime() === currentStartTime.getTime(),
          endOfHour: currentEndAt.getTime() === currentEndTime.getTime(),
        },
      }

      if (position.width !== '0%') {
        positions.push(position)
      }

      currentStartTime.setHours(currentHour + 1)
      currentEndTime.setHours(currentHour + 2)
    }

    return positions
  },
}

export default TaskItemDomUtil
