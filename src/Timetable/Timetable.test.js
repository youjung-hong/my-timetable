"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Timetable_1 = require("./Timetable");
var TaskItem_1 = require("../TaskItem/TaskItem");
beforeEach(function () {
    document.body.innerHTML = '<div id="timetable"></div>';
});
test('id로 루트엘리먼트를 찾는다.', function () {
    var timetable = new Timetable_1.Timetable('timetable');
    expect(timetable.rootElement).toBe(document.getElementById('timetable'));
});
test('루트엘리먼트를 찾을 수 없으면 rootElement가 null이다.', function () {
    document.body.innerHTML = '';
    expect(new Timetable_1.Timetable('').rootElement).toBe(null);
    expect(new Timetable_1.Timetable(null).rootElement).toBe(null);
});
test('초기화하면 아이템 목록이 비어있다.', function () {
    var timetable = new Timetable_1.Timetable('timetable');
    expect(timetable.list.items).toEqual([]);
});
test('초기화할 때, 아이템 목록을 넘겨줄 수 있다.', function () {
    var item1 = new TaskItem_1.TaskItem('2020-04-24 00:00:00');
    var timetable = new Timetable_1.Timetable('timetable', [item1]);
    expect(timetable.list.items.length).toBe(1);
    expect(timetable.list.items[0].startAt).toEqual(item1.startAt);
    expect(timetable.list.items[0].endAt).toEqual(item1.endAt);
    expect(timetable.list.items[0].duration).toEqual(item1.duration);
});
