import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'

export interface ProcessVideoUseCaseRequest {
  videoId: string
  ownerId: string
}

export type ProcessVideoUseCaseResponse = Either<
  null,
  {
    status: 'processing' | 'completed' | 'failed'
    videoId: string
  }
>

@Injectable()
export class ProcessVideoUseCase {
  async execute({
    videoId,
    ownerId,
  }: ProcessVideoUseCaseRequest): Promise<ProcessVideoUseCaseResponse> {
    return right({
      status: 'processing',
      videoId,
    })
  }
}

