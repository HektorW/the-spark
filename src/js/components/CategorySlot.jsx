
import React, { Component } from 'react';

class CategorySlot extends Component {

	render() {
		return (
			<div className="category-slot">
				<h2 className="category-slot__title">{this.props.categoryName}</h2>
				<div className="category-slot__value">{this.props.categoryValue}</div>
			</div>
		);
	}
}

export default CategorySlot;
