import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface EventProps {
	recipientId: UniqueEntityID
	title: string
	content: string
	readAt?: Date | null
	createdAt: Date
}

export class Event extends Entity<EventProps> {
	get recipientId() {
		return this.props.recipientId
	}

	get title() {
		return this.props.title
	}

	get content() {
		return this.props.content
	}

	get readAt() {
		return this.props.readAt
	}

	get createdAt() {
		return this.props.createdAt
	}

	read() {
		this.props.readAt = new Date()
	}

	static create(props: Optional<EventProps, 'createdAt'>, id?: UniqueEntityID) {
		const event = new Event(
			{
				...props,
				createdAt: props.createdAt ?? new Date(),
			},
			id,
		)

		return event
	}
}
