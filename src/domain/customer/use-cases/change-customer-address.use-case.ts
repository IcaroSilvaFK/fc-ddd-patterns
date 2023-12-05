import EventDispatcherInterface from "../../@shared/event/event-dispatcher.interface";
import Customer from "../entity/customer";
import CustomerChangeAddressEvent from "../event/customer-change-address.event";
import Address from "../value-object/address";

export class ChangeCustomerAddressUserCase {
  constructor(
    private readonly eventDispatcher: EventDispatcherInterface
  ) { }

  async execute(customer: Customer, address: Address): Promise<void> {

    customer.changeAddress(address)

    this.eventDispatcher.notify(new CustomerChangeAddressEvent({
      id: customer.id,
      name: customer.name,
      address: customer.Address.toString()
    }))
  }
}