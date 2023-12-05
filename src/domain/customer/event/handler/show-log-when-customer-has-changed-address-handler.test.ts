import EventDispatcher from "../../../@shared/event/event-dispatcher";
import CustomerChangeAddressEvent from "../customer-change-address.event";
import { ShowLogWhenCustomerHasChangedAddressHandler } from './show-log-when-customer-has-changed-address.handler';

describe("ShowLogWhenCustomerHasChangedAddressHandler test suite", () => {
  it("Should dispatch event when customer is created", () => {
    const eventDispatcher = new EventDispatcher()
    const handler = new ShowLogWhenCustomerHasChangedAddressHandler()
    const eventValue = {
      id: "123",
      name: "John",
      address: "Street 1, 13330-250, Sao Paulo"
    }
    const mockHandlerFunc = jest.spyOn(handler, "handle")

    eventDispatcher.register(CustomerChangeAddressEvent.name, handler)

    eventDispatcher.notify(new CustomerChangeAddressEvent(eventValue))

    expect(mockHandlerFunc).toBeCalled()
    expect(mockHandlerFunc).toBeCalledTimes(1)

  })
})