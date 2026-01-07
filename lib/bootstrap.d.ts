/**
 * Contract-Core Application Bootstrap
 * Sets up dependency injection container for contract operations
 */
declare class ContractCoreContainer {
    private services;
    register<T>(key: string, factory: () => T): void;
    registerSingleton<T>(key: string, instance: T): void;
    resolve<T>(key: string): T;
}
export declare const contractCoreContainer: ContractCoreContainer;
export declare function getContractCoreService<T>(key: string): T;
export {};
//# sourceMappingURL=bootstrap.d.ts.map