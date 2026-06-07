# React Architecture

# React.js UI Architecture

- [React Architecture](#react-architecture)
- [React.js UI Architecture](#reactjs-ui-architecture)
  - [1. State Sharing Patterns](#1-state-sharing-patterns)
  - [2. Props Management (Avoid Props Drilling)](#2-props-management-avoid-props-drilling)
  - [3. Memoization \& Render Optimization](#3-memoization--render-optimization)
  - [3. Fetch data](#3-fetch-data)
  - [4. Performance](#4-performance)
  - [5. ErrorBoundary \& React.lazy](#5-errorboundary--reactlazy)
  - [6. UI \& Responsive Design](#6-ui--responsive-design)
  - [7. Reusable components](#7-reusable-components)
  - [8. Form](#8-form)

## 1. State Sharing Patterns

- Unidirectional Data Flow
- Data flows down via props (lifting state up)
- Events flow up via callbacks (inverse data flow)prop.
- Custom Hooks

## 2. Props Management (Avoid Props Drilling)

**Avoid Props Drilling**

- Context API
- Redux

## 3. Memoization & Render Optimization

Hook/API What it memoizes

- `useMemo` : Computed/derived values
- `useCallback` : Function references
- `React.memo` : Component output (skips re-render if props unchanged)

## 3. Fetch data

- Use GraphQL - a single endpoint.
- Use third-party tool (TanStack Query)
- Manual fetch - `useEffect` + `acync Fech API` + `AbortController` + `Cleanup function`. [example](https://github.com/hirokoymj/great-frontend/blob/main/a_Quiz/Quiz_topic_pitfalls.md#q3-memory-leak-on-unmount-%EF%B8%8F)

```js
// Without 3rd party tool -
const [users, setUsers] = useState([]);
const [error, setErrors] = useState(null);
const [loading, setLoading] = useState(false);
// With 3rd party tool - ONE LINE!
const { data, loading, error } = useQuery(GraphQL, options);
```

## 4. Performance

- useMemo, useCallback, React.memo (cached value, a stable function reference, shallow ccomparison)
- useEffect dependency

## 5. ErrorBoundary & React.lazy

- `ErrorBoundary` acts as a try/catch for React components.
- `React.lazy` + `Suspense` splits the bundle per route — each page loads only when the user navigates to it.

## 6. UI & Responsive Design

- [MUI](https://mui.com/) Grid System is the first choice for JSX cleanliness.
- `Tailwind CSS` is the second choice due to long inline class strings in JSX.

## 7. Reusable components

- Use `children` as props ==> children is a placeholder. [Buttons](./src/components/Buttons/ActionButton.tsx)

## 8. Form

- [React Hook Form ](https://react-hook-form.com/)
- [Yup (schema-based validation)](https://github.com/jquense/yup)
