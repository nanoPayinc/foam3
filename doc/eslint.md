# ESLint Configuration Guide for FOAM3

This document explains how to use the ESLint configuration in the FOAM3 project, which has been specifically tailored to align with the FOAM3 Style Guide while being practical for the existing codebase.

## Quick Start

### Running ESLint

The project includes several npm scripts for linting:

```bash
# Lint all source and tools files
npm run lint

# Automatically fix fixable issues
npm run lint:fix

# Check for any warnings (fails if warnings found)
npm run lint:check
```

### Manual ESLint Commands

You can also run ESLint directly:

```bash
# Lint specific files
npx eslint src/foam/core/Model.js

# Lint with auto-fix
npx eslint src/ --fix

# Lint specific directories
npx eslint src/foam/core/ tools/

# Check a single file with detailed output
npx eslint --format=stylish src/foam/core/Model.js
```

### Build ESLint Support
FOAM's build also supports running ESLing:
```bash
# Run check on default src/ directory:
./build.sh -TESLint

# see ussage with
./build.sh -TESLint --usage
```

## Configuration Overview

The ESLint configuration (`.eslintrc.js`) is designed around the FOAM3 Style Guide requirements:

### Key FOAM3 Style Requirements Enforced

1. **Line Length**: 80 characters (with exceptions for embedded data)
2. **No Trailing Commas**: Enforced as `error`
3. **Object Key Quoting**: Only when necessary (`as-needed`)
4. **Semicolons**: Required for all statements
5. **Single-line Control Flow**: Braces optional for single statements under 80 characters (FOAM3 flexibility)
6. **Equality Operators**: `==` and `!=` allowed (FOAM3 pattern)

### Currently Disabled Rules (Ready for Future Enablement)

Many style rules are currently disabled due to codebase inconsistency but are documented for future use:

- **Indentation**: 2-space indentation configured but disabled
- **Spacing Rules**: FOAM3-specific spacing patterns documented but not enforced
- **Variable Rules**: Disabled due to FOAM3's dynamic patterns

## Rule Categories

The configuration is organized into clear categories:

### 1. Indentation and Spacing
- `indent`: Configured for 2 spaces (currently `off`)
- Ready to enable when codebase is consistent

### 2. Line Length
- `max-len`: Set to 80 characters with appropriate exceptions
- Ignores URLs, strings, templates (for embedded data)

### 3. FOAM3 Specific Spacing
- Rules for spaces inside parentheses: `if ( condition )`
- Space after `!` operator: `if ( ! found )`
- Currently disabled - would need custom implementation

### 4. Object and Array Formatting
- `comma-dangle`: **ENABLED** - prevents trailing commas
- `quote-props`: **ENABLED** - only quote keys when necessary

### 5. Variable Handling
- Most variable rules disabled for FOAM3's dynamic patterns
- `no-unused-vars`, `no-undef`, `no-redeclare` all `off`

### 6. Vertical Alignment Support
- `no-multi-spaces` and `key-spacing` disabled
- Allows FOAM3's encouraged vertical alignment patterns

### 7. Code Quality Rules
- `no-debugger`: **ENABLED** - prevents debugger statements
- `no-alert`: **ENABLED** - prevents alert() usage
- `no-console`: Allowed in FOAM3

### 8. Best Practices
- `eqeqeq`: Disabled (FOAM3 uses `==` and `!=`)
- `no-eval`: Allowed (FOAM3 may use eval)
- Critical error prevention enabled

## Working with the Configuration

### Enabling Rules Gradually

To enable a currently disabled rule:

1. **Find the rule** in `.eslintrc.js`
2. **Change from `'off'`** to `'warn'` or `'error'`
3. **Test on a subset** of files first
4. **Fix issues** before applying project-wide

Example:
```javascript
// Currently:
'indent': ['off', 2, { ... }],

// To enable as warning:
'indent': ['warn', 2, { ... }],

// To enforce strictly:
'indent': ['error', 2, { ... }],
```

### Adding Custom Rules

For FOAM3-specific patterns that need custom rules:

