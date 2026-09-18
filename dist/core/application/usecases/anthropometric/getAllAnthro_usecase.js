export class GetAllAnthroUseCase {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async execute() {
        const data = await this.repository.getAllData();
        // console.log(`In usecase: ${data}`);
        if (!data) {
            return null;
        }
        return data;
    }
}
//# sourceMappingURL=getAllAnthro_usecase.js.map