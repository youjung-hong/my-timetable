"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateUtil = void 0;
/**
 * @private
 * @module
 */
exports.DateUtil = {
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
        var startTime = new Date(date);
        startTime.setMinutes(0);
        startTime.setSeconds(0);
        startTime.setUTCMilliseconds(0);
        return startTime;
    },
};
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
var TaskItemDomUtil = {
    /**
     * calculate percent positions depends on startAt and endAt time
     * @param {TaskItem} item
     * @returns {TaskItemPosition[]} positions of which will be drawn to screen
     */
    calculatePositions: function calculatePositions(item) {
        var positions = [];
        var hourDiff = item.endAt.getHours() - item.startAt.getHours();
        var currentStartTime = exports.DateUtil.getStartTimeOfHour(item.startAt);
        var currentEndTime = new Date(new Date(currentStartTime).valueOf() + exports.DateUtil.ONE_HOUR_TO_MILLISECONDS);
        for (var i = 0; i <= hourDiff; i += 1) {
            var currentStartAt = i === 0 ? item.startAt : currentStartTime;
            var currentEndAt = i === hourDiff ? item.endAt : currentEndTime;
            var currentHour = currentStartTime.getHours();
            var position = {
                top: (currentHour / exports.DateUtil.ONE_DAY_TO_HOURS) * 100 + '%',
                left: ((currentStartAt.valueOf() - currentStartTime.valueOf()) /
                    exports.DateUtil.ONE_HOUR_TO_MILLISECONDS) *
                    100 +
                    '%',
                width: ((currentEndAt.valueOf() - currentStartAt.valueOf()) /
                    exports.DateUtil.ONE_HOUR_TO_MILLISECONDS) *
                    100 +
                    '%',
                height: (1 / exports.DateUtil.ONE_DAY_TO_HOURS) * 100 + '%',
                meta: {
                    data: item.meta,
                    startOfHour: currentStartAt.getTime() === currentStartTime.getTime(),
                    endOfHour: currentEndAt.getTime() === currentEndTime.getTime(),
                },
            };
            if (position.width !== '0%') {
                positions.push(position);
            }
            currentStartTime.setHours(currentHour + 1);
            currentEndTime.setHours(currentHour + 2);
        }
        return positions;
    },
};
exports.default = TaskItemDomUtil;
