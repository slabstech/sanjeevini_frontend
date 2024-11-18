import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import {thunk} from 'redux-thunk';
import {combineReducers} from 'redux';
import MissionDataReducer from './reducer/MissionDataReducer';
import UserDataReducer from './reducer/UserDataReducer';


const reducer = combineReducers({
  missionList: MissionDataReducer,
  userDataList: UserDataReducer,
});

export const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware)=>
    getDefaultMiddleware().concat(thunk),
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
