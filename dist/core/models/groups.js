export class Group {
    groupID;
    name;
    description;
    // readonly building?: string;
    members;
    constructor(name, description, 
    // building: string,
    members = [], groupID) {
        this.name = name;
        this.description = description;
        // this.building = building;
        this.members = members;
        this.groupID = groupID;
    }
}
//# sourceMappingURL=groups.js.map