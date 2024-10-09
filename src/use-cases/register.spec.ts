import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repositoty'
import { describe, it, expect, beforeEach } from 'vitest'
import { RegisterUserCase } from './register'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from './erros/user-already-exists'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUserCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUserCase(usersRepository)
  })
  it('should be able to register', async () => {
    const { user } = await sut.execute({
      email: 'sam@email.com',
      name: 'samuel',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      email: 'sam@email.com',
      name: 'samuel',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'sam@email.com'

    await sut.execute({
      email,
      name: 'samuel',
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        email,
        name: 'samuel',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
