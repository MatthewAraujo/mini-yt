import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Video } from '@/domain/mini-yt/enterprise/entities/video'
import { Prisma, Video as PrismaVideo, Attachment as PrismaAttachment } from 'generated/prisma'

type PrismaVideoDetails = PrismaVideo & {
	attachment: PrismaAttachment | null
}


export class PrismaVideoMapper {
	static toDomain(raw: PrismaVideoDetails): Video {
		return Video.create(
			{
				title: raw.title,
				description: raw.description,
				ownerId: raw.ownerId,
				videoUrl: raw.videoUrl,
				attachmentId: raw.attachment ? new UniqueEntityID(raw.attachment.id) : undefined
			},
			new UniqueEntityID(raw.id),
		)
	}


	static toPrisma(video: Video): Prisma.VideoUncheckedCreateInput {
		return {
			id: video.id.toString(),
			title: video.title,
			description: video.description,
			ownerId: video.ownerId,
			videoUrl: video.videoUrl ?? "",
			attachmentId: video.attachmentId?.toString() ?? ""
		}
	}
}
