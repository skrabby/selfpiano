export const isRequired = (val: any) => {
	return val ? '' : 'Field cannot be empty';
}