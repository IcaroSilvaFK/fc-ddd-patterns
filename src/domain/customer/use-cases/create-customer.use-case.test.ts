import EventDispatcher from "../../@shared/event/event-dispatcher"
import CustomerCreatedEvent from "../event/customer-created.event"
import { ShowLogWhenCustomerCreatedHandler } from "../event/handler/show-log-when-customer-created.handler"
import { ShowSecondLogWhenCustomerCreatedHandler } from "../event/handler/show-second-log-when-customer-created.handler"
import { CreateCustomerUseCase } from "./create-customer.use-case"

describe("CreateCustomerUseCase test suite", () => {

  it("Should create new User and notify listeners", async () => {

    const eventDispatcher = new EventDispatcher()
    const sendLogWhenCustomerCreatedHandler = new ShowLogWhenCustomerCreatedHandler()
    const sendSecondLogWhenCustomerCreatedHandler = new ShowSecondLogWhenCustomerCreatedHandler()

    eventDispatcher.register(CustomerCreatedEvent.name, sendLogWhenCustomerCreatedHandler)
    eventDispatcher.register(CustomerCreatedEvent.name, sendSecondLogWhenCustomerCreatedHandler)

    const createCustomerUseCase = new CreateCustomerUseCase(eventDispatcher)
    const mockFirstEventHandler = jest.spyOn(sendLogWhenCustomerCreatedHandler, "handle")
    const mockSecondEventHandler = jest.spyOn(sendLogWhenCustomerCreatedHandler, "handle")
    expect(createCustomerUseCase).toBeDefined()

    const customer = await createCustomerUseCase.execute("John")




    expect(mockFirstEventHandler).toHaveBeenCalled()
    expect(mockSecondEventHandler).toHaveBeenCalled()
    expect(mockFirstEventHandler).toHaveBeenCalledTimes(1)
    expect(mockSecondEventHandler).toHaveBeenCalledTimes(1)
    expect(customer.id).toBeDefined()
    expect(customer.name).toBe("John")
  })

})