import React from "react";
import { Link } from 'react-router-dom';

class Header extends React.Component {
	constructor(props: any) {
		super(props);
	}

	render() {
		return(
			<div>
				<ul>
					<li><Link to='/'>Home</Link></li>
					<li><Link to='/login'>Login</Link></li>
				</ul>
			</div>
		)
	} 
}

export default Header;