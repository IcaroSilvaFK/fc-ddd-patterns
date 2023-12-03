import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";

const produceCreatedEvent = "ProductCreatedEvent"

describe("Domain events tests", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register(produceCreatedEvent, eventHandler);

    expect(
      eventDispatcher.getEventHandlers[produceCreatedEvent]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers[produceCreatedEvent].length).toBe(
      1
    );
    expect(
      eventDispatcher.getEventHandlers[produceCreatedEvent][0]
    ).toMatchObject(eventHandler);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register(produceCreatedEvent, eventHandler);

    expect(
      eventDispatcher.getEventHandlers[produceCreatedEvent][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister(produceCreatedEvent, eventHandler);

    expect(
      eventDispatcher.getEventHandlers[produceCreatedEvent]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers[produceCreatedEvent].length).toBe(
      0
    );
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register(produceCreatedEvent, eventHandler);

    expect(
      eventDispatcher.getEventHandlers[produceCreatedEvent][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers[produceCreatedEvent]
    ).toBeUndefined();
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register(produceCreatedEvent, eventHandler);

    expect(
      eventDispatcher.getEventHandlers[produceCreatedEvent][0]
    ).toMatchObject(eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 1",
      description: "Product 1 description",
      price: 10.0,
    });

    // Quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
