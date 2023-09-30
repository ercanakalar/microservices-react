import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from '@eactickets/common/build/events';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
