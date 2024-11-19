import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import {combineReducers} from 'redux';
import UserDataReducer from './reducer/UserDataReducer';
import DoctorDataReducer from './reducer/DoctorDataReducer';


const reducer = combineReducers({
  userDataList: UserDataReducer, 
  doctorDataList: DoctorDataReducer
});

export const store = configureStore({
  reducer: reducer,
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
