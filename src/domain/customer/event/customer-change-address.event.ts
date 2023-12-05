import EventInterface from "../../@shared/event/event.interface";


type EventPayload = {
  id: string;
  name: string;
  address: string;
}
export default class CustomerChangeAddressEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: EventPayload

  constructor(eventData: EventPayload) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}