"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var TaskItem_1 = require("./TaskItem");
var DateReal = global.Date;
var mockDate = new DateReal(1586703600000);
var spy;
beforeAll(function () {
    spy = jest
        .spyOn(global, 'Date')
        .mockImplementation(function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length) {
            return new (DateReal.bind.apply(DateReal, __spreadArray([void 0], args, false)))();
        }
        return mockDate;
    });
});
afterAll(function () {
    spy.mockReset();
});
test('아이템의 시작시간과 종료시간을 입력할 수 있다.', function () {
    var item = new TaskItem_1.TaskItem('2020-04-14 00:00:00', '2020-04-15 03:00:00');
    expect(item.startAt).toEqual(new Date('2020-04-14 00:00:00'));
    expect(item.endAt).toEqual(new Date('2020-04-15 03:00:00'));
    expect(item.duration).toBe(97200000);
});
test('아이템의 수행시간은 현재 시간을 기준으로 생성된다.', function () {
    var item = new TaskItem_1.TaskItem();
    expect(item.startAt).toEqual(new Date('2020-04-13 00:00:00'));
    expect(item.endAt).toEqual(new Date('2020-04-13 00:00:00'));
    expect(item.duration).toBe(0);
});
test('아이템의 시작시간만 입력되었을 때, 종료시간은 시작시간과 같다.', function () {
    var item = new TaskItem_1.TaskItem('2020-04-14 00:00:00');
    expect(item.startAt).toEqual(new Date('2020-04-14 00:00:00'));
    expect(item.endAt).toEqual(new Date('2020-04-14 00:00:00'));
    expect(item.duration).toBe(0);
});
test('아이템의 종료시간만 입력되었을 때, 시작시간은 현재시간과 같다.', function () {
    // new Date() mocked to return '2020-04-13 00:00:00'
    var item = new TaskItem_1.TaskItem(null, '2020-04-14 00:00:00');
    expect(item.startAt).toEqual(new Date('2020-04-13 00:00:00'));
    expect(item.endAt).toEqual(new Date('2020-04-14 00:00:00'));
    expect(item.duration).toBe(86400000);
});
test('아이템의 종료시간이 시작시간보다 이전이면, 종료시간이 시작시간으로 변경된다', function () {
    var item = new TaskItem_1.TaskItem('2020-04-14 00:00:00', '2020-04-13 23:00:00');
    expect(item.startAt).toEqual(new Date('2020-04-14 00:00:00'));
    expect(item.endAt).toEqual(new Date('2020-04-14 00:00:00'));
    expect(item.duration).toBe(0);
});
test('아이템의 시작시간을 변경할 수 있다.', function () {
    var item = new TaskItem_1.TaskItem('2020-04-14 00:00:00', '2020-04-15 03:00:00');
    item.startAt = new Date('2020-04-14 03:00:00');
    expect(item.startAt).toEqual(new Date('2020-04-14 03:00:00'));
    expect(item.endAt).toEqual(new Date('2020-04-15 03:00:00'));
    expect(item.duration).toBe(86400000);
});
test('아이템의 시작시간이 아이템의 종료시간보다 크면, 아이템의 종료시간은 duration만큼 이동한다.', function () {
    var item = new TaskItem_1.TaskItem('2020-04-14 00:00:00', '2020-04-15 03:00:00');
    item.startAt = new Date('2020-04-16 03:00:00');
    expect(item.startAt).toEqual(new Date('2020-04-16 03:00:00'));
    expect(item.endAt).toEqual(new Date('2020-04-17 06:00:00'));
    expect(item.duration).toBe(97200000);
});
test('아이템의 종료시간이 아이템의 시작시간보다 작으면, 아이템의 종료시간은 변경되지 않는다.', function () {
    var item = new TaskItem_1.TaskItem('2020-04-14 00:00:00', '2020-04-15 03:00:00');
    item.endAt = new Date('2020-04-13 03:00:00');
    expect(item.startAt).toEqual(new Date('2020-04-14 00:00:00'));
    expect(item.endAt).toEqual(new Date('2020-04-15 03:00:00'));
    expect(item.duration).toBe(97200000);
});
