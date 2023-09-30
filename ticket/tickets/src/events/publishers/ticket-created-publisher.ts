import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from '@eactickets/common/build/events';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
