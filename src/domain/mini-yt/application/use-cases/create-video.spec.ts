import { CreateVideoUseCase } from '@/domain/mini-yt/application/use-cases/create-video'
import { Video } from '@/domain/mini-yt/enterprise/entities/video'

class InMemoryVideosRepository {
  public items: Video[] = []
  async create(video: Video) {
    this.items.push(video)
  }
}

describe('CreateVideoUseCase', () => {
  it('should create a video', async () => {
    const videosRepository = new InMemoryVideosRepository()
    const useCase = new CreateVideoUseCase(videosRepository)

    const result = await useCase.execute({
      title: 'Test Video',
      description: 'A test video',
      ownerId: 'user-1',
      videoUrl: 'http://example.com/video.mp4',
    })

    expect(result.isRight()).toBe(true)
    expect(videosRepository.items).toHaveLength(1)
    expect(videosRepository.items[0].title).toBe('Test Video')
  })
}) 