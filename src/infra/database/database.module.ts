
import { UsersRepository } from '@/domain/mini-yt/application/repositories/users-repository'
import { NotificationsRepository } from '@/domain/notification/application/repositories/notifications-repository'
import { Module } from '@nestjs/common'
import { CacheModule } from '../cache/cache.module'
import { PrismaService } from './prisma/prisma.service'

import { PrismaAttachmentsRepository } from './prisma/repositories/prisma-attachments-repository'
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repository'
import { AttachmentsRepository } from '@/domain/mini-yt/application/repositories/attachments-repository'

@Module({
	imports: [CacheModule],
	providers: [
		PrismaService,
		{
			provide: UsersRepository,
			useClass: PrismaUsersRepository,
		},
		{
			provide: AttachmentsRepository,
			useClass: PrismaAttachmentsRepository,
		},
	],
	exports: [
		PrismaService,
		UsersRepository,
		AttachmentsRepository,
		// NotificationsRepository,
	],
})
export class DatabaseModule { }
