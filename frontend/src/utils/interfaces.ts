export interface Rule {
	rule: (args: RuleArgs) => any;
	args: RuleArgs;
}

export interface RuleArgs {
	value: string;
	maxLength?: number;
	minLength?: number;
}