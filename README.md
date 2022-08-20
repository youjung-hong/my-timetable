# my-timetable

![my-timetable](https://user-images.githubusercontent.com/13758710/185757230-6dc7a058-eda5-46a6-8825-14d939abd466.png)

## Get Started

### Install
```html
<script src="https://raw.githubusercontent.com/youjung-hong/my-timetable/main/dist/main.js"></script>
```

### Initialize
```js
const timetable = new MyTimetable(document.getElementById('root'), [{
    id: 1,
    color: '#51FF0D',
    startAt: '2022-01-02T07:15:00',
    endAt: '2022-01-02T07:20:00',
}]);
```

### Create timeline
```js
timetable.addTimeline({
    id: 2,
    color: '#FF0DCA',
    startAt: '2022-06-20T18:10:00',
    endAt: '2022-06-20T18:55:00'
});
```
### Update timeline
```js
timetable.addTimeline({
    id: 2,
    color: '#FF0DCA',
    startAt: '2022-06-20T08:30:00',
    endAt: '2022-06-20T09:00:00'
});
```
### Delete timelate
```js
 timetable.removeTimeline(1);
```

## Links

- [HTML demo page](https://youjung-hong.github.io/my-timetable/)
