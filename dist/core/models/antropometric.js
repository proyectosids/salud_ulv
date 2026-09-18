export class Anthropometric {
    anthropometricID;
    userUUID;
    height;
    weight;
    smm;
    fatMass;
    bodyFatPercentage;
    bmi;
    whr;
    registeredAt;
    constructor(anthropometricID, userUUID, height, weight, smm, fatMass, bodyFatPercentage, bmi, whr, registeredAt) {
        this.anthropometricID = anthropometricID;
        this.userUUID = userUUID;
        this.height = height;
        this.weight = weight;
        this.smm = smm;
        this.fatMass = fatMass;
        this.bodyFatPercentage = bodyFatPercentage;
        this.bmi = bmi;
        this.whr = whr;
        this.registeredAt = registeredAt;
    }
}
//# sourceMappingURL=antropometric.js.map