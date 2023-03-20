import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { UserDto } from "models/create-user.dto";
import { PartialUserDto } from "models/update-user.dto";
import { UserRepository } from "repositories/user.repository";
import { User } from "types/user.entity";
import { UserResponse } from "types/UserResponse";
import { Exception } from "utils/exceptions/Exception";
import { EExceptionType } from "utils/exceptions/exception.helper";

@Injectable()
export class UserService {
	constructor(private readonly userRepository: UserRepository) {}

	async create(dto: UserDto): Promise<User> {
		if ("role" in dto) throw new Exception(EExceptionType.FORBIDDEN);
		const duplicateUsername = await this.userRepository.findOne(
			dto.username,
		);
		if (duplicateUsername) {
			throw new Exception(
				EExceptionType.DATA_INVALID,
				"DUPLICATE USERNAME",
			);
		}
		if (dto.password.length < 8)
			throw new Exception(
				EExceptionType.DATA_INVALID,
				"PASSWORD TOO SHORT",
			);

		const data: Prisma.UserCreateInput = { ...dto };

		data.password = await bcrypt.hash(dto.password, 10);
		const user = await this.userRepository.create(data);

		delete user.password;
		return user;
	}

	async findAll(role: string): Promise<UserResponse[]> {
		if (role !== "admin") throw new Exception(EExceptionType.FORBIDDEN);
		const users = await this.userRepository.findAll();
		return users.map(user => new UserResponse(user));
	}

	async findOne(loggedUser: User, username: string): Promise<UserResponse> {
		if (loggedUser.role !== "admin" && loggedUser.username !== username) {
			throw new Exception(EExceptionType.FORBIDDEN);
		}
		const user = await this.userRepository.findOne(username);
		if (!user) {
			throw new Exception(
				EExceptionType.RESOURCE_NOT_FOUND,
				"USER NOT FOUND",
			);
		}
		return new UserResponse(user);
	}

	async update(
		loggedUser: User,
		username: string,
		dto: PartialUserDto,
	): Promise<User> {
		await this.findOne(loggedUser, username);
		if (loggedUser.role !== "admin" && "role" in dto)
			throw new Exception(EExceptionType.FORBIDDEN);
		if ("username" in dto && dto.username !== username) {
			const duplicateUsername = await this.userRepository.findOne(
				dto.username,
			);
			if (duplicateUsername) {
				throw new Exception(
					EExceptionType.DATA_INVALID,
					"DUPLICATE USERNAME",
				);
			}
		}
		if ("password" in dto) {
			if (dto.password.length < 8) {
				throw new Exception(
					EExceptionType.DATA_INVALID,
					"PASSWORD TOO SHORT",
				);
			}
			dto.password = await bcrypt.hash(dto.password, 10);
		}
		const data: Prisma.UserUpdateInput = { ...dto };
		const user = await this.userRepository.update(username, data);
		delete user.password;
		return user;
	}

	async remove(loggedUser: User, username: string): Promise<User> {
		await this.findOne(loggedUser, username);
		const user = await this.userRepository.remove(username);
		delete user.password;
		return user;
	}
}
