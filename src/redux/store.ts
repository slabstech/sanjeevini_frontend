import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import {combineReducers} from 'redux';
import UserDataReducer from './reducer/UserDataReducer';


const reducer = combineReducers({
  userDataList: UserDataReducer,
});

export const store = configureStore({
  reducer: reducer,
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
