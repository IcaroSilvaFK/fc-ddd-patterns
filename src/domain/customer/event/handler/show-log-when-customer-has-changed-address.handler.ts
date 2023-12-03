import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerChangeAddressEvent from "../customer-change-address.event";

export class ShowLogWhenCustomerHasChangedAddressHandler implements EventHandlerInterface<CustomerChangeAddressEvent> {
  handle(_: CustomerChangeAddressEvent) {
    console.log(`Endereço do cliente: {id}, {nome} alterado para: {endereco}`);
  }
}