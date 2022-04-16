"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskItemList = void 0;
var TaskItem_1 = require("../TaskItem/TaskItem");
/**
 * @class
 * @constructor
 * @param {TaskItem[]} items - task items
 */
var TaskItemList = /** @class */ (function () {
    function TaskItemList(items) {
        var _this = this;
        this.items = [];
        if (items) {
            items.forEach(function (item) { return _this.add(item); });
        }
    }
    /**
     * add an item to list
     * @param {TaskItem} item - a task item
     */
    TaskItemList.prototype.add = function (item) {
        if (item instanceof TaskItem_1.TaskItem) {
            this.items.push(TaskItem_1.TaskItem.clone(item));
        }
    };
    /**
     * delete an item from list
     * @param {number} removeId - an id of a task item which user wants to delete
     */
    TaskItemList.prototype.remove = function (removeId) {
        var id = removeId instanceof TaskItem_1.TaskItem ? removeId.id : removeId;
        this.items = this.items.filter(function (item) { return item.id !== id; });
    };
    /**
     * update an existing item from list
     * @param {TaskItem} updateItem - an item having new data that user wants to update
     */
    TaskItemList.prototype.update = function (updateItem) {
        this.items = this.items.map(function (item) {
            if (item.id === updateItem.id) {
                return TaskItem_1.TaskItem.clone(updateItem);
            }
            return item;
        });
    };
    return TaskItemList;
}());
exports.TaskItemList = TaskItemList;
