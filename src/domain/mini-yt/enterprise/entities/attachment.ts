import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface AttachmentProps {
	title: string
	url: string
	createdAt: Date
}

export class Attachment extends Entity<AttachmentProps> {
	get title() {
		return this.props.title
	}

	get url() {
		return this.props.url
	}
	get createdAt() {
		return this.props.createdAt
	}

	static create(props: Optional<AttachmentProps, 'createdAt'>, id?: UniqueEntityID) {
		const attachment = new Attachment(
			{
				...props,
				createdAt: props.createdAt ?? new Date(),
			},
			id,
		)
		return attachment
	}
}
