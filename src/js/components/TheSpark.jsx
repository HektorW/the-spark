
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
				<h1 className="the-spark__title">
					The Spark

					{/*<svg width="32" height="32" viewBox="0 0 32 32">
						<path fill="#ffdc00" d="M32 0l-24 16 6 4-14 12 24-12-6-4z"></path>
					</svg>*/}
				</h1>

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
