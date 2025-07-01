
import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { OnVideoUploaded } from '@/domain/events/application/subscribers/on-video-uploaded'

@Module({
	imports: [DatabaseModule],
	providers: [OnVideoUploaded],
})
export class EventsModule { }
