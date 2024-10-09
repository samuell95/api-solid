import type { Gym } from '@prisma/client'
import type { GymsRepository } from '@/repositories/gym-repository'

interface CreateGymUserCaseRequest {
  title: string
  description: string | null
  phone: string | null
  longitude: number
  latitude: number
}

interface CreateGymUserCaseResponse {
  gym: Gym
}

export class CreateGymUserCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    description,
    latitude,
    longitude,
    phone,
    title,
  }: CreateGymUserCaseRequest): Promise<CreateGymUserCaseResponse> {
    const gym = await this.gymsRepository.create({
      latitude,
      longitude,
      title,
      description,
      phone,
    })

    return { gym }
  }
}
