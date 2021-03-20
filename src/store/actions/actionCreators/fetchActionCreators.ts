import * as Interfaces from "../../interfaces";
import * as Constants from "../../constants";

export const setProducts = (products: any): Interfaces.IAction => ({
	type: Constants.SET_PRODUCTS,
	payload: products
});