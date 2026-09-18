import { UserDTO } from "../../DTOs/userDTO.js";
export const userExistsController = (useCase) => {
    return async (request, reply) => {
        try {
            const body = request.body;
            const userCode = body.userCode;
            const email = body.email;
            const exists = await useCase.userExists(userCode, email);
            if (exists) {
                return reply.status(200).send({
                    exists
                });
            }
            return reply.status(404).send({
                exists
            });
        }
        catch (error) {
            return reply.status(500).send({
                error: error instanceof Error ? error.message : "Internal Server Error"
            });
        }
    };
};
// //--------------------------------------------------------------------------------------------------------------------------
export const registerUserController = (useCase) => {
    return async (request, reply) => {
        try {
            // const body = request.body as any;
            // console.log(JSON.stringify(request.body, null, 2));
            const { user, password, typeID, } = request.body;
            // console.log(`In http: ${pUser.userUUID}`);
            console.log(`In http: ${password}`);
            console.log(`In http: ${typeID}`);
            const pUser = UserDTO.fromJson(user).toDomain();
            await useCase.registerMember(pUser, password, typeID);
            return reply.status(201).send({
                message: "User added added in successfully",
                // token: token
            });
        }
        catch (error) {
            console.log(error);
            return reply.status(500).send({
                error: error instanceof Error ? error.message : "Internal Server Error"
            });
        }
    };
};
//--------------------------------------------------------------------------------------------------------------------------
export const loginUserController = (useCase) => {
    return async (request, reply) => {
        try {
            // console.log(JSON.stringify(request.body, null, 2));
            const { input, password } = request.body;
            const token = await useCase.login(input, password);
            return reply.status(200).send({
                message: "User logged in successfully",
                token: token
            });
        }
        catch (error) {
            return reply.status(500).send({
                error: error instanceof Error ? error.message : "Internal Server Error"
            });
        }
    };
};
//--------------------------------------------------------------------------------------------------------------------------
export const changePasswordController = (useCase) => {
    return async (request, reply) => {
        try {
            const { email, newPassword } = request.body;
            console.log(`In controller ${email}, ${newPassword}`);
            await useCase.changePassword(email, newPassword);
            return reply.status(200).send({
                message: "Password changed successfuly"
            });
        }
        catch (error) {
            return reply.status(500).send({
                error: error instanceof Error ? error.message : "Internal Server Error"
            });
        }
    };
};
//--------------------------------------------------------------------------------------------------------------------------
export const deleteAccountController = (useCase) => {
    return async (request, reply) => {
        try {
            const { email } = request.body;
            console.log(email);
            await useCase.deleteAccount(email);
            return reply.status(200).send({
                message: "Account deleted successfully"
            });
        }
        catch (error) {
            return reply.status(500).send({
                error: error instanceof Error ? error.message : "Internal Server Error"
            });
        }
    };
};
//# sourceMappingURL=authController.js.map