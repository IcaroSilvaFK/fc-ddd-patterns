import crypto from 'crypto';

import EventDispatcherInterface from '../../@shared/event/event-dispatcher.interface';
import Customer from "../entity/customer";
import CustomerCreatedEvent from '../event/customer-created.event';

export class CreateCustomerUseCase {

  constructor(private readonly eventHandler: EventDispatcherInterface) { }

  async execute(name: string): Promise<Customer> {
    const userId = crypto.randomBytes(16).toString('hex')

    const userCreated = new Customer(userId, name)

    this.eventHandler.notify(new CustomerCreatedEvent(userCreated))

    return userCreated
  }
}