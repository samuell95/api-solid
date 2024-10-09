import type { Gym } from '@prisma/client'
import type { GymsRepository } from '@/repositories/gym-repository'

interface SearchGymsUserCaseRequest {
  query: string
  page: number
}

interface SearchGymsUserCaseResponse {
  gyms: Gym[]
}

export class SearchGymsUserCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    page,
    query,
  }: SearchGymsUserCaseRequest): Promise<SearchGymsUserCaseResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page)

    return { gyms }
  }
}
