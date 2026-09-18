import { changePasswordController, deleteAccountController, loginUserController, registerUserController, userExistsController } from "../controllers/authController.js";
import { BcryptService } from "../../external/services/hashService.js";
import { JwtService } from "../../external/services/tokenService.js";
import AuthRepository from "../../external/mssql/queries/userAuth_repo.js";
import AuthUseCase from "../../../core/application/usecases/auth/auth_use-case.js";
// Dependencies
const repository = new AuthRepository;
const hashService = new BcryptService;
const tokenService = new JwtService;
const useCase = new AuthUseCase(repository, hashService, tokenService);
// Use cases
const userExistsUseCase = userExistsController(useCase);
const registerUseCase = registerUserController(useCase);
const loginUseCase = loginUserController(useCase);
const changePwUseCase = changePasswordController(useCase);
const deleteAccUseCase = deleteAccountController(useCase);
// Routes
export async function authRoutes(fastify) {
    fastify.post("/user/exists", userExistsUseCase);
    fastify.post("/register", registerUseCase);
    fastify.post("/login", loginUseCase);
    fastify.post("/changePw", changePwUseCase);
    fastify.delete("/deleteAcc", deleteAccUseCase);
}
//# sourceMappingURL=authRoutes.js.map