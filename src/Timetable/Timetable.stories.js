"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OneTaskClicked = exports.OneTaskUpdated = exports.OneTaskInserted = exports.OneTaskDuringDifferentHour = exports.OneTaskDuringSameHour = exports.InitialState = void 0;
var Timetable_1 = require("./Timetable");
var TaskItem_1 = require("../TaskItem/TaskItem");
require("../index.css");
function createRootElement() {
    var rootElement = document.createElement('div');
    rootElement.id = 'timetable';
    rootElement.style.width = '20%';
    return rootElement;
}
function createTimetable(taskItems) {
    var rootElement = createRootElement();
    setTimeout(function () {
        new Timetable_1.Timetable('timetable', taskItems);
    });
    return rootElement;
}
function createTimetableThenInsertItem(item) {
    var rootElement = createRootElement();
    setTimeout(function () {
        var timetable = new Timetable_1.Timetable('timetable');
        timetable.insert(item);
    });
    return rootElement;
}
function createTimetableThenUpdateItem(initial, updatedStartAt) {
    var rootElement = createRootElement();
    setTimeout(function () {
        var timetable = new Timetable_1.Timetable('timetable', [initial]);
        initial.startAt = new Date(updatedStartAt);
        timetable.update(initial);
    });
    return rootElement;
}
function createTimetableThenSetOnClickTimeLogBar(taskItems, onClickTimeLogBar) {
    var rootElement = createRootElement();
    setTimeout(function () {
        new Timetable_1.Timetable('timetable', taskItems, onClickTimeLogBar);
    });
    return rootElement;
}
exports.default = {
    title: 'Timetable',
    component: Timetable_1.Timetable,
};
var InitialState = function () { return createTimetable(); };
exports.InitialState = InitialState;
exports.InitialState.story = {
    name: '초기 상태',
};
var OneTaskDuringSameHour = function () {
    return createTimetable([new TaskItem_1.TaskItem('2020-05-05T18:00:00', '2020-05-05T18:45:00')]);
};
exports.OneTaskDuringSameHour = OneTaskDuringSameHour;
exports.OneTaskDuringSameHour.story = {
    name: '[R] 18:00:00 - 18:45:00',
};
var OneTaskDuringDifferentHour = function () {
    return createTimetable([
        new TaskItem_1.TaskItem('2020-05-05T04:50:00', '2020-05-05T05:05:00'),
        new TaskItem_1.TaskItem('2020-05-05T05:05:00', '2020-05-05T07:15:00'),
    ]);
};
exports.OneTaskDuringDifferentHour = OneTaskDuringDifferentHour;
exports.OneTaskDuringDifferentHour.story = {
    name: '[R] 04:50:00 - 05:05:00\n05:05:00 - 07:15:00',
};
var OneTaskInserted = function () {
    return createTimetableThenInsertItem(new TaskItem_1.TaskItem('2020-05-05T04:50:00', '2020-05-05T05:05:00'));
};
exports.OneTaskInserted = OneTaskInserted;
exports.OneTaskInserted.story = {
    name: '[C] 04:50:00 - 05:05:00',
};
var OneTaskUpdated = function () {
    return createTimetableThenUpdateItem(new TaskItem_1.TaskItem('2020-05-05T04:50:00', '2020-05-05T05:05:00'), '2020-05-05T04:05:00');
};
exports.OneTaskUpdated = OneTaskUpdated;
exports.OneTaskUpdated.story = {
    name: '[U] 04:50:00 - 05:05:00\n -> 04:05:00 - 05:05:00',
};
var OneTaskClicked = function () {
    return createTimetableThenSetOnClickTimeLogBar([new TaskItem_1.TaskItem('2020-05-05T04:50:00', '2020-05-05T05:05:00', { id: 1 })], function (data) {
        alert('데이터: ' + JSON.stringify(data));
    });
};
exports.OneTaskClicked = OneTaskClicked;
exports.OneTaskClicked.story = {
    name: '[R] 04:50:00 - 05:05:00 클릭',
};
