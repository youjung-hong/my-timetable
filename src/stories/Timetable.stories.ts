import { Story } from '@storybook/html'
import { ITimeline } from '../ITimeline'
import { Timetable } from '../Timetable'
import '../index.css'
import { sleep } from './utils'

const now = new Date()
const after45min = new Date(now.getTime() + 2700000) // 2700000 = 45 * 60000

// More on default export: https://storybook.js.org/docs/html/writing-stories/introduction#default-export
export default {
  title: 'Example/Timetable',
  viewport: {
    defaultViewport: 'iPad',
  },
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {
    rootElement: {
      name: 'rootElement',
      table: {
        type: { summary: 'HTMLElement' },
      },
    },
    timelines: {
      name: 'timelines[]',
      type: { name: 'array', required: false },
      defaultValue: [
        {
          id: 1,
          color: '#51FF0D',
          startAt: '2022-08-20T10:15:00',
          endAt: '2022-08-20T11:30:00',
        },
        {
          id: 2,
          color: '#FF0DCA',
          startAt: '2022-08-20T12:05:00',
          endAt: '2022-08-20T12:20:00',
        },
        {
          id: 3,
          color: '#F2FF00',
          startAt: '2022-08-20T15:15:00',
          endAt: '2022-08-20T16:00:00',
        },
      ],
      description: 'timeline data',
      table: {
        type: { summary: 'ITimeline[]' },
        defaultValue: { summary: '[]' },
      },
      control: {
        type: 'object',
      },
    },
    startAt: {
      name: 'timelines[].startAt',
      type: { name: 'date', required: true },
      defaultValue: now,
      description: 'time at which a timeline block start',
      table: {
        type: { summary: 'yyyy-MM-ddThh:mm:ss' },
      },
      control: {
        type: 'date',
      },
    },
    endAt: {
      name: 'timelines[].endAt',
      type: { name: 'date', required: true },
      defaultValue: after45min,
      description: 'time at which a timeline block end',
      table: {
        type: { summary: 'yyyy-MM-ddThh:mm:ss' },
      },
      control: {
        type: 'date',
      },
    },
    color: {
      name: 'timelines[].color',
      type: { name: 'color', required: true },
      defaultValue: '#51FF0D',
      description: 'color of a timeline block',
      table: {
        type: { summary: 'color' },
      },
      control: {
        type: 'color',
      },
    },
    startHour: {
      name: 'options.startHour',
      type: { name: 'number', required: false },
      defaultValue: 0,
      description: 'timetable start rendering from this time',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 0 },
      },
      control: {
        type: 'number',
        min: 0,
        max: 23,
        step: 1,
      },
    },
  },
}

interface TemplateArgs {
  timelines: ITimeline[]
  startAt: ITimeline['startAt']
  endAt: ITimeline['endAt']
  color: ITimeline['color']
  startHour: number
}

let timetable: Timetable
// More on component templates: https://storybook.js.org/docs/html/writing-stories/introduction#using-args
const Template: Story<TemplateArgs> = (args): HTMLElement => {
  // You can either use a function to create DOM elements or use a plain html string!
  // return `<div>${label}</div>`;
  const rootElement = document.createElement('div')
  rootElement.className = [
    'example-timetable',
    'example-timetable--medium',
    'example-timetable--primary',
  ].join(' ')

  const { timelines, startAt, endAt, color, startHour } = args
  if (timelines.length > 0) {
    timelines[0].startAt = startAt
    timelines[0].endAt = endAt
    timelines[0].color = color
  }

  timetable = new Timetable(rootElement, timelines, {
    startHour,
  })

  return rootElement
}

export const Timelines = Template.bind({})
Timelines.play = async () => {
  await sleep(10000)

  timetable.addTimelines([
    {
      id: 2,
      color: '#FF0DCA',
      startAt: '2022-08-20T12:10:00',
      endAt: '2022-08-20T12:45:00',
    },
  ])

  await sleep(2000)

  timetable.addTimelines([
    {
      id: 4,
      color: '#0AC2FF',
      startAt: '2022-08-20T12:50:00',
      endAt: '2022-08-20T13:05:00',
    },
  ])

  await sleep(2000)

  timetable.removeTimelines([2])
}

export const Empty = Template.bind({})
Empty.args = {
  timelines: [],
}
