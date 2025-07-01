import { Event } from '../../enterprise/entities/event'

export abstract class EventsRepository {
	abstract findById(id: string): Promise<Event | null>
	abstract create(event: Event): Promise<void>
	abstract save(event: Event): Promise<void>
}
