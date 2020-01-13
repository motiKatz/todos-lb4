import { Entity, model, property } from '@loopback/repository';

@model({
  settings: {
    strict: false,
    mysql: {
      table: 'todos'
    }
  }

})
export class TodosModel extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    default: null,
  })
  title: string;

  @property({
    type: 'string',
    required: true,
    default: null,
  })
  body: string;

  @property({
    type: 'string',
    required: true,
  })
  created: string;

  @property({
    type: 'boolean',
    required: true,
    default: false,
  })
  completed: boolean;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<TodosModel>) {
    super(data);
  }
}

export interface TodosModelRelations {
  // describe navigational properties here
}

export type TodosModelWithRelations = TodosModel & TodosModelRelations;
