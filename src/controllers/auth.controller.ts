import { Request, Response } from 'express';
import * as Yup from 'yup';
import UserModel from '../models/user.model';
import { encrypt } from '../utils/encryption';
import { generateToken } from '../utils/jwt';

type TRegister = {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type TLogin = {
  identifier: string;
  password: string;
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
    try {
      const { fullName, username, email, password, confirmPassword } =
        req.body as unknown as TRegister;

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

      const result = await UserModel.create({
        fullName,
        username,
        email,
        password,
      });

      return res.status(200).json({
        message: 'Success registration',
        data: result,
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        return res.status(400).json({
          message: 'Validation failed',
          errors: err.errors,
        });
      }

      if (err instanceof Error) {
        return res.status(400).json({
          message: err.message,
          data: null,
        });
      }

      return res.status(500).json({
        message: 'Internal server error',
        errors: null,
      });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { identifier, password } = req.body as unknown as TLogin;

      const userByIdentifier = await UserModel.findOne({
        $or: [{ email: identifier }, { username: identifier }],
      });

      if (!userByIdentifier) {
        return res.status(403).json({
          message: 'User not found. Please check your email or username',
          data: null,
        });
      }

      const validatePassword: boolean =
        encrypt(password) === userByIdentifier.password;

      if (!validatePassword) {
        return res.status(403).json({
          message: 'Wrong password',
          data: null,
        });
      }

      const token = generateToken({
        id: userByIdentifier._id,
        role: userByIdentifier.role,
      });

      return res.status(200).json({
        message: 'Login success',
        token: token,
      });
    } catch (error) {
      const err = error as unknown as Error;
      return res.status(400).json({
        message: err.message,
        data: null,
      });
    }
  },

  async me(req: Request, res: Response) {
    // req.user
  },
};
