"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TaskItemList_1 = require("./TaskItemList");
var TaskItem_1 = require("../TaskItem/TaskItem");
var item1, item2, item3;
beforeAll(function () {
    item1 = new TaskItem_1.TaskItem('2020-04-14 00:00:00', '2020-04-15 03:00:00');
    item2 = new TaskItem_1.TaskItem('2020-04-15 03:00:00', '2020-04-15 06:00:00');
    item3 = new TaskItem_1.TaskItem('2020-04-17 00:00:00', '2020-04-17 03:00:00');
});
test('아이템 목록은 비어있다.', function () {
    var list = new TaskItemList_1.TaskItemList();
    expect(list.items.length).toBe(0);
});
test('아이템을 넣어서 초기화할 수 있다.', function () {
    var list = new TaskItemList_1.TaskItemList([item1, item2, item3]);
    expect(list.items).toEqual([item1, item2, item3]);
});
test('아이템을 추가할 수 있다.', function () {
    var list = new TaskItemList_1.TaskItemList();
    list.add(item1);
    expect(list.items).toEqual([item1]);
});
test('Item 타입인 아이템만 추가할 수 있다.', function () {
    var list1 = new TaskItemList_1.TaskItemList();
    // @ts-ignore
    list1.add();
    expect(list1.items).toEqual([]);
    var list2 = new TaskItemList_1.TaskItemList();
    // @ts-ignore
    list2.add(0);
    expect(list2.items).toEqual([]);
    var list3 = new TaskItemList_1.TaskItemList();
    list3.add(null);
    expect(list3.items).toEqual([]);
});
test('아이템을 삭제할 수 있다.', function () {
    var list = new TaskItemList_1.TaskItemList([item1, item2, item3]);
    list.remove(item2);
    expect(list.items).toEqual([item1, item3]);
});
test('아이템을 아이디로 삭제할 수 있다.', function () {
    var list = new TaskItemList_1.TaskItemList([item1, item2, item3]);
    list.remove(item2.id);
    expect(list.items).toEqual([item1, item3]);
});
test('아이템을 수정할 수 있다.', function () {
    var list = new TaskItemList_1.TaskItemList([item1, item2, item3]);
    item1.startAt = new Date('2020-04-01 00:00:00');
    expect(list.items[0]).not.toEqual(item1);
    list.update(item1);
    expect(list.items[0]).toEqual(item1);
});
test('초기화할 때 넘겨주는 아이템 목록 중 TaskItem 타입인 것만 아이템 목록으로 지정된다.', function () {
    // @ts-ignore
    var list = new TaskItemList_1.TaskItemList([null, item1, 1, item2, 'string', item3]);
    expect(list.items.length).toEqual(3);
    expect(list.items[0]).toEqual(item1);
    expect(list.items[1]).toEqual(item2);
    expect(list.items[2]).toEqual(item3);
});
