import { BadRequestException, Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { CreateVideoUseCase } from '@/domain/mini-yt/application/use-cases/create-video'

const createVideoBodySchema = z.object({
  title: z.string(),
  description: z.string(),
  ownerId: z.string(),
  videoUrl: z.string().nullable().optional(),
  attachmentId: z.string().uuid(),
})

type CreateVideoBodySchema = z.infer<typeof createVideoBodySchema>

@Controller('/videos')
export class CreateVideoController {
  constructor(private createVideo: CreateVideoUseCase) { }

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createVideoBodySchema))
  async handle(@Body() body: CreateVideoBodySchema) {
    const { title, description, ownerId, videoUrl, attachmentId } = body

    const result = await this.createVideo.execute({
      title,
      description,
      ownerId,
      attachmentId
    })

    if (result.isLeft()) {
      const error = result.value
      throw new BadRequestException(error.message)
    }

    return {
      videoId: result.value.video.id.toString(),
    }
  }
}
