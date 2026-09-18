import { group } from "node:console";
import { MemberInfo } from "../../../models/member.js";
export default class AuthUseCase {
    repository;
    hashService;
    tokenService;
    constructor(repository, hashService, tokenService) {
        this.repository = repository,
            this.hashService = hashService,
            this.tokenService = tokenService;
    }
    async userExists(userCode, email) {
        const foundEmail = await this.repository.findByEmail(email);
        const foundCode = await this.repository.findByCode(userCode);
        if (foundEmail || foundCode) {
            return true;
        }
        return false;
    }
    async registerMember(user, password, typeID) {
        const foundEmail = await this.repository.findByEmail(user.email);
        const foundCode = await this.repository.findByCode(user.userCode);
        if (foundEmail || foundCode) {
            throw new Error("User already exists");
        }
        const hashedPassword = await this.hashService.hash(password);
        // password = hashedPassword; // Password change
        console.log(`Use case: Before registry`);
        await this.repository.registerMember(user, hashedPassword);
        await this.repository.setUserRole(user.userUUID);
        console.log(`Use case: After registry`);
        await this.repository.setMemberTypeID(user.userUUID, typeID);
        // console.log(`Use case: Making token`)
        // const token = await this.login(user.email!, password);  // uses the login method
        // console.log(`Use case token: ${token}`)
        // return token;
    }
    async login(input, password) {
        const foundUser = await this.repository.login(input);
        if (!foundUser) {
            throw new Error("Invalid credentials");
        }
        const { user, passwordHash } = foundUser;
        // console.log(`In login use case: ${foundUser} ${passwordHash},`)
        // console.log(`In login use case: ${password},`)
        const validPw = await this.hashService.compare(password, passwordHash);
        if (!validPw) {
            throw new Error("Invalid credentials");
        }
        const roles = await this.repository.getUserRoles(user.userUUID);
        const type = await this.repository.getMemberType(user.userUUID);
        const groupID = await this.repository.getMemberGroupID(user.userUUID);
        console.log(`In login user: ${user}`);
        console.log(`In login roles: ${roles}`);
        console.log(`In login groupID: ${groupID}`);
        console.log(`In login occupation: ${type}`);
        const token = await this.tokenService.generate({
            user: user,
            roles: roles,
            groupID: groupID,
            typeID: type,
        });
        console.log(`Use case token: ${token}`);
        return token;
    }
    async registerMemberInfo(email, info) {
        const foundUser = await this.repository.findByEmail(email);
        if (!foundUser) {
            throw new Error("User doesn't exist");
        }
        await this.repository.registerMemberInfo(info);
        return;
    }
    async setMemberType(email, typeID) {
        const foundUser = await this.repository.findByEmail(email);
        if (!foundUser) {
            throw new Error("User doesn't exist");
        }
        ;
        await this.repository.setMemberTypeID(email, typeID);
        return;
    }
    async changePassword(email, newPw) {
        const foundUser = await this.repository.findByEmail(email);
        // console.log(foundUser);
        if (!foundUser) {
            throw new Error("User doesn't exist");
        }
        const newHashedPassword = await this.hashService.hash(newPw);
        const changedPassword = await this.repository.changePassword(email, newHashedPassword);
        if (!changedPassword) {
            throw new Error("Password could not be change");
        }
    }
    async deleteAccount(email) {
        const foundUser = await this.repository.findByEmail(email);
        if (!foundUser) {
            throw new Error("Email doesn't exist");
        }
        await this.repository.deleteAccount(email);
        // if(!deletedAccount){throw new Error("Account could not be deleted")}
    }
}
//# sourceMappingURL=auth_use-case.js.map