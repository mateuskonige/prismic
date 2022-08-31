import { User } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { CreateUserDTO } from "../../dtos/CreateUserDTO";

export class CreateUserUseCase {
  async execute({name, email}: CreateUserDTO): Promise<User> {
    // Verificar se o usuário já existe
    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email
      }
    })

    // Criar o usuário
    if(userAlreadyExists) {
      // erro
      throw new AppError("User already exists!", )
    }

    const user = await prisma.user.create({
      data: {
        name,
        email
      }
    })

    return user;
  }
}