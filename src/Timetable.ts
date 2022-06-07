import { Timeline } from './Timeline'

export class Timetable {
    rootElement: HTMLElement
    timelines: Timeline[]

    constructor(rootElement: HTMLElement, timelines: Timeline[]) {
        this.rootElement = rootElement;
        this.timelines = timelines;
        this.init();
    }

    init() {
        
    }
}