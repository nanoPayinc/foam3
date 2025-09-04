// FOAM3 ESLint Configuration
// 
// This configuration is designed to align with the FOAM3 Style Guide while being
// practical for the existing codebase. Many style rules are currently disabled
// due to codebase inconsistency, but are documented for future enablement.
//
// Key FOAM3 Style Guide Requirements:
// - 80 character line length (with exceptions for embedded data)
// - Spaces inside parentheses for control flow: if ( condition )
// - Space after ! operator: if ( ! found )
// - Single-line statements under 80 chars don't need braces
// - Vertical alignment encouraged for readability
// - No trailing commas
// - No unnecessary quote marks on object keys
// - CamelCase for models, camelCase for properties
// - Use == and != (not === and !==)
//
// Rules are organized by category with detailed explanations for easy
// configuration management. Change 'off' to 'error' or 'warn' to enable rules.

module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true
  },

  extends: [
    'eslint:recommended'
  ],

  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'script'
  },

  globals: {
    foam: 'readonly',
    globalThis: 'writable'
  },

  rules: {
    // =============================================================================
    // INDENTATION AND SPACING
    // =============================================================================

    // FOAM3 uses 2 spaces for both indentation and line continuation (differs from Google)
    // Currently disabled due to codebase inconsistency - enable when ready to enforce
    'indent': ['off', 2, {
      SwitchCase: 1,
      VariableDeclarator: 1,
      outerIIFEBody: 1,
      MemberExpression: 1,
      FunctionDeclaration: { parameters: 1, body: 1 },
      FunctionExpression: { parameters: 1, body: 1 },
      CallExpression: { arguments: 1 },
      ArrayExpression: 1,
      ObjectExpression: 1
    }],

    // =============================================================================
    // LINE LENGTH
    // =============================================================================

    // FOAM3 Style Guide: 80 character line length (with exceptions for embedded data)
    // Currently set to 100 for leniency - change to 80 when ready to strictly enforce
    'max-len': ['warn', {
      code: 80, // FOAM3 standard is 80 characters
      tabWidth: 2,
      ignoreUrls: true,
      ignoreStrings: true, // Allow long strings (embedded data exception)
      ignoreTemplateLiterals: true, // Allow long templates (embedded data exception)
      ignoreRegExpLiterals: true,
      ignoreComments: true,
      ignorePattern: '^\\s*//.*$' // Ignore comment lines
    }],

    // =============================================================================
    // FOAM3 SPECIFIC SPACING RULES (based on style guide exceptions)
    // =============================================================================

    // FOAM3 requires spaces inside parentheses for control flow statements
    // if ( condition ), for ( ... ), while ( ... ), switch ( ... )
    'space-in-parens': ['off', 'always', { // Disabled - conflicts with selective application
      exceptions: ['empty']
    }],

    // FOAM3 requires space after ! operator: if ( ! found )
    'space-unary-ops': ['off', { // Disabled - would need custom rule for ! only
      words: true,
      nonwords: true
    }],

    // Standard spacing around operators (keep permissive for now)
    'space-infix-ops': 'off',

    // Standard spacing before blocks
    'space-before-blocks': 'off',

    // FOAM3 has specific keyword spacing requirements (spaces inside parens)
    'keyword-spacing': 'off', // Disabled - conflicts with space-in-parens requirement

    // =============================================================================
    // OBJECT AND ARRAY FORMATTING
    // =============================================================================

    // FOAM3 Style Guide: Do not leave trailing unnecessary commas
    'comma-dangle': ['error', 'never'], // Enforce no trailing commas

    // FOAM3 Style Guide: Do not quote map keys unless necessary
    'quote-props': ['error', 'as-needed'], // Only quote when necessary

    // Object and array spacing - keep permissive for now
    'object-curly-spacing': 'off',
    'array-bracket-spacing': 'off',

    // =============================================================================
    // VARIABLE HANDLING
    // =============================================================================

    // Disabled for FOAM3 - framework has its own variable scoping patterns
    'no-unused-vars': 'off', // FOAM3 models may have properties that appear unused
    'no-undef': 'off', // FOAM3 uses global foam namespace and dynamic property access
    'no-redeclare': 'off', // FOAM3 patterns may redeclare in different contexts

    // =============================================================================
    // VERTICAL ALIGNMENT SUPPORT
    // =============================================================================

    // FOAM3 encourages vertical alignment for readability
    // These rules are disabled to allow vertical alignment patterns
    'no-multi-spaces': 'off', // Allow multiple spaces for alignment
    'key-spacing': 'off', // Allow flexible key spacing for alignment

    // =============================================================================
    // CODE QUALITY RULES
    // =============================================================================

    // Critical debugging and development rules
    'no-console': 'off', // Allow console in FOAM3 development
    'no-debugger': 'error', // Prevent debugger statements in production
    'no-alert': 'error', // Prevent alert() usage

    // =============================================================================
    // SEMICOLONS AND SYNTAX
    // =============================================================================

    // Enforce semicolons for code correctness
    'semi': ['error', 'always'],
    'semi-spacing': 'off', // Be permissive about semicolon spacing

    // =============================================================================
    // QUOTES AND STRINGS
    // =============================================================================

    // Be permissive about quote style (FOAM3 mixes single and double quotes)
    'quotes': 'off',

    // =============================================================================
    // CONTROL FLOW AND BRACES
    // =============================================================================

    // FOAM3 Style Guide: One-statement if, while, and for statements that can fit
    // on a single line (less than 80 characters) do NOT NEED braces, but braces are allowed
    // Examples: if ( ! found ) return false;  ✓ (no braces)
    //           if ( ! found ) { return false; }  ✓ (with braces, also fine)
    //           for ( var i = 0 ; i < a.length ; i++ ) a[i] = '';  ✓ (no braces)
    'curly': 'off', // Allow both with and without braces for single-line statements

    // Be permissive about brace style
    'brace-style': 'off',

    // =============================================================================
    // FUNCTION FORMATTING
    // =============================================================================

    // Be permissive about function spacing
    'space-before-function-paren': 'off',

    // =============================================================================
    // COMMA AND VARIABLE DECLARATION RULES
    // =============================================================================

    // Be permissive about comma spacing and style
    'comma-spacing': 'off',
    'comma-style': 'off',

    // Allow multiple variable declarations (var a, b, c;)
    'one-var': 'off',

    // =============================================================================
    // EQUALITY AND COMPARISON
    // =============================================================================

    // FOAM3 uses == and != extensively - disable strict equality checking
    'eqeqeq': 'off', // Allow == and != (FOAM3 pattern)

    // =============================================================================
    // BEST PRACTICES
    // =============================================================================

    // Dot notation - be permissive (FOAM3 uses bracket notation for dynamic props)
    'dot-notation': 'off',

    // FOAM3 may use eval for dynamic code generation
    'no-eval': 'off', // Allow eval in FOAM3 framework code
    'no-implied-eval': 'off',

    // Enforce good practices where they don't conflict with FOAM3
    'no-new-wrappers': 'error', // Prevent new Boolean(), new String(), etc.
    'no-throw-literal': 'error', // Require proper Error objects
    'no-with': 'error', // Prevent with statements
    'no-prototype-builtins': 'off', // FOAM3 may access prototype methods directly

    // =============================================================================
    // ES6+ FEATURES
    // =============================================================================

    // FOAM3 is not strictly ES6+ - allow var and traditional patterns
    'prefer-const': 'off', // Allow var declarations
    'no-var': 'off', // Allow var instead of let/const

    // =============================================================================
    // WHITESPACE AND FORMATTING
    // =============================================================================

    // Allow flexible whitespace for FOAM3's vertical alignment style
    'no-multiple-empty-lines': ['warn', {
      max: 3, // Allow up to 3 consecutive empty lines
      maxEOF: 1,
      maxBOF: 0
    }]
  },

  overrides: [
    {
      // =============================================================================
      // TEST FILES - RELAXED RULES
      // =============================================================================
      // Test files often need different formatting and may use console statements
      files: ['**/*test*.js', '**/*spec*.js', '**/test/**/*.js'],
      rules: {
        'max-len': 'off', // Allow longer lines in tests for readability
        'no-console': 'off', // Allow console statements in tests
        'no-unused-vars': 'off', // Test variables may appear unused
        'comma-dangle': 'off' // Be more relaxed about trailing commas in tests
      }
    }
  ]
}; 