# React.js application Architecture

### 1. State Management

- Lifting state up - Parent manages state.
- Inverse data flow — Child updates Parent's state via a callback props.
- Parent name convention - xxxManager or xxxLayout. [CategoryLayout.tsx](./src/layouts/CategoryLayout.tsx)
- Custom Hooks - complex logic is moved to the outside of Parent componet - e.g. submitForm)
  - [useCategoryForm.ts](./src/hooks/useCategoryForm.ts)
  - [CategoryForm.tsx](./src/pages/category/CategoryForm.tsx)

### 2. Props Management

- Context API / Redux (avoid Prop drilling)
- useCallback + React.memo (Caching)
- useCallback - returns a stable function reference
- React.memo ==> shallow comparison

### 3. Fetch data

- Use GraphQL - a single endpoint
- Use third-party tool (React Query) - build-in cache mechanizme.
- Manual fetch - useEffect + aync Fech API + new AbortController() in cleanup function.

```
const { data, loading, error } = useQuery(GraphQL, options);
const [mutateFunction, { data, loading, error }] = useMutation(GraphQL, options);
useEffect(() => {}, [])
```

### 4. Performance

- useMemo, useCallback, React.memo (cached value, stable function reference, shallow ccomparison)
- useEffect dependency

### 5. ErrorBoundary & React.lazy - Route-base

- Try catch for React components

### 6. UI, Responsive Design

- MUI Grid System is first choice because of JSX cleanliness, Tailwind CSS is the second choice but I don't like long inline css styel in JSX..

### 7. Reusable components

- Use children as props ==> children is a placeholder.

### 8. Form

- React Hook Form + Yup (schema-base validation) + MUI

#### Sample

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
