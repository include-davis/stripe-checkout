// utils/ruleBuilder.ts - New utility to help build rules

import {
    StripeElementClass,
    ElementState,
    ElementPseudoClass,
    ElementPseudoElement,
    CSSProperties,
    ElementRules
  } from '../types';
  
  /**
   * Validates that an element class is a valid Stripe element class
   * @param elementClass The element class to validate
   * @returns True if valid, false otherwise
   */
  export const isValidElementClass = (elementClass: string): elementClass is StripeElementClass => {
    const validElementClasses: StripeElementClass[] = [
      'Tab', 'TabIcon', 'TabLabel',
      'Label',
      'Input',
      'Error',
      'Block', 'BlockDivider', 'BlockAction',
      'Checkbox', 'CheckboxInput', 'CheckboxLabel',
      'Switch', 'SwitchControl',
      'RadioIcon', 'RadioIconOuter', 'RadioIconInner',
      'Menu', 'MenuIcon', 'MenuAction',
      'PaymentMethodMessaging'
    ];
    
    return validElementClasses.includes(elementClass as StripeElementClass);
  };
  
  /**
   * Validates that a state is a valid Stripe element state
   * @param state The state to validate
   * @returns True if valid, false otherwise
   */
  export const isValidState = (state: string): state is ElementState => {
    const validStates: ElementState[] = [
      'selected', 'invalid', 'focused', 'empty',
      'checked', 'floating', 'resting', 'highlight',
      'active', 'disabled', 'open', 'negative',
      'new', 'hovered'
    ];
    
    return validStates.includes(state as ElementState);
  };
  
  /**
   * Validates that a pseudo-class is a valid Stripe element pseudo-class
   * @param pseudoClass The pseudo-class to validate
   * @returns True if valid, false otherwise
   */
  export const isValidPseudoClass = (pseudoClass: string): pseudoClass is ElementPseudoClass => {
    const validPseudoClasses: ElementPseudoClass[] = [
      'hover', 'focus', 'active', 'disabled',
      'autofill', 'focus-visible'
    ];
    
    return validPseudoClasses.includes(pseudoClass as ElementPseudoClass);
  };
  
  /**
   * Validates that a pseudo-element is a valid Stripe element pseudo-element
   * @param pseudoElement The pseudo-element to validate
   * @returns True if valid, false otherwise
   */
  export const isValidPseudoElement = (pseudoElement: string): pseudoElement is ElementPseudoElement => {
    const validPseudoElements: ElementPseudoElement[] = [
      'placeholder', 'selection'
    ];
    
    return validPseudoElements.includes(pseudoElement as ElementPseudoElement);
  };
  
  /**
   * Creates a rule for a Stripe element
   * @param element The element class
   * @param styles The CSS properties to apply
   * @param state Optional element state
   * @param pseudoClass Optional pseudo-class
   * @param pseudoElement Optional pseudo-element
   * @returns An object with a single rule
   */
  export const createRule = (
    element: StripeElementClass,
    styles: CSSProperties,
    state?: ElementState,
    pseudoClass?: ElementPseudoClass,
    pseudoElement?: ElementPseudoElement
  ): ElementRules => {
    let selector = `.${element}`;
    
    if (state) {
      if (!isValidState(state)) {
        console.warn(`Warning: '${state}' is not a valid state for ${element}`);
        return {};
      }
      selector += `--${state}`;
    }
    
    if (pseudoClass) {
      if (!isValidPseudoClass(pseudoClass)) {
        console.warn(`Warning: '${pseudoClass}' is not a valid pseudo-class for ${element}`);
        return {};
      }
      selector += `:${pseudoClass}`;
    }
    
    if (pseudoElement) {
      if (!isValidPseudoElement(pseudoElement)) {
        console.warn(`Warning: '${pseudoElement}' is not a valid pseudo-element for ${element}`);
        return {};
      }
      selector += `::${pseudoElement}`;
    }
    
    return { [selector]: styles };
  };
  
  /**
   * Rule builder for creating multiple rules at once
   */
  export class RuleBuilder {
    private rules: ElementRules = {};
    
    /**
     * Add a rule for a Stripe element
     * @param element The element class
     * @param styles The CSS properties to apply
     * @param state Optional element state
     * @param pseudoClass Optional pseudo-class
     * @param pseudoElement Optional pseudo-element
     * @returns This builder for chaining
     */
    addRule(
      element: StripeElementClass,
      styles: CSSProperties,
      state?: ElementState,
      pseudoClass?: ElementPseudoClass,
      pseudoElement?: ElementPseudoElement
    ): RuleBuilder {
      const rule = createRule(element, styles, state, pseudoClass, pseudoElement);
      this.rules = { ...this.rules, ...rule };
      return this;
    }
    
    /**
     * Get all rules
     * @returns The complete rules object
     */
    build(): ElementRules {
      return this.rules;
    }
  }