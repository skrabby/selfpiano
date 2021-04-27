import * as Interfaces from './interfaces';
import {BaseSyntheticEvent} from "react";

export const validInputCheck = (e: BaseSyntheticEvent, fields: any): boolean => {
	const formInputs = [ ...e.target.elements].filter((el: any) => el.tagName === 'INPUT');

	for (let formInput of formInputs) {

		if (fields[formInput.name] && fields[formInput.name].rules) {
			// Looping over input rules
			for (let rule of fields[formInput.name].rules) {

				const args = rule.args ? rule.args : {};

				args.value = formInput.value

				if (rule.rule(args).length > 0) {
					return false;
				}
			}
		}
	}
	return true;
}

export const isRequired = (args: Interfaces.IRuleArgs): string => {
	return (!args.value || args.value === '') ? 'Field cannot be empty' : '';
}

export const maxLength = (args: Interfaces.IRuleArgs): string => {
	return (args.value!.length > args.maxLength! ? `Length cannot exceed ${args.maxLength} letters` : '');
}

export const minLength = (args: Interfaces.IRuleArgs): string => {
	return (args.value!.length <= args.minLength! ? `Length should exceed ${args.minLength} letters` : '');
}

export const hasCapLetter = (args: Interfaces.IRuleArgs): string => {
	return (/[A-Z]/.test(args.value!) ? '' : 'Field should contain 1 capital letter')
}

export const hasDigit = (args: Interfaces.IRuleArgs): string => {
	return (/\d/.test(args.value!) ? '' : 'Field should contain 1 digit')
}