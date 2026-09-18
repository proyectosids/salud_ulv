import bcrypt from "bcryptjs";
// data/services/bcrypt.service.ts
export class BcryptService {
    async hash(value) { return bcrypt.hash(value, 10); }
    async compare(value, hash) { return bcrypt.compare(value, hash); }
}
//# sourceMappingURL=hashService.js.map