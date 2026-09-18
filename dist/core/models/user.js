export class User {
    userUUID;
    userCode;
    firstname;
    surname;
    lastname;
    email;
    // readonly roles?: string[];
    createdAt;
    constructor(userUUID, userCode, firstname, surname, lastname, email, 
    // roles: string[],
    createdAt) {
        this.userUUID = userUUID;
        this.userCode = userCode;
        this.firstname = firstname;
        this.surname = surname;
        this.lastname = lastname;
        this.email = email;
        // this.roles = roles;
        this.createdAt = createdAt;
    }
}
//# sourceMappingURL=user.js.map