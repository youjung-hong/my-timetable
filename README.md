# my-timetable

![my-timetable](https://user-images.githubusercontent.com/13758710/186532935-d792a92e-1fd9-42c3-b2b5-7e8d4bc45a1c.png)

## Get Started

### Install

```html
<script src="https://raw.githubusercontent.com/youjung-hong/my-timetable/main/dist/main.js"></script>
```

### Initialize

```js
const timetable = new MyTimetable(document.getElementById('root'), [
  {
    id: 1,
    color: '#51FF0D',
    startAt: '2022-01-02T07:15:00',
    endAt: '2022-01-02T07:20:00',
  },
])
```

### Get timelines

```js
timetable.getTimelines()
timetable.getTimeline(1) // find by id
```

### Create/Update timelines

```js
timetable.addTimelines([
  {
    id: 2,
    color: '#FF0DCA',
    startAt: '2022-06-20T18:10:00',
    endAt: '2022-06-20T18:55:00',
  },
])
```

### Delete timelines

```js
timetable.removeTimelines([1])
```

## Links

- [Storybook](https://youjung-hong.github.io/my-timetable/)
