import { Module } from '@nestjs/common'

import { AuthenticateUserUseCase } from '@/domain/forum/application/use-cases/authenticate-user'

import { RegisterUserUseCase } from '@/domain/forum/application/use-cases/register-user'
import { UploadAndCreateAttachmentUseCase } from '@/domain/forum/application/use-cases/upload-and-create-attachment'
import { ReadNotificationUseCase } from '@/domain/notification/application/use-cases/read-notification'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { StorageModule } from '../storage/storage.module'
import { AuthenticateController } from './controllers/authenticate.controller'

import { CreateAccountController } from './controllers/create-account.controller'
import { UploadAttachmentController } from './controllers/upload-attachment.controller'

@Module({
	imports: [DatabaseModule, CryptographyModule, StorageModule],
	controllers: [
		CreateAccountController,
		AuthenticateController,

		UploadAttachmentController,
	],
	providers: [

		RegisterUserUseCase,
		AuthenticateUserUseCase,
		UploadAndCreateAttachmentUseCase,
		ReadNotificationUseCase,
	],
})
export class HttpModule { }
