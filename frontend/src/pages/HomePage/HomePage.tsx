import React from "react";
import * as actions from '../../store/actions'


import './HomePage.scss';

class HomePage extends React.Component<any, any> {
    render() {
        return (
            <div className="wrapper-primary">
                HomePage
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    isMainLoaderActive: state.loadersReducer.isMainLoaderActive
})

const mapDispatchToProps = (dispatch: any) => ({
    setMainLoaderState: (isActive: boolean = true) => (
        dispatch({
            type: "SET_MAIN_LOADER",
            payload: true
        })
    )
})

export default HomePage;