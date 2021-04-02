import { Dispatch } from "redux";
import * as FetchActions from "./fetchActions";
import { fetchActionCreators as ActionCreators}  from "./actionCreators";

// Logging errors
const wrapLogger = (f: any) => (...args: any[]) => f(...args).catch(console.log); 

export const fetchAndSetProducts = () => wrapLogger(async (dispatch: Dispatch) => {
	const products: any = await FetchActions.fetchProducts();
	dispatch(ActionCreators.setProducts(products));
});