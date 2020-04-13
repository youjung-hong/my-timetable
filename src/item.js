let nextId = 1

export class Item {
  constructor(startAt, endAt) {
    this.id = nextId
    this.startAt = startAt ? new Date(startAt) : new Date()
    this.endAt = endAt ? new Date(endAt) : this.startAt

    if (this.startAt > this.endAt) {
      this.endAt = this.startAt
    }

    this.duration = this.endAt - this.startAt

    nextId += 1
  }
}
