import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export class ShowSecondLogWhenCustomerCreatedHandler implements EventHandlerInterface<CustomerCreatedEvent> {
  handle(_: CustomerCreatedEvent) {
    console.log("Esse é o segundo console.log do evento: CustomerCreated");
  }
}