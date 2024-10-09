import type { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'

import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-check-in'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateChekcInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = validateChekcInParamsSchema.parse(request.params)

  const validateCheckInsUseCase = makeValidateCheckInUseCase()

  await validateCheckInsUseCase.execute({
    checkInId,
  })

  return reply.status(204).send()
}
