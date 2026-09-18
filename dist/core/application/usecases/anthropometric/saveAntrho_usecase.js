export class SaveAnthroUseCase {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async execute(data) {
        await this.repository.save(data);
    }
}
//# sourceMappingURL=saveAntrho_usecase.js.map