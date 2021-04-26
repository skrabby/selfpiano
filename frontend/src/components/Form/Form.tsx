import * as React from 'react';
import * as Components from '../../components';

interface IFormProps extends React.ButtonHTMLAttributes<HTMLButtonElement>  {
    inputsToRender: Components.Input[];
    button: Components.Button;
    onFormSubmit: (e: any) => any;
}

interface IFormState {
}

export default class Form extends React.Component<IFormProps, IFormState> {

    render() {
        const {
            onFormSubmit,
            inputsToRender,
            button,
        } = this.props;

        return (
            <form onSubmit={onFormSubmit}>
                { inputsToRender }
                { button }
            </form>
        );
    }
}