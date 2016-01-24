
import { randRangeInt } from '../utils/Random';


export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES';
export const REQUEST_CATEGORIES_RESPONSE = 'REQUEST_CATEGORIES_RESPONSE';
export const REQUEST_CATEGORIES_ERROR = 'REQUEST_CATEGORIES_ERROR';

export const SELECT_CATEGORY_ITEM = 'SELECT_CATEGORY_ITEM';



//
// Selecting items
//
export function selectCategoryItem(category, index) {
	return {
		type: SELECT_CATEGORY_ITEM,
		category,
		index
	};
}

export function randomizeCategoryItem(category) {
	
	return (dispatch, getState) => {
		var state = getState();
		var categoryState = state.categories[category];

		return dispatch(
			selectCategoryItem(category, randRangeInt(0, categoryState.items.length))
		);
	};
}



//
// Fetching categories
//
export function fetchCategories() {

	return dispatch => {
		dispatch(requestCategories());

		return fetch('data/categories.json')
			.then(response => response.json())
			.then(json => dispatch(receiveCategories(json)))
			.catch(error => dispatch(requestCategoriesError(error)));
	};
}

function requestCategories() {
	return {
		type: REQUEST_CATEGORIES
	};
}

function receiveCategories(json) {
	return {
		type: REQUEST_CATEGORIES_RESPONSE,
		categories: json
	};
}

function requestCategoriesError(error) {
	return {
		type: REQUEST_CATEGORIES_ERROR,
		error
	};
}
