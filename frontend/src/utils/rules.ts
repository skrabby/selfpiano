import * as Interfaces from './interfaces';

export const isRequired = (args: Interfaces.RuleArgs) => {
	return (!args.value || args.value === '') ? 'Field cannot be empty' : '';
}

export const maxLength = (args: Interfaces.RuleArgs) => {
	return (args.value.length > args.maxLength! ? `Length cannot exceed ${args.maxLength}` : '');
}

export const minLength = (args: Interfaces.RuleArgs) => {
	return (args.value.length <= args.minLength! ? `Length should exceed ${args.minLength}` : '');
}