// packages/agnostic-ui-contract-core/src/infrastructure/validators/SchemaContractValidator.ts

import { Contract, ContractCategory } from '../../domain/contract/entities/Contract';
import { IContractValidator } from '../../domain/contract/services/IContractValidator';

/**
 * Schema Contract Validator
 * Validates contract definitions against predefined schemas and business rules
 */
export class SchemaContractValidator implements IContractValidator {
  getName(): string {
    return 'schema-validator';
  }

  getDescription(): string {
    return 'Validates contract definitions against schema definitions and business rules';
  }

  async validate(
    contract: Contract,
    _context?: any
  ): Promise<{ isValid: boolean; errors: string[]; warnings: string[] }> {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Validate required combinations
    this.validateRequiredCombinations(contract, errors, warnings);

    // Validate category-specific rules
    this.validateCategoryRules(contract, errors, warnings);

    // Validate accessibility requirements
    this.validateAccessibilityRequirements(contract, errors, warnings);

    // Validate variant compatibility
    this.validateVariantCompatibility(contract, errors, warnings);

    // Validate prop consistency
    this.validatePropConsistency(contract, errors, warnings);

    // Validate metadata
    this.validateMetadata(contract, errors, warnings);

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  supportsValidationType(type: string): boolean {
    return [
      'schema',
      'combinations',
      'category',
      'accessibility',
      'compatibility',
      'consistency',
      'metadata'
    ].includes(type);
  }

  getPriority(): number {
    return 100; // High priority for core schema validation
  }

  /**
   * Validates required combinations of properties
   */
  private validateRequiredCombinations(contract: Contract, errors: string[], warnings: string[]): void {
    // Core contracts must have specific variants
    if (contract.category === ContractCategory.CORE) {
      const requiredVariants = ['size', 'intent'];
      for (const variantName of requiredVariants) {
        if (!contract.getVariant(variantName)) {
          errors.push(`Core contracts must have '${variantName}' variant`);
        }
      }
    }

    // Component contracts should have accessibility if they have interactive variants
    if (contract.category === ContractCategory.COMPONENT) {
      const hasInteractiveVariants = contract.variants.some(v =>
        v.type === 'intent' && v.values.includes('primary')
      );

      if (hasInteractiveVariants && !contract.hasAccessibility) {
        warnings.push('Interactive component contracts should have accessibility features');
      }
    }

    // Theme contracts should have color variants
    if (contract.category === ContractCategory.THEME) {
      const hasColorVariant = contract.variants.some(v => v.name.includes('color'));
      if (!hasColorVariant) {
        warnings.push('Theme contracts typically include color variants');
      }
    }
  }

  /**
   * Validates category-specific rules
   */
  private validateCategoryRules(contract: Contract, errors: string[], warnings: string[]): void {
    switch (contract.category) {
      case ContractCategory.CORE:
        this.validateCoreContractRules(contract, errors, warnings);
        break;
      case ContractCategory.COMPONENT:
        this.validateComponentContractRules(contract, errors, warnings);
        break;
      case ContractCategory.THEME:
        this.validateThemeContractRules(contract, errors, warnings);
        break;
      case ContractCategory.SKIN:
        this.validateSkinContractRules(contract, errors, warnings);
        break;
      case ContractCategory.UTILITY:
        this.validateUtilityContractRules(contract, errors, warnings);
        break;
    }
  }

  /**
   * Validates core contract specific rules
   */
  private validateCoreContractRules(contract: Contract, errors: string[], warnings: string[]): void {
    // Core contracts should have comprehensive variant coverage
    const standardVariants = ['size', 'intent', 'tone', 'emphasis'];
    const missingVariants = standardVariants.filter(v => !contract.getVariant(v));

    if (missingVariants.length > 0) {
      warnings.push(`Core contracts typically include variants: ${missingVariants.join(', ')}`);
    }

    // Core contracts should have id and className props
    const requiredProps = ['id', 'className'];
    for (const propName of requiredProps) {
      if (!contract.getProp(propName)) {
        errors.push(`Core contracts must have '${propName}' prop`);
      }
    }
  }

  /**
   * Validates component contract specific rules
   */
  private validateComponentContractRules(contract: Contract, errors: string[], warnings: string[]): void {
    // Component contracts should have size and intent variants
    const requiredVariants = ['size', 'intent'];
    for (const variantName of requiredVariants) {
      if (!contract.getVariant(variantName)) {
        errors.push(`Component contracts must have '${variantName}' variant`);
      }
    }

    // Component contracts should have disabled state
    const disabledProp = contract.getProp('disabled');
    if (!disabledProp) {
      warnings.push('Component contracts typically include disabled state');
    } else if (disabledProp.type !== 'boolean') {
      errors.push('Disabled prop must be of type boolean');
    }
  }

  /**
   * Validates theme contract specific rules
   */
  private validateThemeContractRules(contract: Contract, _errors: string[], warnings: string[]): void {
    // Theme contracts should focus on visual variants
    const visualVariants = ['color', 'tone', 'emphasis'];
    const hasVisualVariant = contract.variants.some(v =>
      visualVariants.some(vv => v.name.includes(vv))
    );

    if (!hasVisualVariant) {
      warnings.push('Theme contracts should include visual variants (color, tone, emphasis)');
    }
  }

  /**
   * Validates skin contract specific rules
   */
  private validateSkinContractRules(contract: Contract, _errors: string[], warnings: string[]): void {
    // Skin contracts should have styling-related props
    const styleProps = ['className', 'style'];
    const hasStyleProp = contract.props.some(p =>
      styleProps.includes(p.name)
    );

    if (!hasStyleProp) {
      warnings.push('Skin contracts typically include styling props');
    }
  }

  /**
   * Validates utility contract specific rules
   */
  private validateUtilityContractRules(contract: Contract, _errors: string[], warnings: string[]): void {
    // Utility contracts should be minimal
    if (contract.variantCount > 2) {
      warnings.push('Utility contracts are typically simple with few variants');
    }

    if (contract.propCount > 5) {
      warnings.push('Utility contracts are typically simple with few props');
    }
  }

  /**
   * Validates accessibility requirements
   */
  private validateAccessibilityRequirements(contract: Contract, errors: string[], warnings: string[]): void {
    if (!contract.hasAccessibility) {
      // Check if accessibility should be required
      const hasInteractiveProps = contract.props.some(p =>
        ['onClick', 'onChange', 'onSubmit'].some(event => p.name.includes(event))
      );

      if (hasInteractiveProps) {
        warnings.push('Contracts with interactive props should have accessibility features');
      }
      return;
    }

    const accessibility = contract.accessibility;

    // Validate ARIA roles
    if (accessibility.roles.length > 0) {
      const validRoles = [
        'button', 'checkbox', 'dialog', 'grid', 'gridcell', 'link',
        'list', 'listitem', 'menu', 'menuitem', 'option', 'progressbar',
        'radio', 'radiogroup', 'region', 'tab', 'tablist', 'tabpanel',
        'textbox', 'tooltip', 'tree', 'treeitem'
      ];

      const invalidRoles = accessibility.roles.filter(role => !validRoles.includes(role));
      if (invalidRoles.length > 0) {
        errors.push(`Invalid ARIA roles: ${invalidRoles.join(', ')}`);
      }
    }

    // Validate keyboard actions
    if (accessibility.keyboardActions.length > 0) {
      const validActions = [
        'Enter', 'Space', 'Escape', 'ArrowUp', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageUp',
        'PageDown', 'Tab', 'Shift+Tab'
      ];

      const invalidActions = accessibility.keyboardActions.filter(
        action => !validActions.includes(action)
      );
      if (invalidActions.length > 0) {
        errors.push(`Invalid keyboard actions: ${invalidActions.join(', ')}`);
      }
    }
  }

  /**
   * Validates variant compatibility
   */
  private validateVariantCompatibility(contract: Contract, errors: string[], _warnings: string[]): void {
    // Check for conflicting variant names
    const variantNames = new Set<string>();
    for (const variant of contract.variants) {
      if (variantNames.has(variant.name)) {
        errors.push(`Duplicate variant name: ${variant.name}`);
      }
      variantNames.add(variant.name);

      // Validate variant values
      if (!variant.values || variant.values.length === 0) {
        errors.push(`Variant '${variant.name}' must have at least one value`);
      }

      // Check default value is valid
      if (variant.defaultValue !== undefined && !variant.values.includes(variant.defaultValue)) {
        errors.push(`Variant '${variant.name}' default value '${variant.defaultValue}' not in allowed values`);
      }
    }
  }

  /**
   * Validates prop consistency
   */
  private validatePropConsistency(contract: Contract, errors: string[], warnings: string[]): void {
    // Check for conflicting prop names
    const propNames = new Set<string>();
    for (const prop of contract.props) {
      if (propNames.has(prop.name)) {
        errors.push(`Duplicate prop name: ${prop.name}`);
      }
      propNames.add(prop.name);

      // Validate required props don't have defaults
      if (prop.required && prop.defaultValue !== undefined) {
        warnings.push(`Required prop '${prop.name}' should not have a default value`);
      }

      // Validate prop types
      const validTypes = ['string', 'number', 'boolean', 'object', 'array', 'function'];
      if (!validTypes.includes(prop.type)) {
        warnings.push(`Prop '${prop.name}' has non-standard type '${prop.type}'`);
      }
    }
  }

  /**
   * Validates metadata
   */
  private validateMetadata(contract: Contract, errors: string[], warnings: string[]): void {
    const metadata = contract.metadata;

    // Check for required metadata fields
    const recommendedFields = ['author', 'description', 'tags'];
    for (const field of recommendedFields) {
      if (!metadata[field as keyof typeof metadata]) {
        warnings.push(`Consider adding ${field} to contract metadata`);
      }
    }

    // Validate author format
    if (metadata['author'] && typeof metadata['author'] !== 'string') {
      errors.push('Author should be a string');
    }

    // Validate tags
    if (metadata['tags']) {
      if (!Array.isArray(metadata['tags'])) {
        errors.push('Tags should be an array of strings');
      } else if (!(metadata['tags'] as any[]).every((tag: any) => typeof tag === 'string')) {
        errors.push('All tags should be strings');
      }
    }

    // Check for deprecated metadata
    if (metadata['deprecated']) {
      warnings.push('Contract is marked as deprecated in metadata');
    }
  }
}