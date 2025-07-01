import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Video } from '../../enterprise/entities/video'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { VideosRepository } from '../repositories/videos-repository'

interface CreateVideoUseCaseRequest {
	title: string
	description: string
	ownerId: string
	videoUrl?: string | null
}

type CreateVideoUseCaseResponse = Either<
	Error,
	{
		video: Video
	}
>

@Injectable()
export class CreateVideoUseCase {
	constructor(private videosRepository: VideosRepository) { }

	async execute({
		title,
		description,
		ownerId,
		videoUrl = null,
	}: CreateVideoUseCaseRequest): Promise<CreateVideoUseCaseResponse> {
		const video = Video.create({
			title,
			description,
			ownerId: ownerId ?? '',
			videoUrl: videoUrl ?? null,
		})

		await this.videosRepository.create(video)

		return right({
			video,
		})
	}
}
