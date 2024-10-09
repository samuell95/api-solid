import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Nearby Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to list nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Near JavaScript Gym',
        description: '',
        phone: '',
        latitude: -7.8914152,
        longitude: -34.9086945,
      })
    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Far TypeScript Gym',
        description: '',
        phone: '',
        latitude: -8.1984983,
        longitude: -34.9670228,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -7.8914152,
        longitude: -34.9086945,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
  })
})
