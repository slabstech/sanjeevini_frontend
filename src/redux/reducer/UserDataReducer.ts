import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
const API_URL = import.meta.env.VITE_BACKEND_APP_API_URL;
/**  render
   * @return {row}
   *  @param {props} aos
   *  @param {props} los
   */
function getDuration(aos:string, los:string) {
  const aosDate = new Date(aos);
  const losDate = new Date(los);
  const durationDiffSeconds =
    Math.round((losDate.getTime() - aosDate.getTime()) / 1000) || 0;

  // Convert seconds to hh:mm:ss format
  const hours = Math.floor(durationDiffSeconds / 3600);
  const minutes = Math.floor((durationDiffSeconds % 3600) / 60);
  const seconds = durationDiffSeconds % 60;

  const durationDiff = `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return durationDiff;
}
export const fetchUserData =
  createAsyncThunk<string[], {
    page?: number;
    overpass_day_after?: string;
    overpass_day_before?: string;
    norad_id?: number;
  } & { rejectValue: string }, { rejectValue: string }>(
      'pathfinderMission/fetchUserData',
      async (args, thunkAPI) => {
        try {
          let url = API_URL + 'satnogs/?page=';
          if (args.page) {
            url += args.page;
          }
          if (args.overpass_day_after) {
            url += `&overpass_day_after=${args.overpass_day_after}`;
          }
          if (args.overpass_day_before) {
            url += `&overpass_day_before=${args.overpass_day_before}`;
          }
          if (args.norad_id) {
            url += `&norad_id=${args.norad_id}`;
          }
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          const satnogsData = data.results.map((rawSatnogs: any) => ({
            id: rawSatnogs.id,
            overpass_day: rawSatnogs.overpass_day,
            aos: new Date(rawSatnogs.aos).toISOString().slice(11, 19),
            los: new Date(rawSatnogs.los).toISOString().slice(11, 19),
            aos_az: parseFloat(rawSatnogs.aos_az.toFixed(2)),
            los_az: parseFloat(rawSatnogs.los_az.toFixed(2)),
            duration: getDuration(rawSatnogs.aos, rawSatnogs.los),
            // map other properties as needed
          }));
          return satnogsData;
        } catch (error) {
          return thunkAPI.rejectWithValue('Failed to fetch satnogs.');
        }
      }
  );
interface Satnogs {
  id: bigint;
  overpass_day: string;
  aos: string;
  los: string;
  aos_az : string;
  los_az : string;
  duration : string;
}
interface SatnogsState {
  satnogsData: Satnogs[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
}
const initialState: SatnogsState = {
  satnogsData: [],
  loading: false,
  error: null,
  page: 1,
  totalPages: 0,
};
export const satnogsSlice = createSlice({
  name: 'satnogs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(fetchUserData.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchUserData.fulfilled, (state, action) => {
          state.loading = false;
          state.satnogsData.push(...action.payload);
          state.totalPages = action.meta.arg.total_pages;
        })
        .addCase(fetchUserData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Something went wrong';
        });
  },
});
export default satnogsSlice.reducer;
