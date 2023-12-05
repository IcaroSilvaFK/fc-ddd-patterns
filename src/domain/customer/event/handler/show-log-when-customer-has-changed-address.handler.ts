import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerChangeAddressEvent from "../customer-change-address.event";

export class ShowLogWhenCustomerHasChangedAddressHandler implements EventHandlerInterface<CustomerChangeAddressEvent> {
  handle(data: CustomerChangeAddressEvent) {
    const eventData = data.eventData
    console.log(`Endereço do cliente: ${eventData.id}, ${eventData.name} alterado para: ${eventData.address}`);
  }
}