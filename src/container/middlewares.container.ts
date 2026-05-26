import { createOwnerMiddleware } from "../presentation/middlewares/owner.middleware";
import { propertyRepository } from "./repositories.container";


export const ownerMiddleware = createOwnerMiddleware(propertyRepository)