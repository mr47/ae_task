import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
// import { Api } from './services/Api'
import rootReducer from './reducers'

// const serverApi = new Api()

export default function configureStore() {
  // const middlewares = [thunk.withExtraArgument(serverApi)]
  // const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)))
  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
  return { store };
}