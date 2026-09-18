import env from 'dotenv';
import jwt from "jsonwebtoken";
export class JwtService {
    async generate(payload) { return jwt.sign(payload, "secret", { expiresIn: "7d" }); }
    async verify(token) { return jwt.verify(token, "secret"); }
}
//# sourceMappingURL=tokenService.js.map