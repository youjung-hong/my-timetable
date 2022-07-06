import { Timeline } from "./Timeline";

export const TIMETABLE_INNERHTML = (_startHour: number = 0) => {
    const startHour = _startHour % 24;
    const hourRange = [];
    for (let i = 0; i < 24; i += 1) {
        hourRange.push((startHour + i) % 24);
    }
    
    return '<div class="timetable">' +
        '<div class="hours hour-header">' +
            hourRange.map(hour => `<div class="hour">${hour}</div>`).join('') +
        '</div>' +
        `<div class="contents">
            <div class="minutes">
                <div class="minute minute-0">00</div>
                <div class="minute minute-10">10</div>
                <div class="minute minute-20">20</div>
                <div class="minute minute-30">30</div>
                <div class="minute minute-40">40</div>
                <div class="minute minute-50">50</div>
            </div>` +
            '<div class="hours">'+
                hourRange.map(hour => `<div class="hour" data-hour="${hour}">${hour}</div>`).join('') +
            '</div>' +
        '</div>' +
    '</div>';
}

export const TIMELINE_INNERHTML = (timeline: Timeline, left: number | string, width: number | string) =>
    `<div class="timeline" style="left: ${left}; width: calc(${width} - 1px); background-color: ${timeline.color};" data-timeline-id="${timeline.id}"></div>`