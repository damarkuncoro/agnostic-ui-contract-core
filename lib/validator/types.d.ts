export interface ContractValidationResult {
    valid: boolean;
    errors: ContractValidationError[];
    warnings: ContractValidationWarning[];
}
export interface ContractValidationError {
    type: 'error';
    code: string;
    message: string;
    file?: string;
    line?: number;
    column?: number;
}
export interface ContractValidationWarning {
    type: 'warning';
    code: string;
    message: string;
    file?: string;
    line?: number;
    column?: number;
}
export type ContractValidationIssue = ContractValidationError | ContractValidationWarning;
export interface ContractValidationRule {
    name: string;
    description: string;
    validate: (contractPath: string) => Promise<ContractValidationIssue[]>;
}
export declare const VALIDATION_ERROR_CODES: {
    readonly PATH_NOT_FOUND: "PATH_NOT_FOUND";
    readonly MISSING_REQUIRED_FILE: "MISSING_REQUIRED_FILE";
    readonly NO_TYPESCRIPT_FILES: "NO_TYPESCRIPT_FILES";
    readonly MISSING_PACKAGE_NAME: "MISSING_PACKAGE_NAME";
    readonly INVALID_PACKAGE_NAME: "INVALID_PACKAGE_NAME";
    readonly MISSING_CORE_DEPENDENCY: "MISSING_CORE_DEPENDENCY";
    readonly INVALID_PACKAGE_JSON: "INVALID_PACKAGE_JSON";
    readonly FILE_READ_ERROR: "FILE_READ_ERROR";
    readonly NO_EXPORTS: "NO_EXPORTS";
    readonly INDEX_READ_ERROR: "INDEX_READ_ERROR";
    readonly MISSING_README: "MISSING_README";
    readonly MISSING_README_SECTION: "MISSING_README_SECTION";
    readonly README_READ_ERROR: "README_READ_ERROR";
    readonly VALIDATION_FAILED: "VALIDATION_FAILED";
};
export declare const VALIDATION_WARNING_CODES: {
    readonly MISSING_RECOMMENDED_FILE: "MISSING_RECOMMENDED_FILE";
    readonly MISSING_TYPESCRIPT_DEV_DEP: "MISSING_TYPESCRIPT_DEV_DEP";
    readonly MISSING_SEMANTIC_TYPE: "MISSING_SEMANTIC_TYPE";
    readonly NO_BARREL_EXPORTS: "NO_BARREL_EXPORTS";
    readonly NO_CORE_REEXPORTS: "NO_CORE_REEXPORTS";
    readonly NO_CODE_EXAMPLES: "NO_CODE_EXAMPLES";
};
//# sourceMappingURL=types.d.ts.map