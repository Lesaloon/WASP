import { NextFunction, Request, RequestHandler, Response } from 'express';
import { User } from '../models/user/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

// Generate JWT token
const generateToken = (user: any) => {
	return jwt.sign(
		{ id: user._id, role: user.role },	// Include role in the payload
		process.env.JWT_SECRET ?? 'test',		// Use the secret key from the .env file
		{ expiresIn: process.env.JWT_EXPIRES_IN }
	);
};

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

			const token = generateToken(user);
			const userWithoutPassword = user as any;
			userWithoutPassword.password = undefined;
			res.json({ token, user: userWithoutPassword});
		} catch (error) {
			next(error);
		}
	};

	static register: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
		console.log("register");
		const { email, password } = req.body;

		try {
			const newUser = new User({ email, password, role: "user" });
			await newUser.save();
			const userWithoutPassword = newUser as any;
			userWithoutPassword.password = undefined;
			const token = generateToken(userWithoutPassword);
			res.status(201).json({ token, user: newUser });
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

			const newToken = generateToken(user);
			res.json({ token: newToken });
		} catch (error) {
			next(error);
		}
	}
}