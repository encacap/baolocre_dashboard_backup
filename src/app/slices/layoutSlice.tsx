import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BreadcrumbType } from '../types/common';

interface LayoutStateType {
  breadcrumbs: BreadcrumbType[];
}

const initialState: LayoutStateType = {
  breadcrumbs: [],
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setBreadcrumbs: (state, action: PayloadAction<BreadcrumbType[]>) => {
      state.breadcrumbs = action.payload;
    },
  },
});

const { actions, reducer: layoutReducer } = layoutSlice;

export const { setBreadcrumbs } = actions;

export default layoutReducer;
