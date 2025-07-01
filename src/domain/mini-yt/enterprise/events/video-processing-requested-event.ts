import { DomainEvent } from '@/core/events/domain-event'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export class VideoProcessingRequestedEvent implements DomainEvent {
  ocurredAt: Date

  constructor(
    public readonly videoId: UniqueEntityID,
    public readonly ownerId: UniqueEntityID,
    public readonly requestedAt: Date = new Date(),
  ) {
    this.ocurredAt = requestedAt
  }

  getAggregateId(): UniqueEntityID {
    return this.videoId
  }
} 