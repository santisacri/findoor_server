import { ChangePersonalInfoUseCase } from "../application/use-cases/user/change-personal-info.use-case";
import { GetUserByIdUseCase } from "../application/use-cases/user/get-user-by-id.use-case";
import { UserController } from "../presentation/user/user.controller";
import { userRepository } from "./repositories.container";

const getUserByIdUseCase = new GetUserByIdUseCase(userRepository)
const changePersonalInfoUseCase = new ChangePersonalInfoUseCase(userRepository)

const userController = new UserController({ getUserByIdUseCase, changePersonalInfoUseCase })

export default userController