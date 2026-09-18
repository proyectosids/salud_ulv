import { User } from "./user.js";
export class Member extends User {
    dateOfBirth;
    age;
    gender;
    constructor(userUUID, userCode, firstname, surname, lastname, email, roles, createdDate, dateOfBirth, age, gender) {
        super(userUUID, userCode, firstname, surname, lastname, email, createdDate);
        this.dateOfBirth = dateOfBirth;
        this.age = age;
        this.gender = gender;
    }
}
export class MemberInfo {
    userUUID;
    dateOfBirth;
    age;
    gender;
    constructor(userUUID, dateOfBirth, age, gender) {
        this.userUUID = userUUID;
        this.dateOfBirth = dateOfBirth;
        this.age = age;
        this.gender = gender;
    }
}
//# sourceMappingURL=member.js.map