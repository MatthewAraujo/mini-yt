import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { Injectable } from '@nestjs/common'
import { VideoProcessingRequestedEvent } from '@/domain/mini-yt/enterprise/events/video-processing-requested-event'
import { VideosRepository } from '@/domain/mini-yt/application/repositories/videos-repository'
import { UsersRepository } from '@/domain/mini-yt/application/repositories/users-repository'
import { ProcessVideoUseCase } from '@/domain/events/application/use-cases/process-video'

@Injectable()
export class OnVideoUploaded implements EventHandler {
	constructor(
		private readonly processVideoUseCase: ProcessVideoUseCase,
		private readonly videosRepository: VideosRepository,
		private readonly usersRepository: UsersRepository,
	) {
		this.setupSubscriptions()
	}

	setupSubscriptions(): void {
		DomainEvents.register(
			this.handleVideoProcessingRequested.bind(this),
			VideoProcessingRequestedEvent.name
		)
	}

	private async handleVideoProcessingRequested(event: VideoProcessingRequestedEvent) {
		const video = await this.videosRepository.findById(event.videoId.toString())
		const user = await this.usersRepository.findById(event.ownerId.toString())

		if (!video || !user) {
			throw new Error('Video or user not found')
		}

		await this.processVideoUseCase.execute({
			videoId: video.id.toString(),
			ownerId: user.id.toString(),
		})
	}
}

