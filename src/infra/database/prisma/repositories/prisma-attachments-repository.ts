import { AttachmentsRepository } from '@/domain/mini-yt/application/repositories/attachments-repository'
import { Attachment } from '@/domain/mini-yt/enterprise/entities/attachment'
import { Injectable } from '@nestjs/common'
import { PrismaAttachmentMapper } from '../mappers/prisma-attachment-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaAttachmentsRepository implements AttachmentsRepository {
	constructor(private prisma: PrismaService) { }

	async create(attachment: Attachment): Promise<void> {
		const data = PrismaAttachmentMapper.toPrisma(attachment)

		await this.prisma.attachment.create({
			data,
		})
	}
}
