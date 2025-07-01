import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface VideoProps {
  title: string
  description: string
  ownerId: string
  videoUrl: string | null
}

export class Video extends Entity<VideoProps> {
  get title() {
    return this.props.title
  }

  get description() {
    return this.props.description
  }

  get ownerId() {
    return this.props.ownerId
  }

  get videoUrl() {
    return this.props.videoUrl
  }

  static create(props: VideoProps, id?: UniqueEntityID) {
    const video = new Video(props, id)
    return video
  }
} 