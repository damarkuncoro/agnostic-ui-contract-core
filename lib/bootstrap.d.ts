/**
 * Contract-Core Application Bootstrap
 * Sets up dependency injection container for contract operations using DDD principles
 */
import { CreateContractUseCase } from './application/use-cases/CreateContractUseCase';
import { SchemaContractValidator } from './infrastructure/validators/SchemaContractValidator';
import { IContractValidator } from './domain/contract/services/IContractValidator';
declare class ContractCoreServiceContainer {
    private static instance;
    private services;
    private constructor();
    static getInstance(): ContractCoreServiceContainer;
    private initializeServices;
    get<T>(serviceName: string): T;
    getCreateContractUseCase(): CreateContractUseCase;
    getSchemaContractValidator(): SchemaContractValidator;
    getContractValidators(): IContractValidator[];
}
export declare const contractCoreServiceContainer: ContractCoreServiceContainer;
export declare function getCreateContractUseCase(): CreateContractUseCase;
export declare function getSchemaContractValidator(): SchemaContractValidator;
export declare function getContractValidators(): IContractValidator[];
export declare function getContractCoreService<T>(serviceName: string): T;
export {};
//# sourceMappingURL=bootstrap.d.ts.map