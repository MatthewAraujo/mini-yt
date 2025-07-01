import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { UserFactory } from 'test/factories/make-user'

describe('Create Video (E2E)', () => {
  let app: INestApplication
  let userFactory: UserFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    userFactory = moduleRef.get(UserFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it('[POST] /videos should create a video', async () => {
    const video = await userFactory.makePrismaUser()

    const accessToken = jwt.sign({ sub: video.id.toString() })


    const response = await request(app.getHttpServer())
      .post('/videos')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'Sample Video',
        description: 'A test video',
        ownerId: video.id.toString(),
        videoUrl: 'http://example.com/video.mp4',
      })

    expect(response.statusCode).toBe(201)
    expect(response.body).toHaveProperty('videoId')
    expect(typeof response.body.videoId).toBe('string')
  })
}) 