

type Events = {
  add: string;
  delete: string;
  move: string;
}

const userActions: On<Events> = {
  onAdd: () => {},
  onDelete: () => {},
  onMove: () => {}
}

type On<T extends object> = {
  [Key in keyof T as Key extends string ?
    `on${Capitalize<Key>}` : never]: () => any
}
