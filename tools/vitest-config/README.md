# Vitest Testing Documentation

This guide explains how to add tests to your Turborepo project using Vitest.

## Table of Contents

1. [Overview](#overview)
2. [Adding Tests to an Existing Package](#adding-tests-to-an-existing-package)
3. [Creating Tests for a New Package](#creating-tests-for-a-new-package)
4. [Writing Different Types of Tests](#writing-different-types-of-tests)
5. [Running Tests](#running-tests)
6. [Coverage Reports](#coverage-reports)
7. [Troubleshooting](#troubleshooting)

## Overview

This project uses Vitest for testing with the following setup:

- A shared configuration package in `tools/vitest-config`
- Test configurations for different types of packages (UI, API, etc.)
- Coverage reporting with Istanbul

## Adding Tests to an Existing Package

To add tests to an existing package:

1. **Add Vitest dependencies to the package**:

```json
"devDependencies": {
  "@repo/tools-vitest-config": "workspace:*",
  "@vitest/coverage-istanbul": "^3.0.7",
  "vitest": "^3.0.7"
}
```

2. **Add test scripts to package.json**:

```json
"scripts": {
  "test": "vitest run",
  "test:watch": "vitest --watch"
}
```

3. **Create a vitest.config.ts file**:

For a regular package:
```typescript
import { baseConfig } from "@repo/tools-vitest-config/base";

export default baseConfig;
```

For a UI package:
```typescript
import { uiConfig } from "@repo/tools-vitest-config/ui";

export default uiConfig;
```

4. **Create a tests directory**:

```bash
mkdir -p packages/your-package/tests
```

5. **Write your tests**:

```typescript
// packages/your-package/tests/example.test.ts
import { describe, expect, it } from 'vitest';

describe('Example Test', () => {
  it('should pass a simple test', () => {
    expect(1 + 1).toBe(2);
  });
});
```

## Creating Tests for a New Package

When creating a new package that needs tests:

1. **Set up the package structure**:

```bash
mkdir -p packages/new-package/src packages/new-package/tests
```

2. **Create package.json with test scripts**:

```json
{
  "name": "@repo/new-package",
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "build": "tsc",
    "test": "vitest run",
    "test:watch": "vitest --watch"
  },
  "devDependencies": {
    "@repo/tools-vitest-config": "workspace:*",
    "@vitest/coverage-istanbul": "^3.0.7",
    "vitest": "^3.0.7"
  }
}
```

3. **Create vitest.config.ts**:

```typescript
import { baseConfig } from "@repo/tools-vitest-config/base";

export default baseConfig;
```

4. **Write your tests in the tests directory**

## Writing Different Types of Tests

### Unit Tests

Basic unit tests for functions or classes:

```typescript
// packages/your-package/tests/utils.test.ts
import { describe, expect, it } from 'vitest';
import { add } from '../src/utils';

describe('Utils', () => {
  it('should add two numbers correctly', () => {
    expect(add(1, 2)).toBe(3);
  });
});
```

### UI Component Tests

For UI components, use the UI config and testing-library:

```typescript
// packages/ui/tests/button.test.tsx
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Button } from '../src/components/button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeDefined();
    expect(screen.getByText('Click me')).toBeDefined();
  });
});
```

### API Tests

For API endpoints or services:

```typescript
// packages/api/tests/service.test.ts
import { describe, expect, it, vi } from 'vitest';
import { fetchData } from '../src/services';

// Mock external dependencies
vi.mock('../src/client', () => ({
  client: {
    get: vi.fn().mockResolvedValue({ data: { result: 'success' } })
  }
}));

describe('API Service', () => {
  it('fetches data correctly', async () => {
    const result = await fetchData();
    expect(result).toEqual({ result: 'success' });
  });
});
```

## Running Tests

### Running Tests for All Packages

```bash
pnpm test
```

### Running Tests for a Specific Package

```bash
pnpm --filter @repo/your-package test
```

### Running Tests in Watch Mode

```bash
pnpm test:watch
# Or for a specific package
pnpm --filter @repo/your-package test:watch
```

## Coverage Reports

The project is configured to generate and collect coverage reports.

### Generating Coverage Reports

1. Run tests to generate individual coverage reports:
```bash
pnpm test
```

2. Collect coverage reports from all packages:
```bash
pnpm collect-coverage
```

3. Merge the coverage reports:
```bash
pnpm merge-coverage
```

4. Generate an HTML report:
```bash
pnpm report
```

5. View the report (this will attempt to open in a browser):
```bash
pnpm view-report
```

The HTML report will be available at `tools/vitest-config/coverage/report/index.html`.

## Troubleshooting

### Tests Not Finding Modules

If your tests can't find modules, check:

1. The import paths in your tests
2. That the module is listed in the package's dependencies
3. That the module is built before running tests

### React Tests Failing with "React is not defined"

For React component tests, make sure to:

1. Import React explicitly:
```typescript
import React from 'react';
```

2. Use the UI config in your vitest.config.ts:
```typescript
import { uiConfig } from "@repo/tools-vitest-config/ui";
export default uiConfig;
```

3. Have the necessary testing libraries:
```json
"devDependencies": {
  "@testing-library/react": "^14.2.1",
  "jsdom": "^26.0.0"
}
```

### Coverage Reports Not Generating

If coverage reports aren't generating:

1. Make sure the Istanbul provider is configured:
```typescript
// in your vitest.config.ts
test: {
  coverage: {
    provider: "istanbul",
    reporter: [["json", { file: `../coverage.json` }]],
    enabled: true,
  },
}
```

2. Check that the coverage directory exists:
```bash
mkdir -p tools/vitest-config/coverage/raw tools/vitest-config/coverage/merged
```

3. Run the collect, merge, and report commands in sequence.
