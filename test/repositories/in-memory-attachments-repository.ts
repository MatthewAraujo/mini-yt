import { AttachmentsRepository } from '@/domain/mini-yt/application/repositories/attachments-repository'
import { Attachment } from '@/domain/mini-yt/enterprise/entities/attachment'

export class InMemoryAttachmentsRepository implements AttachmentsRepository {
	public items: Attachment[] = []

	async create(attachment: Attachment) {
		this.items.push(attachment)
	}
}
