import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
const API_URL = import.meta.env.VITE_BACKEND_APP_API_URL;
export const fetchMissions =
  createAsyncThunk<string[], void, { rejectValue: string }>(
      'pathfinderMission/fetchMissions',
      async (_, thunkAPI) => {
        try {
          const response = await fetch(API_URL + 'missions/');
          const data = await response.json();
          const missions = data.results.map((mission: Mission) =>
            mission);
          return missions;
        } catch (error) {
          return thunkAPI.rejectWithValue('Failed to fetch missions.');
        }
      }
  );
interface Mission {
  title: string;
  technology: string;
  description: string;
}
interface MissionState {
  missions: Mission[];
  loading: boolean;
  error: string | null;
}
const initialState: MissionState = {
  missions: [],
  loading: false,
  error: null,
};
export const missionsSlice = createSlice({
  name: 'missions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(fetchMissions.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchMissions.fulfilled, (state, action) => {
          state.loading = false;
          state.missions = action.payload;
        })
        .addCase(fetchMissions.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Something went wrong';
        });
  },
});
export default missionsSlice.reducer;
