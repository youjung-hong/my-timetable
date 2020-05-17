let nextId = 1

export class TaskItem {
  constructor(startAt, endAt) {
    this.id = nextId
    this._startAt = startAt ? new Date(startAt) : new Date()
    this._endAt = endAt ? new Date(endAt) : this.startAt

    if (this._startAt > this._endAt) {
      this._endAt = this._startAt
    }

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

  calculateDuration() {
    this.duration = this._endAt - this.startAt
  }
}

TaskItem.clone = (item) => {
  const taskItem = new TaskItem()
  taskItem.id = item.id
  taskItem.startAt = item.startAt
  taskItem.endAt = item.endAt

  return taskItem
}
