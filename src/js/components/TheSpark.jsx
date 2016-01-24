
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchCategories, randomizeCategoryItem } from '../actions';
import autobind from 'autobind-decorator';

import CategorySlot from './CategorySlot.jsx';


const propTypes = {
	categories: PropTypes.object.isRequired,
	request: PropTypes.object.isRequired,
	dispatch: PropTypes.func.isRequired
};


class TheSpark extends Component {

	constructor(props) {
		super(props);

		props.dispatch(fetchCategories());
	}

	@autobind
	onSparkClick() {
		const { categories, dispatch } = this.props;
		Object.keys(categories).forEach(categoryName => dispatch(randomizeCategoryItem(categoryName)));
	}

	render() {
		const { categories } = this.props;
		const categoriesArray = Object.keys(categories).map(categoryName => {
			const category = categories[categoryName];
			return {
				name: categoryName,
				selectedValue: category.items[category.selectedItemIndex]
			};
		});

		return (
			<div className="the-spark">
				<h1 className="the-spark__title">
					The Spark
					<svg className="the-spark__lightning" width="32" height="32" viewBox="0 0 32 32">
						<path d="M32 0l-24 16 6 4-14 12 24-12-6-4z"></path>
					</svg>
				</h1>

				<div className="the-spark__slots">
					{categoriesArray.map(category => {
						return (
							<CategorySlot
								key={category.name}
								categoryName={category.name}
								categoryValue={category.selectedValue}
							/>
						);
					})}
				</div>

				<a className="the-spark__btn" onClick={this.onSparkClick}>
					<svg className="the-spark__btn-svg">
						<rect
							className="the-spark__btn-svg-rect"
							x="0"
							y="0"
							height="100%"
							width="100%"
						/>
					</svg>
					Spark!
				</a>
			</div>
		);
	}
}

TheSpark.propTypes = propTypes;

export default connect(state => state)(TheSpark);
