import { EventsRepository } from '@/domain/events/application/repositories/events-repository'
import { Event } from '@/domain/events/enterprise/entities/event'

export class InMemoryEventsRepository implements EventsRepository {
	public items: Event[] = []

	async findById(id: string) {
		const event = this.items.find((item) => item.id.toString() === id)

		if (!event) {
			return null
		}

		return event
	}

	async create(event: Event) {
		this.items.push(event)
	}

	async save(event: Event) {
		const itemIndex = this.items.findIndex((item) => item.id === event.id)

		this.items[itemIndex] = event
	}
}
