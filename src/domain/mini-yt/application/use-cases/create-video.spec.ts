import { CreateVideoUseCase } from '@/domain/mini-yt/application/use-cases/create-video'
import { InMemoryVideosRepository } from 'test/repositories/in-memory-video-repository'


describe('CreateVideoUseCase', () => {
  it('should create a video', async () => {
    const videosRepository = new InMemoryVideosRepository()
    const useCase = new CreateVideoUseCase(videosRepository)

    const result = await useCase.execute({
      title: 'Test Video',
      description: 'A test video',
      ownerId: 'user-1',
      attachmentId: 'UUID'
    })

    expect(result.isRight()).toBe(true)
    expect(videosRepository.items).toHaveLength(1)
    expect(videosRepository.items[0].title).toBe('Test Video')
  })
}) 