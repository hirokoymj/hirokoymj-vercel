# CI pipeline

## Workflow file

- [test.yml](.github/workflows/test.yml)

## Triggers

- Push to `main`
- Pull request targeting `main`

## Output

- GitHub Actions: https://github.com/hirokoymj/hirokoymj-vercel/actions/runs/26174695142
- GitHub Actions -> Artifacts -> test-coverage-report
- Coverage output directory: `coverage/`

## `npm ci`

- `npm ci` is a built-in npm command
- The CI pipeline installs exact dependencies with `npm ci`, then runs all unit tests and generates a coverage report with `npm run test:coverage`.
- Runs on: `ubuntu-latest`, Node.js 22

```bash
npm ci
npm run test:coverage
```
