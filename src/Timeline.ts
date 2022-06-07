export class Timeline {
    id: number
    color: string
    startAt: Date
    endAt: Date
    meta?: any

    constructor(id: number, color: string, startAt: Date, endAt: Date, meta?: any) {
        this.id = id;
        this.color = color;
        this.startAt = startAt;
        this.endAt = endAt;
        this.meta = meta;
    }
}