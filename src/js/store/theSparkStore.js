
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';


const createStoreWithMiddleWare = applyMiddleware(
	thunkMiddleware
)(createStore);

export default function configureStore(initialState) {
	const store = createStoreWithMiddleWare(rootReducer, initialState);

	//
	// module.hot
	//

	return store;
}
