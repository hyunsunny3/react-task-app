// useSelector
// useDispatch

import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
export const useTypedDispatch = () => useDispatch<AppDispatch>();
