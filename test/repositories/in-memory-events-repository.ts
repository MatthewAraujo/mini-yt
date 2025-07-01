import { EventsRepository } from '@/domain/events/application/repositories/events-repository'
import { Event as DomainEvent } from '@/domain/events/enterprise/entities/event'

export class InMemoryEventsRepository implements EventsRepository {
	public items: DomainEvent[] = []

	async findById(id: string): Promise<DomainEvent | null> {
		const event = this.items.find((item) => item.id.toString() === id)

		if (!event) {
			return null
		}

		return event
	}

	async create(event: DomainEvent): Promise<void> {
		this.items.push(event)
	}

	async save(event: DomainEvent): Promise<void> {
		const itemIndex = this.items.findIndex((item) => item.id === event.id)

		this.items[itemIndex] = event
	}
}
