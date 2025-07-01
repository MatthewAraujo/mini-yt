import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Event } from '@/domain/events/enterprise/entities/event'
import { Prisma, Event as PrismaEvent, TYPE } from 'generated/prisma'

export class PrismaEventMapper {
  static toDomain(raw: PrismaEvent): Event {
    return Event.create(
      {
        type: raw.type,
        createdAt: raw.createdAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(event: Event): Prisma.EventUncheckedCreateInput {
    return {
      id: event.id.toString(),
      type: event.type as TYPE,
      createdAt: event.createdAt,
    }
  }
}

