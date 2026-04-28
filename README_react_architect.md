# React.js Application Architecture

### 1. State Management

- Lifting state up — Parent manages state.
- Inverse data flow — Child updates Parent's state via a callback prop.
- Parent naming convention — `xxxManager` or `xxxLayout`. [CategoryLayout.tsx](./src/layouts/CategoryLayout.tsx)
- Custom Hooks — complex logic is moved outside of the Parent component (e.g. `submitForm`).
  - [useCategoryForm.ts](./src/hooks/useCategoryForm.ts)
  - [CategoryForm.tsx](./src/pages/category/CategoryForm.tsx)

### 2. Props Management

**Avoid Props Drilling**

- Context API [authContext.tsx](./src/contexts/authContext.tsx)
- Redux [store.ts](./src/redux/store.ts)

**Memory / Caching / Skip a Child Render**

- `useCallback` + `React.memo` (caching — returns a stable function reference)
- `React.memo` — shallow comparison

### 3. Fetch data

- Use GraphQL - a single endpoint
- Use third-party tool (TanStack Query) - built-in cache mechanism.
- Manual fetch - `useEffect` + `acync Fech API` + `AbortController` + `Cleanup function`. [example](https://github.com/hirokoymj/great-frontend/blob/main/a_Quiz/Quiz_topic_pitfalls.md#q3-memory-leak-on-unmount-%EF%B8%8F)
- [Query](./src/queries/Category.ts) | [Mutation](./src/mutations/Category.ts)

### 4. Performance

- useMemo, useCallback, React.memo (cached value, stable function reference, shallow ccomparison)
- useEffect dependency

### 5. ErrorBoundary & React.lazy

- `ErrorBoundary` acts as a try/catch for React components.
- `React.lazy` + `Suspense` splits the bundle per route — each page loads only when the user navigates to it.

### 6. UI & Responsive Design

- [MUI](https://mui.com/) Grid System is the first choice for JSX cleanliness.
- `Tailwind CSS` is the second choice due to long inline class strings in JSX.

### 7. Reusable components

- Use children as props ==> children is a placeholder. [Buttons](./src/components/Buttons/ActionButton.tsx)

### 8. Form

- [React Hook Form ](https://react-hook-form.com/)+ Yup (schema-base validation)
- [Form validation](./src/pages/validation/formValidations.ts)

#### Sample at hirokoymj.com

```js
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';

// ✅ Layouts stay as normal imports — always needed
import { RootLayout } from './layouts/RootLayout';
import { CategoryLayout } from './layouts/CategoryLayout';
import { SubCategoryLayout } from './layouts/SubCategoryLayout';
import { TopicLayout } from './layouts/TopicLayout';
import { TechLayout } from './layouts/TechLayout';
import { WeatherLayout } from './layouts/WeatherLayout';

// ✅ Pages become lazy — only loads when user navigates there
const WeatherView = lazy(() => import('./pages/weather/WeatherView'));
const CategoryEditView = lazy(() => import('./pages/category/CategoryEditView'));
const SubCategoryEditView = lazy(() => import('./pages/subCategory/SubCategoryEditView'));
const TopicEditView = lazy(() => import('./pages/topic/TopicEditView'));
const TechView = lazy(() => import('./pages/tech/TechView'));
const LoginView = lazy(() => import('./pages/auth/LoginView'));
const SignupView = lazy(() => import('./pages/auth/SignupView'));
const NotFound = lazy(() => import('./pages/base/NotFound'));

// ✅ AI pages — heavy components, perfect for lazy loading
const SummaryPage = lazy(() => import('./pages/ai-summary/SummaryPage'));
const ImageEditPage = lazy(() => import('./pages/ai-image-edit/ImageEditPage'));
const ImageGenPage = lazy(() => import('./pages/ai-image-generator/ImageGenPage'));
const RecipePage = lazy(() => import('./pages/ai-recipe/RecipePage'));
const WeatherChatPage = lazy(() => import('./pages/ai-weather/WeatherChatPage'));
const TextGenPage = lazy(() => import('./pages/ai-text-generator/TextGenPage'));
const FileChatPage = lazy(() => import('./pages/ai-file-chat/FileChatPage'));

const PageLoader = () => (
  <div style={{ padding: '40px', textAlign: 'center' }}>
    <p>Loading...</p>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        {' '}
        {/* ← catches any crash in the entire app */}
        <Suspense fallback={<PageLoader />}>
          {' '}
          {/* ← handles lazy loading */}
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<Navigate to="/weather/dallas" />} />
              <Route path="weather" element={<WeatherLayout />}>
                <Route path=":city" element={<WeatherView />} />
              </Route>
              <Route path="tech" element={<TechLayout />}>
                <Route path=":abbr" element={<TechView />} />
              </Route>
              <Route path="category" element={<CategoryLayout />}>
                <Route path=":categoryId" element={<CategoryEditView />} />
              </Route>
              <Route path="subCategory" element={<SubCategoryLayout />}>
                <Route path=":subCategoryId" element={<SubCategoryEditView />} />
              </Route>
              <Route path="topic" element={<TopicLayout />}>
                <Route path=":topicId/:categoryId" element={<TopicEditView />} />
              </Route>
              <Route path="login" element={<LoginView />} />
              <Route path="signup" element={<SignupView />} />
              <Route path="ai-summary" element={<SummaryPage />} />
              <Route path="ai-image-generator" element={<ImageGenPage />} />
              <Route path="ai-text-generator" element={<TextGenPage />} />
              <Route path="ai-image-edit" element={<ImageEditPage />} />
              <Route path="ai-recipe" element={<RecipePage />} />
              <Route path="ai-weather" element={<WeatherChatPage />} />
              <Route path="ai-chat" element={<FileChatPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
```
