import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import {
	BadRequestException,
	Body,
	Controller,
	Logger,
	LoggerService,
	Post,
} from '@nestjs/common'
import { z } from 'zod'

const createQuestionBodySchema = z.object({
	title: z.string(),
	content: z.string(),
	attachments: z.array(z.string().uuid()),
})

const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema)
type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>

@Controller('/questions')
export class CreateQuestionController {
	private readonly logger: LoggerService

	constructor(
		private readonly createQuestion: CreateQuestionUseCase,
	) {
		this.logger = new Logger(CreateQuestionController.name)
	}

	@Post()
	async handle(
		@Body(bodyValidationPipe) body: CreateQuestionBodySchema,
		@CurrentUser() user: UserPayload,
	) {
		const { title, content, attachments } = body
		const userId = user.sub

		this.logger.log(`User ${userId} is creating a question: "${title}"`)

		const result = await this.createQuestion.execute({
			title,
			content,
			authorId: userId,
			attachmentsIds: attachments,
		})

		if (result.isLeft()) {
			this.logger.warn(`Failed to create question for user ${userId}`)
			throw new BadRequestException()
		}

		this.logger.log(`Question created successfully for user ${userId}`)
	}
}

