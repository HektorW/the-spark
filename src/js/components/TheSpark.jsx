
import React, { Component } from 'react';

import CategorySlot from './CategorySlot.jsx';

class TheSpark extends Component {

	constructor() {
		super();

		this.state = {
			categories: []
		};
	}

	render() {
		return (
			<div className="the-spark">
				<h1 className="the-spark__title">The Spark</h1>

				<div className="the-spark__slots">
					{this.state.categories.map(category => {
						return (
							<CategorySlot
								categoryName={category.name}
								categoryValue={category.selectedValue}
							/>
						);
					})}
				</div>
			</div>
		);
	}
}

export default TheSpark;
