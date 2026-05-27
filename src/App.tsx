import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import PageLoader from './components/ErrorBoundary/PageLoader';
import ProtectedRoute from './auth0/ProtectedRoute';
import { RootLayout } from './layouts/RootLayout';
import { CategoryLayout } from './layouts/CategoryLayout';
import { SubCategoryLayout } from './layouts/SubCategoryLayout';
import { TopicLayout } from './layouts/TopicLayout';
import { TechLayout } from './layouts/TechLayout';
import { WeatherLayout } from './layouts/WeatherLayout';
import { WeatherView } from './pages/weather/WeatherView';
import { CategoryEditView } from './pages/category/CategoryEditView';
import { SubCategoryEditView } from './pages/subCategory/SubCategoryEditView';
import { TopicEditView } from './pages/topic/TopicEditView';
import { TechView } from './pages/tech/TechView';
import { NotFound } from './pages/base/NotFound';
import { SummaryPage } from './pages/ai-summary/SummaryPage';
import { ImageEditPage } from './pages/ai-image-edit/ImageEditPage';
import { ImageGenPage } from './pages/ai-image-generator/ImageGenPage';
import { RecipePage } from './pages/ai-recipe/RecipePage';
import { WeatherChatPage } from './pages/ai-weather/WeatherChatPage';
import { TextGenPage } from './pages/ai-text-generator/TextGenPage';
import { FileChatPage } from './pages/ai-file-chat/FileChatPage';
//code splitting for authentication pages
const CallbackPage = lazy(() => import('./pages/auth/CallbackPage'));
const SignupPage = lazy(() => import('./pages/auth/SignupPage'));
const DashboardPage = lazy(() => import('./pages/dashboard/DashboardPage'));

export default function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="callback" element={<CallbackPage />} />
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Navigate to="/weather/dallas" />} />
            <Route path="signup" element={<SignupPage />} />
            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
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
  );
}
