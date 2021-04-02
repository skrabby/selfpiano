import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { actions } from "./";

interface StoreProps { 
	fetchProducts: any
}

type PageComponentProps = StoreProps & RouteComponentProps;

const mapDispatchToProps = (dispatch: any) => ({
	fetchProducts: () => dispatch(actions.fetchAndSetProducts())
});

const mapStateToProps = (state: any) => ({

	products: state.reducer.products
})

const wrap = (PageComponent: any) => {
	return connect(mapStateToProps, mapDispatchToProps)(PageComponent);
}

export default wrap;

export type {
	StoreProps,
	PageComponentProps
};

export {
	wrap,
	mapStateToProps,
	mapDispatchToProps
}