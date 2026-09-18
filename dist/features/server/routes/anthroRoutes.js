import { SaveAnthroUseCase } from "../../../core/application/usecases/anthropometric/saveAntrho_usecase.js";
import AnthroRepo from "../../external/mssql/queries/anthro_repo.js";
import { GetAllAnthroController, GetByUserCodeAnthroController, SaveAnthroController } from "../controllers/anthropController.js";
import { GetAllAnthroUseCase } from "../../../core/application/usecases/anthropometric/getAllAnthro_usecase.js";
import { GetByUserIDUseCase } from "../../../core/application/usecases/anthropometric/getByUserCode_usercase.js";
const repository = new AnthroRepo;
const saveUseCase = new SaveAnthroUseCase(repository);
const getAllUseCase = new GetAllAnthroUseCase(repository);
const getByUserCodeCase = new GetByUserIDUseCase(repository);
const saveController = SaveAnthroController(saveUseCase);
const getAllController = GetAllAnthroController(getAllUseCase);
const getByUserCodeController = GetByUserCodeAnthroController(getByUserCodeCase);
export async function anthroRoutes(fastify) {
    fastify.post("/save", saveController);
    fastify.get("/get/all", getAllController);
    fastify.get("/get/:userCode", getByUserCodeController);
}
//# sourceMappingURL=anthroRoutes.js.map