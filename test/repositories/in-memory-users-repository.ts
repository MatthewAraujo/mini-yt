import { DomainEvents } from '@/core/events/domain-events'
import { UsersRepository } from '@/domain/mini-yt/application/repositories/users-repository'
import { User } from '@/domain/mini-yt/enterprise/entities/user'

export class InMemoryUsersRepository implements UsersRepository {
	public items: User[] = []

	async findById(id: string) {
		const user = this.items.find((item) => item.id.toString() === id)

		if (!user) {
			return null
		}

		return user
	}
	async findByEmail(email: string) {
		const user = this.items.find((item) => item.email === email)

		if (!user) {
			return null
		}

		return user
	}

	async create(user: User) {
		this.items.push(user)

		DomainEvents.dispatchEventsForAggregate(user.id)
	}
}
