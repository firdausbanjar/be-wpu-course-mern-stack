import { Request, Response } from 'express';
import * as Yup from 'yup';

type TRegister = {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const registerValidateSchema = Yup.object({
  fullName: Yup.string().required(),
  username: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().required(),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref('password')], 'Password not match'),
});

export default {
  async register(req: Request, res: Response) {
    const { fullName, username, email, password, confirmPassword } =
      req.body as unknown as TRegister;

    try {
      await registerValidateSchema.validate(
        {
          fullName,
          username,
          email,
          password,
          confirmPassword,
        },
        { abortEarly: false }
      );

      res.status(200).json({
        message: 'Success registration',
        data: { fullName, username, email },
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        return res.status(400).json({
          message: 'Validation failed',
          errors: err.errors,
        });
      }

      return res.status(500).json({
        message: 'Internal server error',
        errors: null,
      });
    }
  },
};
