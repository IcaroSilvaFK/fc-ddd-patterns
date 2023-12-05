import CustomerCreatedEvent from "./customer-created.event";

describe("CustomerCreatedEvent test suite", () => {
  it("Should create new CustomerCreated event", () => {
    const eventValue = "test"
    const customerCreatedEvent = new CustomerCreatedEvent(eventValue)

    expect(customerCreatedEvent.eventData).toBeDefined()
    expect(customerCreatedEvent.eventData).toBe(eventValue)
  })
})