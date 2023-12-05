import { ShowSecondLogWhenCustomerCreatedHandler } from './show-second-log-when-customer-created.handler'

import EventDispatcher from '../../../@shared/event/event-dispatcher'
import CustomerCreatedEvent from '../customer-created.event'

describe("ShowLogWhenCustomerCreateHandler test suite", () => {
  it("Should dispatch event when customer is created", () => {

    const eventDispatcher = new EventDispatcher()
    const handler = new ShowSecondLogWhenCustomerCreatedHandler()
    const eventValue = "test"
    const mockHandlerFunc = jest.spyOn(handler, "handle")

    eventDispatcher.register(CustomerCreatedEvent.name, handler)
    const customerCreatedEvent = new CustomerCreatedEvent(eventValue)

    eventDispatcher.notify(customerCreatedEvent)


    expect(mockHandlerFunc).toBeCalled()
    expect(mockHandlerFunc).toBeCalledTimes(1)
  })
})