import { User } from "../../core/models/user.js";
export class UserDTO {
    userUUID;
    userCode;
    firstname;
    surname;
    lastname;
    email;
    // roles?: string[];
    createdAt;
    constructor(data) {
        this.userUUID = data.userUUID;
        this.userCode = data.userCode;
        this.firstname = data.firstname;
        this.surname = data.surname;
        this.lastname = data.lastname;
        this.email = data.email;
        // this.roles = data.roles;
        this.createdAt = data.createdAt;
    }
    // ─── Domain (UserModel) → DTO ───────────────────
    static fromDomain(user) {
        return new UserDTO({
            userUUID: user.userUUID,
            userCode: user.userCode,
            firstname: user.firstname,
            surname: user.surname,
            lastname: user.lastname,
            email: user.email,
            // roles: user.roles,
            createdAt: user.createdAt,
        });
    }
    // ─── Database row → DTO ─────────────────────────
    static fromMap(row) {
        return new UserDTO({
            userUUID: row['UserUUID'],
            userCode: row['UserCode'],
            firstname: row['Firstname'],
            surname: row['Surname'],
            lastname: row['Lastname'],
            email: row['Email'],
            // roles: row['Roles'],
            createdAt: row['CreatedAt']
                ? new Date(row['CreatedAt'])
                : undefined,
        });
    }
    // ─── JSON (API request body) → DTO ──────────────
    static fromJson(json) {
        return new UserDTO({
            userUUID: json['userUUID'],
            userCode: json['userCode'],
            firstname: json['firstname'],
            surname: json['surname'],
            lastname: json['lastname'],
            email: json['email'],
            // roles: json['roles'],
            createdAt: json['createdAt']
                ? new Date(json['createdAt'])
                : undefined,
        });
    }
    // ─── DTO → Domain (UserModel) ───────────────────
    toDomain() {
        return new User(this.userUUID, this.userCode, this.firstname, this.surname, this.lastname, this.email, 
        // this.roles,
        this.createdAt);
    }
    // ─── DTO → JSON (API response) ──────────────────
    toJson() {
        return {
            userUUID: this.userUUID,
            userCode: this.userCode,
            firstname: this.firstname,
            surname: this.surname,
            lastname: this.lastname,
            email: this.email,
            // roles: this.roles,
            createdAt: this.createdAt?.toISOString(),
        };
    }
}
//# sourceMappingURL=userDTO.js.map