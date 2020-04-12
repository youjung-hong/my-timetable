export class Item {
  startAt = null
  endAt = null
  duration = 0

  constructor(startAt, endAt) {
    this.startAt = startAt ? new Date(startAt) : new Date()
    this.endAt = endAt ? new Date(endAt) : this.startAt

    if (this.startAt > this.endAt) {
      this.endAt = this.startAt
    }

    this.duration = this.endAt - this.startAt
  }
}
