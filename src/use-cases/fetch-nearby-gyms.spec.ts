import { describe, it, expect, beforeEach } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsCase } from './fecth-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsCase(gymsRepository)
  })

  it('should be able to fecth nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near JavaScript Gym',
      description: '',
      phone: '',
      latitude: -7.8914152,
      longitude: -34.9086945,
    })

    await gymsRepository.create({
      title: 'Far TypeScript Gym',
      description: '',
      phone: '',
      latitude: -8.1984983,
      longitude: -34.9670228,
    })

    const { gyms } = await sut.execute({
      userLatitude: -7.8928108,
      userLongitude: -34.9171192,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Near JavaScript Gym' }),
    ])
  })
})
