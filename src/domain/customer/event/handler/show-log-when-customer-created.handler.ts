import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export class ShowLogWhenCustomerCreatedHandler implements EventHandlerInterface<CustomerCreatedEvent> {
  handle(_: CustomerCreatedEvent) {
    console.log("Esse é o primeiro console.log do evento: CustomerCreated.");
  }
}