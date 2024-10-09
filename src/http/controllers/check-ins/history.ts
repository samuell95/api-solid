import type { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'

import { makeFetchUserCheckInsHistoryUseCase } from '@/use-cases/factories/make-fecth-user-check-ins-history'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = checkInHistoryQuerySchema.parse(request.query)

  const fecthUsercheckInsUseCase = makeFetchUserCheckInsHistoryUseCase()

  const { checkIns } = await fecthUsercheckInsUseCase.execute({
    page,
    userId: request.user.sub,
  })

  return reply.status(200).send({
    checkIns,
  })
}
