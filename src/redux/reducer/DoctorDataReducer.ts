import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

const API_URL = import.meta.env.VITE_SANJEEVINI_BACKEND_APP_API_URL;

export const fetchDoctorAppData = createAsyncThunk<
Doctor[], 
  {
    page?: number;
    appointment_day_after?: string;
    appointment_day_before?: string;
    user_id?: number;
  } & { rejectValue: string }, { rejectValue: string }>(
      'pathfinderMission/fetchDoctorAppData',
      async (args:any, thunkAPI:any) => {
        try {
          let url = API_URL + 'user/?page=';
          if (args.page) {
            url += args.page;
          }
          if (args.appointment_day_after) {
            url += `&appointment_day_after=${args.appointment_day_after}`;
          }
          if (args.appointment_day_before) {
            url += `&appointment_day_before=${args.appointment_day_before}`;
          }
          if (args.norad_id) {
            url += `&user_id=${args.user_id}`;
          }
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          const userData = data.results.map((rawDoctor: any) => ({
            id: rawDoctor.id,
            appointment_day: rawDoctor.appointment_day,
            appointment_time: new Date(rawDoctor.appointment_time).toISOString().slice(11, 19),

            // map other properties as needed
          }));
          return userData;
        } catch (error) {
          return thunkAPI.rejectWithValue('Failed to fetch user.');
        }
      }
  );
interface Doctor {
  id: bigint;
  appointment_day: string;
  appointment_time: string;
  doctor_name: string;
  status: string;
  observations: string;
}
interface DoctorState {
  userData: Doctor[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
}
const initialState: DoctorState = {
  userData: [],
  loading: false,
  error: null,
  page: 1,
  totalPages: 0,
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder:any) => {
    builder
        .addCase(fetchDoctorAppData.pending, (state:any) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchDoctorAppData.fulfilled, (state:any, action:PayloadAction<Doctor[]>) => {
          state.loading = false;
          state.userData.push(...action.payload);
          //state.totalPages = action.meta.arg.total_pages;
        })
        .addCase(fetchDoctorAppData.rejected, (state:any, action:any) => {
          state.loading = false;
          state.error = action.error.message || 'Something went wrong';
        });
  },
});
export default userSlice.reducer;
