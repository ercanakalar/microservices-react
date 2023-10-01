import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt, { Jwt } from 'jsonwebtoken';
import { BadRequestError } from '@eactickets/common/build/errors';
import { validateRequest } from '@eactickets/common/build/middlewares';

import { User } from '../models/user-model';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email in use');
    }

    const newUser = User.build({ firstName, lastName, email, password });
    await newUser.save();

    console.log(newUser, 'newUser');

    const userJwt: Jwt | string = jwt.sign(
      {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(newUser);
  }
);

export { router as signUpRouter };
