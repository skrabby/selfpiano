import * as React from 'react';
import * as Components from '../../components';
import {BaseSyntheticEvent} from "react";

interface IFormProps extends React.ButtonHTMLAttributes<HTMLButtonElement>  {
    onSubmit?: (e: any) => any;
    children: React.ReactNode;
}

interface IFormState {

}

export default class Form extends React.Component<IFormProps, IFormState> {
    onFormSubmit = (e: BaseSyntheticEvent) => {
        e.preventDefault();
        this.props.onSubmit && this.props.onSubmit(e);
    }

    render() {
        const {
            children
        } = this.props;

        return (
            <form onSubmit={this.onFormSubmit}>
                { children }
            </form>
        );
    }
}