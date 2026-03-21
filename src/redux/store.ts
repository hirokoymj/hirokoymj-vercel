import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter/counterSlice';
import todoReducer from './todo/todoSlice';
import themeReducer from './theme/themeSlice';
import techTabReducer from './techTab/techTabSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todoReducer,
    theme: themeReducer,
    tab: techTabReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
