import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { EventsRepository } from '@/domain/events/application/repositories/events-repository'
import { PrismaEventMapper } from '../mappers/prisma-event.mapper'
import { Event as DomainEvent } from '@/domain/events/enterprise/entities/event'

@Injectable()
export class PrismaEventsRepository implements EventsRepository {
  constructor(private prisma: PrismaService) { }

  async findById(id: string): Promise<DomainEvent | null> {
    const event = await this.prisma.event.findUnique({
      where: {
        id,
      },
    })

    if (!event) {
      return null
    }

    return PrismaEventMapper.toDomain(event)
  }

  async create(event: DomainEvent): Promise<void> {
    const data = PrismaEventMapper.toPrisma(event)

    await this.prisma.event.create({
      data,
    })
  }

  async save(event: DomainEvent): Promise<void> {
    const data = PrismaEventMapper.toPrisma(event)

    await this.prisma.event.update({
      where: {
        id: event.id.toString(),
      },
      data,
    })
  }
}
