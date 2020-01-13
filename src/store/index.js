import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import tasksReducer from './reducers/tasks'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
      key: 'root',
      storage,
      blacklist: ['setMessage']
}
const persistedReducer = persistReducer(persistConfig, tasksReducer)

const store = createStore(
      persistedReducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // development purposes
);

let persistor = persistStore(store)
export { store, persistor }