import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface TabStage {
  value: number;
}
const initialState: TabStage = {
  value: 0,
};
export const techTabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
    resetActiveTab: (state) => {
      state.value = 0;
    },
  },
});

export const { setActiveTab, resetActiveTab } = techTabSlice.actions;
export default techTabSlice.reducer;
