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

// import React from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { RootLayout } from './layouts/RootLayout';
// import { CategoryLayout } from './layouts/CategoryLayout';
// import { SubCategoryLayout } from './layouts/SubCategoryLayout';
// import { TopicLayout } from './layouts/TopicLayout';
// import { TechLayout } from './layouts/TechLayout';
// import { WeatherLayout } from './layouts/WeatherLayout';
// import { WeatherView } from './pages/weather/WeatherView';
// import { CategoryEditView } from './pages/category/CategoryEditView';
// import { SubCategoryEditView } from './pages/subCategory/SubCategoryEditView';
// import { TopicEditView } from './pages/topic/TopicEditView';
// import { TechView } from './pages/tech/TechView';
// import { LoginView } from './pages/auth/LoginView';
// import { SignupView } from './pages/auth/SignupView';
// import { NotFound } from './pages/base/NotFound';
// import { SummaryPage } from './pages/ai-summary/SummaryPage';
// import { ImageEditPage } from './pages/ai-image-edit/ImageEditPage';
// import { ImageGenPage } from './pages/ai-image-generator/ImageGenPage';
// import { RecipePage } from './pages/ai-recipe/RecipePage';
// import { WeatherChatPage } from './pages/ai-weather/WeatherChatPage';
// import { TextGenPage } from './pages/ai-text-generator/TextGenPage';
// import { FileChatPage } from './pages/ai-file-chat/FileChatPage';

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<RootLayout />}>
//           <Route index element={<Navigate to="/weather/dallas" />} />
//           <Route path="weather" element={<WeatherLayout />}>
//             <Route path=":city" element={<WeatherView />} />
//           </Route>
//           <Route path="tech" element={<TechLayout />}>
//             <Route path=":abbr" element={<TechView />} />
//           </Route>
//           <Route path="category" element={<CategoryLayout />}>
//             <Route path=":categoryId" element={<CategoryEditView />} />
//           </Route>
//           <Route path="subCategory" element={<SubCategoryLayout />}>
//             <Route path=":subCategoryId" element={<SubCategoryEditView />} />
//           </Route>
//           <Route path="topic" element={<TopicLayout />}>
//             <Route path=":topicId/:categoryId" element={<TopicEditView />} />
//           </Route>
//           <Route path="login" element={<LoginView />} />
//           <Route path="signup" element={<SignupView />} />
//           <Route path="ai-summary" element={<SummaryPage />} />
//           <Route path="ai-image-generator" element={<ImageGenPage />} />
//           <Route path="ai-text-generator" element={<TextGenPage />} />
//           <Route path="ai-image-edit" element={<ImageEditPage />} />
//           <Route path="ai-recipe" element={<RecipePage />} />
//           <Route path="ai-weather" element={<WeatherChatPage />} />
//           <Route path="ai-chat" element={<FileChatPage />} />
//           <Route path="*" element={<NotFound />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }
