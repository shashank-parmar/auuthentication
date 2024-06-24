import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store'; // Update the path based on your actual project structure
import { getAllStudent, studentLogin } from './StudentApi';

// Define the type for a student object
interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  mobile: string;
}

interface StudentState {
  LoggedInUser: Student | null;
  status: 'idle' | 'loading' | 'failed';
  allStudents: Student[];
  selectedProduct: null;
}

const initialState: StudentState = {
  LoggedInUser: null,
  status: 'idle',
  allStudents: [],  
  selectedProduct: null,
};

export const studentLoginAsync = createAsyncThunk(
  'student/login',
  async (student: { email: string; password: string }, thunkAPI) => {
    try {
      const data = await studentLogin(student);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
); 

export const fetchAllStudentsAsync = createAsyncThunk(
  'student/getAll',
  async () => {
    const data = await getAllStudent();
    return data;
  }
);

const studentSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      if (!state.value) {
        state.value = 0;
      }
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(studentLoginAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(studentLoginAsync.fulfilled, (state, action: PayloadAction<Student>) => {
        state.status = 'idle';
        state.LoggedInUser = action.payload;
      })
      .addCase(studentLoginAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchAllStudentsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllStudentsAsync.fulfilled, (state, action: PayloadAction<Student[]>) => {
        state.status = 'idle';
        state.allStudents = action.payload;
      })
      .addCase(fetchAllStudentsAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

// Export actions and reducer
export const { increment } = studentSlice.actions;

// Selectors with proper type annotations
export const selectLoggedInUser = (state: RootState) => state.user.LoggedInUser;
export const selectAllStudents = (state: RootState) => state.user.allStudents;

export default studentSlice.reducer;
