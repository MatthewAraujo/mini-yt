import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface VideoProps {
  title: string
  description: string
  ownerId: string
  videoUrl: string | null
  createdAt: Date
  updatedAt: Date
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

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(
    props: Optional<VideoProps, 'videoUrl' | 'createdAt' | 'updatedAt'>,
    id?: UniqueEntityID
  ) {
    const video = new Video(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
        videoUrl: props.videoUrl ?? ""
      },
      id)

    return video
  }
} 