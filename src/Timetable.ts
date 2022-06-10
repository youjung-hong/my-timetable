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
        this.rootElement.innerHTML = `<div class="timetable">
            <div class="hours hour-header">
                <div class="hour">0</div>
                <div class="hour">1</div>
                <div class="hour">2</div>
                <div class="hour">3</div>
                <div class="hour">4</div>
                <div class="hour">5</div>
                <div class="hour">6</div>
                <div class="hour">7</div>
                <div class="hour">8</div>
                <div class="hour">9</div>
                <div class="hour">10</div>
                <div class="hour">11</div>
                <div class="hour">12</div>
                <div class="hour">13</div>
                <div class="hour">14</div>
                <div class="hour">15</div>
                <div class="hour">16</div>
                <div class="hour">17</div>
                <div class="hour">18</div>
                <div class="hour">19</div>
                <div class="hour">20</div>
                <div class="hour">21</div>
                <div class="hour">22</div>
                <div class="hour">23</div>
            </div>
            <div class="contents">
                <div class="minutes">
                    <div class="minute minute-0">0</div>
                    <div class="minute minute-10">10</div>
                    <div class="minute minute-20">20</div>
                    <div class="minute minute-30">30</div>
                    <div class="minute minute-40">40</div>
                    <div class="minute minute-50">50</div>
                </div>
                <div class="hours">
                    <div class="hour">0</div>
                    <div class="hour">1</div>
                    <div class="hour">2</div>
                    <div class="hour">3</div>
                    <div class="hour">4</div>
                    <div class="hour">5</div>
                    <div class="hour">6</div>
                    <div class="hour">7</div>
                    <div class="hour">8</div>
                    <div class="hour">9</div>
                    <div class="hour">10</div>
                    <div class="hour">11</div>
                    <div class="hour">12</div>
                    <div class="hour">13</div>
                    <div class="hour">14</div>
                    <div class="hour">15</div>
                    <div class="hour">16</div>
                    <div class="hour">17</div>
                    <div class="hour">18</div>
                    <div class="hour">19</div>
                    <div class="hour">20</div>
                    <div class="hour">21</div>
                    <div class="hour">22</div>
                    <div class="hour">23</div>
                </div>
            </div>
        </div>`;
    }
}