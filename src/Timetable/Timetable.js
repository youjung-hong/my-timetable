"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timetable = void 0;
var TimetableTemplate_1 = require("./template/TimetableTemplate");
var TaskItemList_1 = require("../TaskItemList/TaskItemList");
var TaskItemDomUtil_1 = require("../TaskItemDomUtil/TaskItemDomUtil");
/**
 * @class
 * @constructor
 * @param {string} id - root element id
 * @param {TaskItem[]} items - task items
 * @param {meta: any => void} onClickTimeLogBar - call when click time log bar
 * @example
 * const timetable = new Timetable('root');
 * @example
 * const timetable = new Timetable('root', [new TaskItem()])
 * @example
 * const timetable = new Timetable('root', [new TaskItem()], { id: 1 })
 */
var Timetable = /** @class */ (function () {
    function Timetable(id, items, onClickTimeLogBar) {
        this.rootElement = document.getElementById(id);
        if (this.rootElement) {
            this.rootElement.className = 'root';
            this.rootElement.innerHTML = TimetableTemplate_1.default;
        }
        this.onClickTimeLogBar = onClickTimeLogBar || (function () { });
        this.list = new TaskItemList_1.TaskItemList(items);
        this.eventHandlerMap = new Map();
        this.drawItems(this.list.items);
    }
    /**
     * insert new item and draw it on timetable
     * @param {TaskItem} item - a new item
     */
    Timetable.prototype.insert = function (item) {
        this.list.add(item);
        this.drawItem(item);
    };
    /**
     * update an item and redraw it on timetable
     * @param {TaskItem} item - an existing item to update
     */
    Timetable.prototype.update = function (item) {
        this.list.update(item);
        this.eraseItem(item.id);
        this.drawItem(item);
    };
    /**
     * delete an item and erase it on timetable
     * @param {TaskItem} item - an existing item to delete
     */
    Timetable.prototype.delete = function (item) {
        this.list.remove(item.id);
        this.eraseItem(item.id);
    };
    /**
     * delete an element having item id data from timetable
     * @private
     * @param {number} itemId
     */
    Timetable.prototype.eraseItem = function (itemId) {
        var _this = this;
        Array.from(this.rootElement.querySelectorAll("div[data-item-id='".concat(itemId, "']"))).forEach(function (element) {
            element.removeEventListener('click', _this.eventHandlerMap.get(element));
            _this.eventHandlerMap.set(element, null);
            element.parentElement.removeChild(element);
        });
    };
    /**
     * draw an item on timetable
     * @private
     * @param {TaskItem} item - a task item
     */
    Timetable.prototype.drawItem = function (item) {
        var _this = this;
        var positions = TaskItemDomUtil_1.default.calculatePositions(item);
        positions.forEach(function (position) {
            // if (position.endOfHour >= 24) {
            //   return
            // }
            var element = document.createElement('div');
            element.dataset.itemId = item.id.toString();
            element.className = 'task-log';
            element.style.width = position.width;
            element.style.height = position.height;
            element.style.top = position.top;
            element.style.left = position.left;
            if (position.meta.startOfHour) {
                element.style.borderTopLeftRadius = '0 0';
                element.style.borderBottomLeftRadius = '0 0';
            }
            if (position.meta.endOfHour) {
                element.style.borderTopRightRadius = '0 0';
                element.style.borderBottomRightRadius = '0 0';
            }
            if (_this.eventHandlerMap.get(element)) {
                element.removeEventListener('click', _this.eventHandlerMap.get(element));
            }
            _this.eventHandlerMap.set(element, (function () {
                _this.onClickTimeLogBar(position.meta.data);
            }).bind(_this));
            element.addEventListener('click', _this.eventHandlerMap.get(element));
            _this.rootElement.appendChild(element);
        }, this);
    };
    /**
     * draw all items on timetable
     * @param {TaskItem[]} items - all task items
     */
    Timetable.prototype.drawItems = function (items) {
        var _this = this;
        items.forEach(function (item) { return _this.drawItem(item); });
    };
    return Timetable;
}());
exports.Timetable = Timetable;
