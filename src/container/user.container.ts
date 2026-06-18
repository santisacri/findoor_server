import { GetUserByIdUseCase } from "../application/use-cases/user/get-user-by-id.use-case";
import { UserController } from "../presentation/user/user.controller";
import { userRepository } from "./repositories.container";

const getUserByIdUseCase = new GetUserByIdUseCase(userRepository)

const userController = new UserController({ getUserByIdUseCase })

export default userController