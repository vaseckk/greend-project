import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import type {AppState, AppDispatch} from '../types/state.ts';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
