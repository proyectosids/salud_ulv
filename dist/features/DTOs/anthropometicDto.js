import { Anthropometric } from "../../core/models/antropometric.js";
export class AnthropometricDto {
    anthropometricID;
    userID; // Can be UserUUID and Code
    height;
    weight;
    smm;
    fatMass;
    bodyFatPercentage;
    bmi;
    whr;
    registeredAt;
    constructor(data) {
        this.anthropometricID = data.anthropometricID;
        this.userID = data.userID;
        this.height = data.height;
        this.weight = data.weight;
        this.smm = data.smm;
        this.fatMass = data.fatMass;
        this.bodyFatPercentage = data.bodyFatPercentage;
        this.bmi = data.bmi;
        this.whr = data.whr;
        this.registeredAt = data.registeredAt;
    }
    static fromDomain(anthropometric) {
        // Fix: Wrap the data inside an object {}
        return new AnthropometricDto({
            userID: anthropometric.userUUID,
            height: anthropometric.height,
            weight: anthropometric.weight,
            smm: anthropometric.smm,
            fatMass: anthropometric.fatMass,
            bodyFatPercentage: anthropometric.bodyFatPercentage,
            bmi: anthropometric.bmi,
            whr: anthropometric.whr,
            registeredAt: anthropometric.registeredAt,
        }); // Cast ensures it satisfies the class type shape
    }
    // Admin view
    static fromMap(row) {
        return new AnthropometricDto({
            userID: row['UserCode'],
            height: Number(row['Height']),
            weight: Number(row['Weight_']),
            smm: Number(row['SMM']),
            fatMass: Number(row['FatMass']),
            bodyFatPercentage: Number(row['BodyFatPercentage']),
            bmi: Number(row['BMI']),
            whr: Number(row['WHR']),
            // MSSQL DATETIME fields are usually automatically parsed into JS Date objects 
            // by the driver, but wrapping it in `new Date()` acts as a safe guard.
            registeredAt: row['RegisteredAt'] || row['RegisteredAt']
                ? new Date(row['RegisteredAt'] ?? row['RegisteredAt'])
                : new Date(),
        });
    }
    static fromJson(json) {
        // Fix: Wrap the data inside an object {}
        return new AnthropometricDto({
            anthropometricID: json['anthropometricID'],
            userID: json['userUUID'],
            height: json['height'],
            weight: json['weight'],
            smm: json['smm'],
            fatMass: json['fatMass'],
            bodyFatPercentage: json['bodyFatPercentage'],
            bmi: json['bmi'],
            whr: json['whr'],
            registeredAt: json['registeredAt'],
        });
    }
    toDomain() {
        // Assuming Anthropometric domain model still uses positional parameters in its constructor
        return new Anthropometric(this.anthropometricID, // Avoid generating a brand new UUID if one already exists
        this.userID, this.height, this.weight, this.smm, this.fatMass, this.bodyFatPercentage, this.bmi, this.whr, this.registeredAt);
    }
    toJson() {
        return {
            userCode: this.userID,
            height: this.height,
            weight: this.weight,
            smm: this.smm,
            fatMass: this.fatMass,
            bodyFatPercentage: this.bodyFatPercentage,
            bmi: this.bmi,
            whr: this.whr,
            registeredAt: this.registeredAt.toISOString(),
        };
    }
}
//# sourceMappingURL=anthropometicDto.js.map