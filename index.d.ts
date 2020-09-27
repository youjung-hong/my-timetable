declare class TaskItem {
  constructor(startAt?: Date, endAt?: Date, meta?: any)
  id: number
  private _startAt: Date
  private _endAt: Date
  startAt: Date
  endAt: Date
  duration: number
  meta: any
  calculateDuration(): void
  static clone(item: {
    id: number
    startAt: Date | null
    endAt: Date | null
    meta: any
  }): TaskItem
}

declare class TaskItemList {
  constructor(items?: TaskItem[])
  items: TaskItem[]
  add(item: TaskItem): void
  remove(removeId: number): void
  update(updateItem: TaskItem): void
}

declare class Timetable {
  constructor(
    id: string,
    items?: TaskItem[],
    onClickTimeLogBar?: (data?: any) => void
  )
  rootElement: HTMLElement
  list: TaskItemList
  onClickTimeLogBar: (data: any) => void
  eventHanderMap: Map<HTMLDivElement, Function>
  insert(item: TaskItem): void
  update(item: TaskItem): void
  delete(item: TaskItem): void
  eraseItem(itemId: number): void
  drawItem(item: TaskItem): void
  drawItems(items: TaskItem[]): void
}

declare module 'my-timetable' {
  export const Timetable
  export default Timetable
}

export { Timetable, TaskItemList, TaskItem }

export default Timetable
