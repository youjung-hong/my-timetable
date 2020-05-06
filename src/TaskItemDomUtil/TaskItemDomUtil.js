export const DateUtil = {
  ONE_DAY_TO_HOURS: 24,
  ONE_HOUR_TO_MINUTES: 60,
  ONE_HOUR_TO_MILLISECONDS: 3600000,
  ONE_MINUTE_TO_MILLISECONDS: 60000,
  ONE_SECOND_TO_MILLISECONDS: 1000,
  getStartTimeOfHour: function (date) {
    const startTime = new Date(date)
    startTime.setMinutes(0)
    startTime.setSeconds(0)
    startTime.setUTCMilliseconds(0)

    return startTime
  },
}

const TaskItemDomUtil = {
  calculatePositions: function calculatePositions(item) {
    const positions = []
    const hourDiff = item.endAt.getHours() - item.startAt.getHours()
    const currentStartTime = DateUtil.getStartTimeOfHour(item.startAt)
    for (let i = 0; i <= hourDiff; i += 1) {
      const currentStartAt = i === 0 ? item.startAt : currentStartTime
      const currentEndAt =
        i === hourDiff
          ? item.endAt
          : new Date(new Date(currentStartTime).setMinutes(60))
      const currentHour = currentStartTime.getHours()
      const position = {
        top: (currentHour / DateUtil.ONE_DAY_TO_HOURS) * 100,
        left:
          ((currentStartAt - currentStartTime) /
            DateUtil.ONE_HOUR_TO_MILLISECONDS) *
          100,
        width:
          ((currentEndAt - currentStartAt) /
            DateUtil.ONE_HOUR_TO_MILLISECONDS) *
          100,
        height: (1 / DateUtil.ONE_DAY_TO_HOURS) * 100,
      }

      if (position.width) {
        positions.push(position)
      }

      currentStartTime.setHours(currentHour + 1)
    }

    return positions
  },
}

export default TaskItemDomUtil
