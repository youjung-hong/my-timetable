import { ITimeline } from "./ITimeline"

export class Timeline {
    
    id: number
    color: string
    startAt: Date
    endAt: Date
    meta?: any

    constructor(data: ITimeline) {
        this.id = data.id;
        this.color = data.color;
        this.startAt = new Date(data.startAt);
        this.endAt = new Date(data.endAt);
        this.meta = data.meta;
    }
}