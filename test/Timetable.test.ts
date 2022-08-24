import { Timetable } from '../src/Timetable';

beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';
})

// 초기화
// - rootElement가 없으면 에러난다.
// - rootelement가 있으면, 그 아래에 생성된다.
// - timelines가 없어도 된다. 
// - timelines가 있으면 추가된다.
// - options가 없어도 된다.
// - options.startHour가 있으면, 시작 시점이 변경된다. 
test('initialization OK: new Timetable(rootElement)', () => {
    const rootElement = document.getElementById('root') as HTMLDivElement;
    const timetable = new Timetable(rootElement);
    expect(timetable).toBeInstanceOf(Timetable);
    expect(timetable.getTimelines()).toEqual([]);
    expect(rootElement.outerHTML).toMatchSnapshot();
})

test('initialization Error: new Timetable(null)', () => {
    expect(() => {
        const rootElement = document.getElementById('root1') as HTMLDivElement;
        new Timetable(rootElement);
    }).toThrowError();
})

test('initialization OK: new Timetable(rootElement, timelines)', () => {
    const rootElement = document.getElementById('root') as HTMLDivElement;
    const timetable1 = new Timetable(rootElement, []);
    expect(timetable1).toBeInstanceOf(Timetable);
    expect(timetable1.getTimelines()).toEqual([]);
    expect(rootElement.outerHTML).toMatchSnapshot();

    const timetable2 = new Timetable(rootElement, [{
        id: 1,
        color: 'yellow',
        startAt: '2022-06-23T07:30:00',
        endAt: '2022-06-23T09:00:00',
    }]);
    expect(timetable2).toBeInstanceOf(Timetable);
    expect(timetable2.getTimelines().length).toEqual(1);
    expect(timetable2.getTimelines()[0].id).toEqual(1);
    expect(timetable2.getTimelines()[0].color).toEqual('yellow');
    expect(timetable2.getTimelines()[0].startAt).toEqual(new Date('2022-06-23T07:30:00'));
    expect(timetable2.getTimelines()[0].endAt).toEqual(new Date('2022-06-23T09:00:00'));
    expect(timetable2.getTimelines()[0].meta).toBeUndefined();
    expect(rootElement.outerHTML).toMatchSnapshot();
});

test('initialization OK: new Timetable(rootElement, timelines, options)', () => {
    const rootElement = document.getElementById('root') as HTMLDivElement;
    const timetable = new Timetable(rootElement, [], {
        startHour: 5
    });
    expect(timetable).toBeInstanceOf(Timetable);
    expect(timetable.getTimelines()).toEqual([]);
    expect(rootElement.outerHTML).toMatchSnapshot();
})

// addTimeline: 추가한다 // 수정한다
// - 값이 없는 것을 추가하면 새로 생긴다.화면에도 추가된다.
// - 값이 있는 것을 추가하면 수정한다.화면에도 수정된다 
test('addTimelines: create new timelines', () => {
    const rootElement = document.getElementById('root') as HTMLDivElement;
    const timetable = new Timetable(rootElement);
    timetable.addTimelines([{
        id: 3,
        color: 'blue',
        startAt: '2022-06-20T10:30:00',
        endAt: '2022-06-20T11:15:00'
    }]);

    expect(timetable.getTimelines().length).toEqual(1);
    expect(timetable.getTimelines()[0].id).toEqual(3);
    expect(timetable.getTimelines()[0].color).toEqual('blue');
    expect(timetable.getTimelines()[0].startAt).toEqual(new Date('2022-06-20T10:30:00'));
    expect(timetable.getTimelines()[0].endAt).toEqual(new Date('2022-06-20T11:15:00'));
    expect(timetable.getTimelines()[0].meta).toBeUndefined();
    expect(rootElement.outerHTML).toMatchSnapshot();
});

test('addTimelines: modify existing timelines', () => {
    const rootElement = document.getElementById('root') as HTMLDivElement;
    const timetable = new Timetable(rootElement, [{
        id: 1,
        color: 'yellow',
        startAt: '2022-06-23T07:30:00',
        endAt: '2022-06-23T09:00:00',
    }]);

    timetable.addTimelines([{
        id: 1,
        color: 'blue',
        startAt: '2022-06-23T11:00:00',
        endAt: '2022-06-23T12:15:00'
    }]);

    expect(timetable.getTimelines().length).toEqual(1);
    expect(timetable.getTimelines()[0].id).toEqual(1);
    expect(timetable.getTimelines()[0].color).toEqual('blue');
    expect(timetable.getTimelines()[0].startAt).toEqual(new Date('2022-06-23T11:00:00'));
    expect(timetable.getTimelines()[0].endAt).toEqual(new Date('2022-06-23T12:15:00'));
    expect(timetable.getTimelines()[0].meta).toBeUndefined();
    expect(rootElement.outerHTML).toMatchSnapshot();
})

// removeTimeline: 지운다 
// - id가 있는 애들을 넣는다, 삭제된다. 화면에서도 지워진다. 
// - id가 안 맞는 애들을 넣으면, 아무것도 변하지 않는다. 
test('removeTimelines: remove existing timelines', () => {
    const rootElement = document.getElementById('root') as HTMLDivElement;
    const timetable = new Timetable(rootElement, [{
        id: 1,
        color: 'yellow',
        startAt: '2022-06-23T07:30:00',
        endAt: '2022-06-23T09:00:00',
    }]);

    timetable.removeTimelines([1]);

    expect(timetable.getTimelines().length).toEqual(0);
    expect(rootElement.outerHTML).toMatchSnapshot();
})

test('removeTimelines: cannot remove timelines which is not exist inside timetable', () => {
    const rootElement = document.getElementById('root') as HTMLDivElement;
    const timetable = new Timetable(rootElement, [{
        id: 1,
        color: 'yellow',
        startAt: '2022-06-23T07:30:00',
        endAt: '2022-06-23T09:00:00',
    }]);

    timetable.removeTimelines([2]);

    expect(timetable.getTimelines().length).toEqual(1);
    expect(rootElement.outerHTML).toMatchSnapshot();
})
