import { Reducer, combineReducers } from 'redux'

interface DataState {}

export interface State {
  data: DataState
}

const dataReducer: Reducer<DataState> = (state = {}, action) => {
  return state
}

export const reducer: Reducer<State> = combineReducers<State>({
  data: dataReducer,
})
