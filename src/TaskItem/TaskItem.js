let nextId = 1

/**
 * @class
 * @constructor
 * @param {Date} startAt - datetime when user started a task
 * @param {Date} endAt - datetime when user ended a task
 * @param {any} meta - metadata
 * @example
 * // startAt: now, endAt: now
 * const task = new TaskItem();
 * @example
 * // startAt: new Date('2020-04-13T00:00:00'), endAt: new Date('2020-04-13T00:00:00')
 * const task = new TaskItem('2020-04-13T00:00:00');
 * @example
 * // startAt: new Date('2020-04-13T00:00:00'), endAt: new Date('2020-04-15T00:00:00')
 * const task = new TaskItem('2020-04-13T00:00:00', '2020-04-15T00:00:00');
 * @example
 * // startAt: new Date('2020-04-13T00:00:00'), endAt: new Date('2020-04-15T00:00:00')
 * // meta: { id: 1 }
 * const task = new TaskItem('2020-04-13T00:00:00', '2020-04-15T00:00:00', { id: 1 });
 */
export class TaskItem {
  constructor(startAt, endAt, meta) {
    this.id = nextId
    this._startAt = startAt ? new Date(startAt) : new Date()
    this._endAt = endAt ? new Date(endAt) : this.startAt

    if (this._startAt > this._endAt) {
      this._endAt = this._startAt
    }

    this.meta = meta

    this.calculateDuration()

    nextId += 1
  }

  set startAt(_startAt) {
    this._startAt = _startAt instanceof Date ? _startAt : new Date(_startAt)

    if (this._startAt > this._endAt) {
      this._endAt = new Date(this._startAt.getTime() + this.duration)
      return
    }

    this.calculateDuration()
  }

  get startAt() {
    return this._startAt
  }

  set endAt(_endAt) {
    const endAt = _endAt instanceof Date ? _endAt : new Date(_endAt)

    if (endAt < this._startAt) {
      return
    }

    this._endAt = endAt
    this.calculateDuration()
  }

  get endAt() {
    return this._endAt
  }

  /**
   * calculate milliseconds between startAt and endAt and set it to duration
   * @private
   */
  calculateDuration() {
    this.duration = this.endAt - this.startAt
  }
}

/**
 * clone a task item
 * @static
 * @param {TaskItem} item - an item to be cloned
 * @returns {TaskItem} a new item having the same data
 * @example
 * const task1 = new TaskItem();
 * const cloneOfTask1 = TaskItem.clone(task1);
 */
TaskItem.clone = (item) => {
  const taskItem = new TaskItem()
  taskItem.id = item.id
  taskItem.startAt = item.startAt
  taskItem.endAt = item.endAt
  taskItem.meta = item.meta

  return taskItem
}
