import { ITimeline } from './ITimeline';
import { TIMETABLE_INNERHTML, TIMELINE_INNERHTML } from './templates';
import { Timeline } from './Timeline';

export class Timetable {
    rootElement: HTMLElement
    hourElements: HTMLElement[]
    timelines: Timeline[]
    options: {
        startHour: number
    }

    constructor(rootElement: HTMLElement, timelines: ITimeline[] = [], options: {
        startHour: number
    }) {
        this.rootElement = rootElement;
        this.hourElements = [];
        this.timelines = timelines.map(item => new Timeline(item));
        this.options = options;
        this.init();
    }

    init() {
        this.rootElement.innerHTML = TIMETABLE_INNERHTML(this.options.startHour || 0);
        this.hourElements = []
        const hourElements = this.rootElement.querySelectorAll('.contents .hours div.hour');
        this.hourElements = [].slice.call(hourElements);
        
        this.timelines.forEach(item => {
            const startAtHours = item.startAt.getHours();
            const endAtHours = item.endAt.getHours();

            for(let i = startAtHours; i <= endAtHours; i += 1) {
                const startAtMinutes = startAtHours === i ? item.startAt.getMinutes() : 0;
                const endAtMinutes = endAtHours === i ? item.endAt.getMinutes() : 60;
                if (startAtMinutes === endAtMinutes) {
                    break;
                }

                const left = ((startAtMinutes / 60) * 100);
                const width = ((endAtMinutes - startAtMinutes)) / 60 * 100;

                const timelineElement = document.createElement('div');
                timelineElement.innerHTML = TIMELINE_INNERHTML(item, left + '%', width + '%');
                this.hourElements[i - this.options.startHour].append(timelineElement);
            }
        })
    }
}