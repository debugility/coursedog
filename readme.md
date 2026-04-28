# Coursedog QA Automation

## Tech Stack

- Runtime: Node.js `v24.13.0` (pinned in `.nvmrc` / `.node-version` | if you're using NVM locally then node version will auto picked up at runtime in the terminal)
- Package manager: `npm` (project defaults in `.npmrc`)
- Language: TypeScript
- Automation tool: Playwright (`@playwright/test`)

## Setup

1. Install dependencies:
   - `npm install`
2. Install Playwright browsers:
   - `npx playwright install`
3. Configure env:
   - No need for this. This is pushed already.

## Run Tests

- Run all tests:
  - `npm run test` (also generates `allure-report/`)
- Run headed tests:
  - `npm run test:headed` (also generates `allure-report/`)
- Run E2E only:
  - `npm run test:e2e` (also generates `allure-report/`)
- Run regression only:
  - `npm run test:regression` (also generates `allure-report/`)
- Run UI mode:
  - `npm run test:ui`
- Regenerate Allure report from existing results:
  - `npm run allure:generate`
- Open Allure report:
  - `npx allure-commandline open allure-report`

## Project Structure

- `tests/e2e/` - end-to-end user flows (order, file upload)
- `tests/regression/` - regression scenarios (login)
- `pages/` - page objects (`*.pg.ts`)
- `utils/configs/` - Environment and base configs (env, base)
- `utils/wrappers/` - shared Playwright wrapper (`ElementWrapper`)
- `utils/handlers/` - reusable app/session handlers
- `utils/helpers/` - helper utilities (faker, file upload)
- `utils/configs/` - environment and base config helpers
- `fixtures/` - sample files/test data used in tests
