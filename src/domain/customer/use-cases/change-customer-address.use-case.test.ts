import EventDispatcher from "../../@shared/event/event-dispatcher"
import Customer from "../entity/customer"
import CustomerChangeAddressEvent from "../event/customer-change-address.event"
import { ShowLogWhenCustomerHasChangedAddressHandler } from "../event/handler/show-log-when-customer-has-changed-address.handler"
import Address from "../value-object/address"
import { ChangeCustomerAddressUserCase } from "./change-customer-address.use-case"

describe("ChangeCustomerAddressUserCase test suite", () => {
  it("Should change customer address and notify listeners", () => {

    const eventDispatcher = new EventDispatcher()
    const eventHandler = new ShowLogWhenCustomerHasChangedAddressHandler()

    eventDispatcher.register(CustomerChangeAddressEvent.name, eventHandler)

    const changeCustomerAddressUseCase = new ChangeCustomerAddressUserCase(eventDispatcher)
    const mockHandler = jest.spyOn(eventHandler, "handle")


    const customer = new Customer("123", "John")

    expect(() => {
      changeCustomerAddressUseCase.execute(customer, new Address("Street", 1, "13330-250", "São Paulo"))
    }).not.toThrow()
    expect(mockHandler).toHaveBeenCalled()
    expect(mockHandler).toHaveBeenCalledTimes(1)
  })
})