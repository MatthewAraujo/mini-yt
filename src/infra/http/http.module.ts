import { Module } from '@nestjs/common'

import { AuthenticateUserUseCase } from '@/domain/mini-yt/application/use-cases/authenticate-user'

import { RegisterUserUseCase } from '@/domain/mini-yt/application/use-cases/register-user'
import { UploadAndCreateAttachmentUseCase } from '@/domain/mini-yt/application/use-cases/upload-and-create-attachment'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { StorageModule } from '../storage/storage.module'
import { AuthenticateController } from './controllers/authenticate.controller'

import { CreateAccountController } from './controllers/create-account.controller'
import { UploadAttachmentController } from './controllers/upload-attachment.controller'
import { CreateVideoController } from './controllers/create-video.controller'
import { CreateVideoUseCase } from '@/domain/mini-yt/application/use-cases/create-video'

@Module({
	imports: [DatabaseModule, CryptographyModule, StorageModule],
	controllers: [
		CreateAccountController,
		AuthenticateController,

		UploadAttachmentController,
		CreateVideoController,
	],
	providers: [

		RegisterUserUseCase,
		AuthenticateUserUseCase,
		UploadAndCreateAttachmentUseCase,
		CreateVideoUseCase,
	],
})
export class HttpModule { }
