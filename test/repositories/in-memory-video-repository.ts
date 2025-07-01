import { VideosRepository } from '@/domain/mini-yt/application/repositories/videos-repository'
import { Video } from '@/domain/mini-yt/enterprise/entities/video'

export class InMemoryVideosRepository implements VideosRepository {
	public items: Video[] = []

	async findById(id: string) {
		const video = this.items.find((item) => item.id.toString() === id)

		if (!video) {
			return null
		}

		return video
	}
	async create(video: Video) {
		this.items.push(video)
	}
}
