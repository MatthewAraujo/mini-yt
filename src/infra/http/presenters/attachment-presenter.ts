import { Attachment } from '@/domain/mini-yt/enterprise/entities/attachment'

export class AttachmentPresenter {
	static toHTTP(attachment: Attachment) {
		return {
			id: attachment.id.toString(),
			title: attachment.title,
			url: attachment.url,
		}
	}
}
