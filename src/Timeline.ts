import { ITimeline } from "./ITimeline"

export class Timeline implements ITimeline {
    
    id: number
    color: string
    startAt: Date
    endAt: Date
    meta?: any

    constructor(data: ITimeline) {
        this.id = data.id;
        this.color = data.color;
        this.startAt = data.startAt;
        this.endAt = data.endAt;
        this.meta = data.meta;
    }
}