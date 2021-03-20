import React from "react";
import { fetchAndSetProducts } from "../../store/actions";

interface HeaderState {
	products: any
}

type HeaderProps = {}

class Header extends React.Component<HeaderProps, HeaderState> {
	constructor(props: any) {
		super(props);
		this.state = {
			products: []
		}
	}

	componentDidMount() {
		let products = fetchAndSetProducts();
		console.log(products);
		this.setState({ products: ["1", "2"] });
	}

	render() {
		const products = this.state.products;
		return(
			<div>
				{products.map((el: any) =>
					el
				)}
			<p>header</p>
			</div>
		)
	} 
}

export default Header;