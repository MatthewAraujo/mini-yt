import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface EventProps {
  type: string
  createdAt: Date
}

export class Event extends Entity<EventProps> {
  get type() {
    return this.props.type
  }
  get createdAt() {
    return this.props.createdAt
  }
  static create(props: EventProps, id?: UniqueEntityID) {
    return new Event(props, id)
  }
} 