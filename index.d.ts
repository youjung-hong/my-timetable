declare class TaskItem {
  id: number
  private _startAt: Date
  private _endAt: Date
  startAt: Date
  endAt: Date
  duration: number
  calculateDuration(): void
  static clone(item: { id: number; startAt: Date; endAt: Date }): TaskItem
}

declare class TaskItemList {
  items: TaskItem[]
  add(item: TaskItem): void
  remove(removeId: number): void
  update(updateItem: TaskItem): void
}

declare class Timetable {
  rootElement: HTMLElement
  list: TaskItemList
  insert(item: TaskItem): void
  update(item: TaskItem): void
  delete(item: TaskItem): void
  eraseItem(itemId: number): void
  drawItem(item: TaskItem): void
  drawItems(items: TaskItem[]): void
}

declare module 'one-timetable' {
  export const Timetable
  export default Timetable
}

export { Timetable, TaskItemList, TaskItem }

export default Timetable