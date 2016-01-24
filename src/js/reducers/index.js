
import { combineReducers } from 'redux';
import {
	REQUEST_CATEGORIES,
	REQUEST_CATEGORIES_RESPONSE,
	REQUEST_CATEGORIES_ERROR,
	SELECT_CATEGORY_ITEM
} from '../actions';


/**
 * state = {
 * 	categories: {
 * 		technology: {
 * 			selectedItemIndex: 0,
 * 			items: ["Bluetooth", "NFC"]
 * 		}
 * 	},
 * 	request: {
 * 		isFetching: false,
 * 		error: null
 * 	}
 * }
 */

/**
 * //
 * // Alternate design
 * //
 * state = {
 * 	categories: [{
 * 		name: "technology",
 * 		selectedItemIndex: 0,
 * 		items: ["Bluetooth", "NFC"]
 * 	}],
 * 	request: {
 * 		isFetching: false,
 * 		error: null
 * 	}
 * }
 */


function category(state = {
	selectedItemIndex: -1,
	items: []
}, action) {

	switch (action.type) {
		case REQUEST_CATEGORIES_RESPONSE:
			return Object.assign({}, state, {
				items: action.items,
				selectedItemIndex: action.items.length ? 0 : -1
			});

		case SELECT_CATEGORY_ITEM:
			return Object.assign({}, state, {
				selectedItemIndex: action.index
			});

		default:
			return state;
	}
}


function categories(state = {}, action) {

	switch (action.type) {

		case REQUEST_CATEGORIES_RESPONSE:
			const newState = {};
			for (const categoryName in action.categories) {
				const items = action.categories[categoryName];

				newState[categoryName] = category(state[categoryName], Object.assign({}, action, {
					items
				}));
			}

			return Object.assign({}, state, newState);

		case SELECT_CATEGORY_ITEM:
			return Object.assign({}, state, {
				[action.category]: category(state[action.category], action)
			});

		default:
			return state;
	}
}


function request(state = {
	isFetching: false,
	error: null
}, action) {

	switch (action.type) {
		case REQUEST_CATEGORIES:
			return Object.assign({}, state, {
				isFetching: true
			});

		case REQUEST_CATEGORIES_RESPONSE:
			return Object.assign({}, state, {
				isFetching: false,
				error: null
			});

		case REQUEST_CATEGORIES_ERROR:
			return Object.assign({}, state, {
				isFetching: false,
				error: action.error
			});

		default:
			return state;
	}
}

const rootReducer = combineReducers({
	categories,
	request
});

export default rootReducer;
