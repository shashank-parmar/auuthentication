import { configureStore } from '@reduxjs/toolkit';
import studentSlice from '../features/counter/StudentSlice';

const store = configureStore({
  reducer: {
    counter: studentSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store; 
