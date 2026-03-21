//import 'immer';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface PageTheme {
  name: string;
}

const initialState: PageTheme = { name: 'default' };

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const { setThemeName } = themeSlice.actions;
export default themeSlice.reducer;
