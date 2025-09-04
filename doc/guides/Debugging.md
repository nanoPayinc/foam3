# Debugging Guide

This guide covers debugging techniques for both JavaScript and Java code in the FOAM3 project.

## JavaScript Debugging

### Chrome DevTools

The primary tool for debugging JavaScript code is Chrome DevTools. Here are the key features:

#### Opening DevTools
- Windows/Linux: `Ctrl + Shift + I` or `F12`
- Mac: `Cmd + Option + I`

#### Quick File Navigation
- Use `Cmd + P` (Mac) or `Ctrl + P` (Windows/Linux) to quickly search and open files in the Sources panel
- This is especially useful when working with large codebases

#### Setting Breakpoints
1. Open DevTools and navigate to the Sources tab
2. Find your JavaScript file in the file tree
3. Click on the line number where you want to set a breakpoint
4. Alternatively, add `debugger;` statement in your code
5. If you want to know when an FObject property is being updated, you can add a debugger
statement in a postSet. Ex. { name: 'field', postSet: function(o, n) { debugger; } }
and the debugger will trip when the value is updated. You can also include an 'if' statement
to only trip when certain values or value transitions occur. The variable 'o' contains
the old value of the property and 'n' contains the new value.

#### Console Commands
```javascript
// Debugging async code with breakpoints
// Example with custom async function
someAsyncFunction()
  .then(result => {
    debugger;  // Breakpoint will work here
    return processResult(result);
  })
  .catch(error => {
    debugger;  // Can debug errors
    console.error(error);
  });
```

#### Network Debugging
- Use the Network tab to monitor HTTP requests
- Filter requests by type (XHR, JS, CSS, etc.)
- Inspect request/response headers and bodies
- Analyze timing and performance
- Enable "Disable cache" checkbox in the Network tab to prevent browser from caching JavaScript files
  - This ensures you always get the latest version of your files during development
  - Particularly useful when making changes to JavaScript code

## Java Debugging

### IntelliJ IDEA Remote Debugging

To debug Java code in IntelliJ IDEA:

1. Start the application with debug mode enabled:
```bash
./build.sh -d
```

2. Configure Remote Debugging in IntelliJ:
   - Go to Run → Edit Configurations
   - Click '+' and select 'Remote JVM Debug'
   - Set the following configuration:
     - Name: `FOAM3 Remote Debug`
     - Host: `localhost`
     - Port: `8000`
     - Use module classpath: Select your main module

3. Start the debugger:
   - Click the debug icon or press `Shift + F9`
   - The debugger will connect to your running application

### Setting Breakpoints
1. Click in the gutter (left margin) next to the line number
2. Breakpoint types:
   - Line breakpoint: Regular breakpoint
   - Method breakpoint: Break when method is entered
   - Field breakpoint: Break when field is accessed/modified
   - Exception breakpoint: Break when exception is thrown

### Debug Window Features
- Variables: Inspect current variable values
- Watches: Monitor specific expressions
- Call Stack: View the execution stack
- Breakpoints: Manage all breakpoints
- Console: View application output

## Common Debugging Tips

1. Use conditional breakpoints when you need to break only under specific conditions
2. Utilize the "Evaluate Expression" feature to test code snippets during debugging
3. Use logging strategically to track program flow
4. Remember to remove or disable debug statements before committing code