export class GetByUserIDUseCase {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async execute(userID) {
        const data = await this.repository.getAllByUserCode(userID);
        // console.log(`In usecase: ${data}`);
        if (!data) {
            return null;
        }
        return data;
    }
}
//# sourceMappingURL=getByUserCode_usercase.js.map