```javascript
rules: {
  // Add new rules here
  'your-custom-rule': 'error',
  
  // Or override existing rules
  'existing-rule': ['error', { customOption: true }]
}
```

### File-Specific Overrides

The configuration includes special handling for test files. You can add more overrides:

```javascript
overrides: [
  {
    files: ['src/foam/legacy/**/*.js'],
    rules: {
      // More permissive rules for legacy code
      'max-len': 'off',
      'comma-dangle': 'off'
    }
  }
]
```

## Integration with Development Workflow

### VS Code Integration

If using VS Code, install the ESLint extension:

1. Install the "ESLint" extension
2. ESLint will automatically use the project's `.eslintrc.js`
3. Enable auto-fix on save in VS Code settings:

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### Pre-commit Hooks

Consider adding ESLint to pre-commit hooks:

```bash
# In package.json scripts:
"precommit": "npm run lint:check"
```

### CI/CD Integration

Add linting to your build process:

```bash
# In CI pipeline
npm install
npm run lint:check  # Fails build if any warnings/errors
```

## Common FOAM3 Patterns and ESLint

### Vertical Alignment (Allowed)

```javascript
// This is encouraged and allowed:
var firstName = 'John';
var lastName  = 'Smith';
var age       = 42;
```

### Single-line Control Flow (Flexible)

```javascript
// Both styles are allowed for single statements under 80 characters:

// Without braces (FOAM3 style guide example):
if ( ! found ) return false;
for ( var i = 0 ; i < a.length ; i++ ) a[i] = '';
while ( processing ) doWork();

// With braces (also acceptable):
if ( ! found ) { return false; }
for ( var i = 0 ; i < a.length ; i++ ) { a[i] = ''; }
while ( processing ) { doWork(); }

// Multi-line statements can use either style:
if ( condition ) {
  doSomething();
  doSomethingElse();
}
```

### FOAM3 Model Patterns (Allowed)

```javascript
// Dynamic property access patterns are allowed:
foam.CLASS({
  name: 'MyModel',
  properties: [
    'prop1',  // No trailing comma (enforced)
    'prop2'
  ]
});
```

### Object Key Quoting (Enforced)

```javascript
// Correct (enforced):
var obj = {
  normalKey: 'value',
  'special-key': 'value'  // Quotes only when necessary
};

// Will be flagged:
var obj = {
  'normalKey': 'value'  // Unnecessary quotes
};
```

## Troubleshooting

### Common Issues

1. **Line too long**: Break long lines or use the embedded data exceptions
2. **Trailing comma**: Remove trailing commas from objects and arrays
3. **Unnecessary quotes**: Remove quotes from object keys unless required
4. **Missing semicolon**: Add semicolons to all statements
5. **Brace style**: Both with and without braces are fine for single-line statements

### Disabling Rules Temporarily

For specific lines:
```javascript
// eslint-disable-next-line rule-name
problematicCode();
```

For entire files:
```javascript
/* eslint-disable rule-name */
// File content
/* eslint-enable rule-name */
```

### Getting Help

- Check the rule documentation: [ESLint Rules](https://eslint.org/docs/rules/)
- Review the FOAM3 Style Guide: `doc/guides/StyleGuide.md`
- Use `eslint --print-config file.js` to see effective configuration

## Migration Strategy

### Phase 1: Current State
- Basic rules enabled (trailing commas, semicolons, object keys)
- Most style rules disabled for compatibility

### Phase 2: Gradual Enablement
- Enable indentation rules section by section
- Add spacing rules with custom implementations
- Increase line length enforcement

### Phase 3: Full Compliance
- All FOAM3 style guide rules enforced
- Custom rules for FOAM3-specific patterns
- Automated fixing where possible

## Contributing

When modifying the ESLint configuration:

1. **Update this documentation** to reflect changes
2. **Test changes** on various parts of the codebase
3. **Consider backward compatibility** with existing code
4. **Add clear comments** in `.eslintrc.js` explaining the reasoning

Remember: The goal is to gradually improve code quality while respecting FOAM3's unique patterns and existing codebase.
