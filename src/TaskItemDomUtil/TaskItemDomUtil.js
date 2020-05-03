export const DateUtil = {
  ONE_HOUR_TO_MINUTES: 60,
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
  calculatePosition: function calculatePosition(item) {
    const positions = []
    const hourDiff = parseInt(
      (item.endAt - item.startAt) /
        (DateUtil.ONE_HOUR_TO_MINUTES * DateUtil.ONE_MINUTE_TO_MILLISECONDS),
      10
    )
    const currentStartTime = DateUtil.getStartTimeOfHour(item.startAt)
    for (let i = 0; i <= hourDiff; i += 1) {
      const currentStartAt = i === 0 ? item.startAt : currentStartTime
      const currentEndAt =
        i === hourDiff
          ? item.endAt
          : new Date(new Date(currentStartTime).setMinutes(60))
      const currentHour = currentStartTime.getHours()
      const position = {
        hour: currentHour,
        minutes: [
          currentStartAt - currentStartTime,
          currentEndAt - currentStartTime,
        ],
      }

      if (!(position.minutes[0] === 0 && position.minutes[1] === 0)) {
        positions.push(position)
      }

      currentStartTime.setHours(currentHour + 1)
    }

    return positions
  },
}

export default TaskItemDomUtil
