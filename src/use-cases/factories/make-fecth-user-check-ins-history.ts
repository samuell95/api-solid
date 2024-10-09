import { FecthUserCheckInsHistoryUseCase } from '../fecth-user-check-ins-history'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeFetchUserCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new FecthUserCheckInsHistoryUseCase(checkInsRepository)

  return useCase
}
