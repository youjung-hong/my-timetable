"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TaskItemDomUtil_1 = require("./TaskItemDomUtil");
var TaskItem_1 = require("../TaskItem/TaskItem");
test('같은 hour 내에 수행한 TaskItem의 화면상의 위치를 계산한다.', function () {
    var item1 = new TaskItem_1.TaskItem('2020-04-30T07:04:00', '2020-04-30T07:43:00');
    expect(TaskItemDomUtil_1.default.calculatePositions(item1)).toEqual([
        {
            top: (7 / 24) * 100 + '%',
            left: ((4 * 60000) / 3600000) * 100 + '%',
            width: ((39 * 60000) / 3600000) * 100 + '%',
            height: (1 / 24) * 100 + '%',
            meta: {
                data: undefined,
                endOfHour: false,
                startOfHour: false,
            },
        },
    ]);
    var item2 = new TaskItem_1.TaskItem('2020-04-30T08:05:03', '2020-04-30T08:43:00');
    expect(TaskItemDomUtil_1.default.calculatePositions(item2)).toEqual([
        {
            top: (8 / 24) * 100 + '%',
            left: ((5 * 60000 + 3 * 1000) / 3600000) * 100 + '%',
            width: ((37 * 60000 + 57 * 1000) / 3600000) * 100 + '%',
            height: (1 / 24) * 100 + '%',
            meta: {
                data: undefined,
                endOfHour: false,
                startOfHour: false,
            },
        },
    ]);
    var item3 = new TaskItem_1.TaskItem('2020-04-30 11:00:00', '2020-04-30 11:01:00');
    expect(TaskItemDomUtil_1.default.calculatePositions(item3)).toEqual([
        {
            top: (11 / 24) * 100 + '%',
            left: 0 + '%',
            width: ((1 * 60000) / 3600000) * 100 + '%',
            height: (1 / 24) * 100 + '%',
            meta: {
                data: undefined,
                endOfHour: false,
                startOfHour: true,
            },
        },
    ]);
});
test('다른 hour 내에 수행한 TaskItem의 화면상의 위치를 계산한다.', function () {
    var item1 = new TaskItem_1.TaskItem('2020-04-30T07:04:00', '2020-04-30T08:43:00');
    expect(TaskItemDomUtil_1.default.calculatePositions(item1)).toEqual([
        {
            top: (7 / 24) * 100 + '%',
            left: ((4 * 60000) / 3600000) * 100 + '%',
            width: ((56 * 60000) / 3600000) * 100 + '%',
            height: (1 / 24) * 100 + '%',
            meta: {
                data: undefined,
                endOfHour: true,
                startOfHour: false,
            },
        },
        {
            top: (8 / 24) * 100 + '%',
            left: 0 + '%',
            width: ((43 * 60000) / 3600000) * 100 + '%',
            height: (1 / 24) * 100 + '%',
            meta: {
                data: undefined,
                endOfHour: false,
                startOfHour: true,
            },
        },
    ]);
    var item2 = new TaskItem_1.TaskItem('2020-04-30T07:04:00', '2020-04-30T09:43:00');
    expect(TaskItemDomUtil_1.default.calculatePositions(item2)).toEqual([
        {
            top: (7 / 24) * 100 + '%',
            left: ((4 * 60000) / 3600000) * 100 + '%',
            width: ((56 * 60000) / 3600000) * 100 + '%',
            height: (1 / 24) * 100 + '%',
            meta: {
                data: undefined,
                endOfHour: true,
                startOfHour: false,
            },
        },
        {
            top: (8 / 24) * 100 + '%',
            left: 0 + '%',
            width: 100 + '%',
            height: (1 / 24) * 100 + '%',
            meta: {
                data: undefined,
                endOfHour: true,
                startOfHour: true,
            },
        },
        {
            top: (9 / 24) * 100 + '%',
            left: 0 + '%',
            width: ((43 * 60000) / 3600000) * 100 + '%',
            height: (1 / 24) * 100 + '%',
            meta: {
                data: undefined,
                endOfHour: false,
                startOfHour: true,
            },
        },
    ]);
    var item3 = new TaskItem_1.TaskItem('2020-05-07T04:50:00', '2020-05-07T05:05:00');
    expect(TaskItemDomUtil_1.default.calculatePositions(item3)).toEqual([
        {
            top: (4 / 24) * 100 + '%',
            left: ((50 * 60000) / 3600000) * 100 + '%',
            width: ((10 * 60000) / 3600000) * 100 + '%',
            height: (1 / 24) * 100 + '%',
            meta: {
                data: undefined,
                endOfHour: true,
                startOfHour: false,
            },
        },
        {
            top: (5 / 24) * 100 + '%',
            left: 0 + '%',
            width: ((5 * 60000) / 3600000) * 100 + '%',
            height: (1 / 24) * 100 + '%',
            meta: {
                data: undefined,
                endOfHour: false,
                startOfHour: true,
            },
        },
    ]);
});
test('엣지에서 수행한 TaskItem의 화면상의 위치를 계산한다.', function () {
    var item1 = new TaskItem_1.TaskItem('2020-04-30T07:00:00', '2020-04-30T11:00:00');
    expect(TaskItemDomUtil_1.default.calculatePositions(item1)).toEqual([
        {
            top: (7 / 24) * 100 + '%',
            left: 0 + '%',
            width: 100 + '%',
            height: (1 / 24) * 100 + '%',
            meta: {
                data: undefined,
                endOfHour: true,
                startOfHour: true,
            },
        },
        {
            top: (8 / 24) * 100 + '%',
            left: 0 + '%',
            width: 100 + '%',
            height: (1 / 24) * 100 + '%',
            meta: {
                data: undefined,
                endOfHour: true,
                startOfHour: true,
            },
        },
        {
            top: (9 / 24) * 100 + '%',
            left: 0 + '%',
            width: 100 + '%',
            height: (1 / 24) * 100 + '%',
            meta: {
                data: undefined,
                endOfHour: true,
                startOfHour: true,
            },
        },
        {
            top: (10 / 24) * 100 + '%',
            left: 0 + '%',
            width: 100 + '%',
            height: (1 / 24) * 100 + '%',
            meta: {
                data: undefined,
                endOfHour: true,
                startOfHour: true,
            },
        },
    ]);
    var item2 = new TaskItem_1.TaskItem('2020-04-30T07:04:00', '2020-04-30T09:00:00');
    expect(TaskItemDomUtil_1.default.calculatePositions(item2)).toEqual([
        {
            top: (7 / 24) * 100 + '%',
            left: ((4 * 60000) / 3600000) * 100 + '%',
            width: ((56 * 60000) / 3600000) * 100 + '%',
            height: (1 / 24) * 100 + '%',
            meta: {
                data: undefined,
                endOfHour: true,
                startOfHour: false,
            },
        },
        {
            top: (8 / 24) * 100 + '%',
            left: 0 + '%',
            width: 100 + '%',
            height: (1 / 24) * 100 + '%',
            meta: {
                data: undefined,
                endOfHour: true,
                startOfHour: true,
            },
        },
    ]);
});
