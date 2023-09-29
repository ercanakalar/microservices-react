import express, { Request, Response } from 'express';
import { NotFoundError } from '@eactickets/common/build/errors';

import { Ticket } from '../models/ticket-modal';

const router = express.Router();

router.get('/api/tickets/:id', async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    throw new NotFoundError();
  }

  res.send(ticket);
});

export { router as getTicketRouter };
