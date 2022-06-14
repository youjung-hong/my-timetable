import { ITimeline } from './ITimeline';
import { TIMETABLE_INNERHTML, TIMELINE_INNERHTML } from './templates';
import { Timeline } from './Timeline';

export class Timetable {
    rootElement: HTMLElement
    hourElements: HTMLElement[]
    timelines: Timeline[]

    constructor(rootElement: HTMLElement, timelines: ITimeline[] = []) {
        this.rootElement = rootElement;
        this.hourElements = [];
        this.timelines = timelines.map(item => new Timeline(item));
        this.init();
    }

    init() {
        this.rootElement.innerHTML = TIMETABLE_INNERHTML;
        this.hourElements = []
        const hourElements = this.rootElement.querySelectorAll('.contents .hours div.hour');
        this.hourElements = [].slice.call(hourElements, 0, 0);
        this.timelines.forEach(item => {
            const timelineElement = document.createElement('div');
            timelineElement.innerHTML = TIMELINE_INNERHTML(item, 0, '10%');
        })
    }
}