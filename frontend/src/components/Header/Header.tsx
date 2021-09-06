import React from "react";
import { Link } from 'react-router-dom';

import './Header.scss';

class Header extends React.Component {
	constructor(props: any) {
		super(props);
	}

	render() {
		return(
			<header>
				<div className='header__msg'>
					The website is working in trial mode. Every single piece is absolutely FREE. Take your chance!
				</div>
				<nav className='header__nav'>
					<div className='header__container'>
						<div/>
						<div>Selfpiano</div>
						<div>
							<ul>
								<li><Link to='/login'><span className='icon__sm icon-profile'/></Link></li>
								<li><span className='icon__sm icon-search'/></li>
								<li><Link to='/'><span className='icon__sm icon-shopping-bag'/></Link></li>
							</ul>
						</div>
					</div>
				</nav>
			</header>
		)
	} 
}

export default Header;