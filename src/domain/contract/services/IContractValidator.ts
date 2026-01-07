// packages/agnostic-ui-contract-core/src/domain/contract/services/IContractValidator.ts

import { Contract } from '../entities/Contract';

/**
 * Contract Validator Interface
 * Defines the contract for validating contract definitions
 */
export interface IContractValidator {
  /**
   * Gets the validator name
   */
  getName(): string;

  /**
   * Gets the validator description
   */
  getDescription(): string;

  /**
   * Validates a contract definition
   */
  validate(
    contract: Contract,
    context?: any
  ): Promise<{ isValid: boolean; errors: string[]; warnings: string[] }>;

  /**
   * Checks if this validator supports a specific validation type
   */
  supportsValidationType(type: string): boolean;

  /**
   * Gets the priority of this validator (higher = more important)
   */
  getPriority(): number;
}