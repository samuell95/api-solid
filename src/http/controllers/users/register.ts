import type { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'

import { UserAlreadyExistsError } from '../../../use-cases/erros/user-already-exists'
import { makeRegisterUseCase } from '../../../use-cases/factories/make-register-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, name, password } = registerBodySchema.parse(request.body)

  try {
    const registerUserCase = makeRegisterUseCase()

    await registerUserCase.execute({
      email,
      name,
      password,
    })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      reply.status(409).send({ message: error.message })
    }
    throw error
  }

  return reply.status(201).send()
}
