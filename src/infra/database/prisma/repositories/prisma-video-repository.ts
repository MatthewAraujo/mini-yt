import { VideosRepository } from '@/domain/mini-yt/application/repositories/videos-repository'
import { Video } from '@/domain/mini-yt/enterprise/entities/video'
import { Injectable } from '@nestjs/common'
import { PrismaVideoMapper } from '../mappers/prisma-video-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaVideosRepository implements VideosRepository {
  constructor(private prisma: PrismaService) { }

  async create(video: Video): Promise<void> {
    const data = PrismaVideoMapper.toPrisma(video)

    await this.prisma.video.create({
      data,
    })
  }
}
