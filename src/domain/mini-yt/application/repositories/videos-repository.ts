import { Video } from '../../enterprise/entities/video'

export abstract class VideosRepository {
  abstract create(video: Video): Promise<void>
} 