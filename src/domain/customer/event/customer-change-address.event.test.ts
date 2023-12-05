import CustomerChangeAddress from './customer-change-address.event'


describe("CustomerChangeAddress test suite", () => {
  it("Should create new CustomerChangeAddress event", () => {
    const eventValue = {
      id: "123",
      name: "John",
      address: "Street 1, 13330-250, Sao Paulo"
    }
    const customerChangeAddressEvent = new CustomerChangeAddress(eventValue)


    expect(customerChangeAddressEvent.eventData).toBeDefined()
    expect(customerChangeAddressEvent.eventData).toBe(eventValue)
  })
})