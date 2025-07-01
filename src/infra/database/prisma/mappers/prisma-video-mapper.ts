import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Video } from '@/domain/mini-yt/enterprise/entities/video'
import { Prisma, Video as PrismaVideo } from 'generated/prisma'

export class PrismaVideoMapper {
	static toDomain(raw: PrismaVideo): Video {
		return Video.create(
			{
				title: raw.title,
				description: raw.description,
				ownerId: raw.ownerId,
				videoUrl: raw.videoUrl,
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
		}
	}
}
