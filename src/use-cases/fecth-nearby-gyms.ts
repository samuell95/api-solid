import type { Gym } from '@prisma/client'
import type { GymsRepository } from '@/repositories/gym-repository'

interface FetchNearbyGymsCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyGymsCaseResponse {
  gyms: Gym[]
}

export class FetchNearbyGymsCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymsCaseRequest): Promise<FetchNearbyGymsCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return { gyms }
  }
}
