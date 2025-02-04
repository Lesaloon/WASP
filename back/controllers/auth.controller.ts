import { NextFunction, Request, RequestHandler, Response } from 'express';
import { User } from '../models/user/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { generateTokenFromUser } from '../middleware/jwt.middleware';
dotenv.config();


export class AuthController {
	static login: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const { email, password } = req.body;

		try {
			const user = await User.findOne({
				where: {
					email,
				},
			});
			if (!user) {
				let error = new Error("Invalid credentials");
				next(error);
				return;
			}

			const isMatch = await bcrypt.compare(password, user.get().password);
			if (!isMatch) {
				let error = new Error("Invalid credentials");
				next(error);
				return;
			}

			const token = generateTokenFromUser(user.dataValues);
			const userWithoutPassword = user.dataValues as any;
			userWithoutPassword.password = undefined;
			res.json({ token, user: userWithoutPassword});
		} catch (error) {
			next(error);
		}
	};

	static register: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
		console.log("register");
		const { email, password, firstName, lastName } = req.body;
		// check if the user already exists
		const user = await User.findOne({
			where: {
				email,
			},
		});
		if (user) {
			next(new Error("User already exists"));
			return;
		}
		// create

		try {
			const newUser = new User({ email, password, firstName, lastName, role: "user" });
			console.log(newUser);
			await newUser.save();
			const userWithoutPassword = newUser.dataValues as any;
			userWithoutPassword.password = undefined;
			const token = generateTokenFromUser(newUser.dataValues);
			res.status(201).json({ token, user: userWithoutPassword });
		} catch (error) {
			next(error);
		}
	};

	static refresh: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
		const token = req.body.token;

		if (!token) {
			res.status(401).json({ message: 'No token, authorization denied' });
			return;
		}

		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET ?? "test") as any;
			const user = await User.findByPk(decoded.id);

			if (!user) {
				res.status(401).json({ message: 'Invalid token' });
				return;
			}

			const newToken = generateTokenFromUser(user.dataValues);
			res.json({ token: newToken });
		} catch (error) {
			next(error);
		}
	}
}