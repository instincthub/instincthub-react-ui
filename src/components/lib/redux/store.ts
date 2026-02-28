/* Core */
import {
  configureStore,
  type EnhancedStore,
  type ConfigureStoreOptions,
  type ThunkAction,
  type Action,
} from '@reduxjs/toolkit'
import type { ThunkDispatch, UnknownAction } from '@reduxjs/toolkit'
import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
  type TypedUseSelectorHook,
} from 'react-redux'

/* Instruments */
import { reducer } from './rootReducer'
import { middleware } from './middleware'

const configreStoreDefaultOptions: ConfigureStoreOptions = { reducer }

export const makeReduxStore = (
  options: ConfigureStoreOptions = configreStoreDefaultOptions
): EnhancedStore => {
  const store = configureStore(options)

  return store
}

export const reduxStore: EnhancedStore = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(middleware)
  },
})

/* Types */
export type ReduxStore = typeof reduxStore
export type ReduxState = ReturnType<typeof reduxStore.getState>
export type ReduxDispatch = ThunkDispatch<ReduxState, unknown, UnknownAction>
export type ReduxThunkAction<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxState,
  unknown,
  Action
>

export const useDispatch = (): ReduxDispatch => useReduxDispatch<ReduxDispatch>()
export const useSelector: TypedUseSelectorHook<ReduxState> = useReduxSelector
