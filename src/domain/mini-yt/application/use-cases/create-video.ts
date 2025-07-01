import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Video } from '../../enterprise/entities/video'
import { VideosRepository } from '../repositories/videos-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface CreateVideoUseCaseRequest {
	title: string
	description: string
	ownerId: string
	attachmentId: string
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
		attachmentId
	}: CreateVideoUseCaseRequest): Promise<CreateVideoUseCaseResponse> {
		const video = Video.create({
			title,
			description,
			ownerId: ownerId ?? '',
			attachmentId: new UniqueEntityID(attachmentId)
		})

		await this.videosRepository.create(video)

		return right({
			video,
		})
	}
}
