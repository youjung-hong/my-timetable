import { ITimeline } from './ITimeline';
import { TIMETABLE_INNERHTML, TIMELINE_INNERHTML } from './templates';
import { Timeline } from './Timeline';

export class Timetable {
    private rootElement: HTMLElement
    private hourElements: HTMLElement[]
    private timelines: Timeline[]
    private options: {
        startHour: number
    }

    constructor(rootElement: HTMLElement, timelines?: ITimeline[], options?: {
        startHour: number
    }) {
        this.rootElement = rootElement;
        this.hourElements = [];
        this.timelines = (timelines || []).map(item => new Timeline(item));
        this.options = options || { startHour: 0 };
        this.init();
    }

    private init() {
        this.rootElement.innerHTML = TIMETABLE_INNERHTML(this.options.startHour || 0);
        
        const hourElements = this.rootElement.querySelectorAll('.contents .hours div.hour');
        this.hourElements = [].slice.call(hourElements);
        
        this.timelines.forEach(item => this.draw(item))
    }

    private draw(timeline: Timeline) {
        const startAtHours = timeline.startAt.getHours();
        const endAtHours = timeline.endAt.getHours();

        for(let i = startAtHours; i <= endAtHours; i += 1) {
            const startAtMinutes = startAtHours === i ? timeline.startAt.getMinutes() : 0;
            const endAtMinutes = endAtHours === i ? timeline.endAt.getMinutes() : 60;
            if (startAtMinutes === endAtMinutes) {
                break;
            }

            const left = startAtMinutes / 60 * 100;
            const width = (endAtMinutes - startAtMinutes) / 60 * 100;

            const timelineElement = document.createElement('div');
            timelineElement.innerHTML = TIMELINE_INNERHTML(timeline, left + '%', width + '%');
            this.hourElements[i - this.options.startHour]?.append(timelineElement);
        }
    }

    getTimelines() {
        return this.timelines;
    }

    addTimeline(_timeline: ITimeline) {
        this.removeTimeline(_timeline.id);

        const timeline = new Timeline(_timeline);
        this.timelines.push(timeline);
        this.timelines.sort((a, b) => a.id - b.id);

        this.draw(timeline);
    }

    removeTimeline(id: number) {
        let idx = this.timelines.findIndex(item => item.id === id);
        if (idx === -1) {
            return;
        }

        this.timelines.splice(idx, 1);
        const timelineElements = this.rootElement.querySelectorAll(`.timeline[data-timeline-id="${id}"]`) as NodeListOf<HTMLDivElement>;
        timelineElements.forEach(element => {
            element.parentElement!.remove();
        })
    }
}