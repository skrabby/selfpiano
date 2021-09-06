import React from "react";
import * as actions from '../../store/actions'
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ImgSlider from "../../components/ImgSlider";
import Sample from "../../components/Sample";
import sampleImg from "../../assets/img/sample-preview-img.jpg"
import followUsImg from "../../assets/img/follow.png";

import './HomePage.scss';
import {Button} from "../../components";

class HomePage extends React.Component<any, any> {
    render() {
        return (
            <div className='wrapper-primary'>
                <Header/>
                <section className='main'>
                    <div className='slider__main'>
                        <ImgSlider/>
                    </div>
                        <div className='samples'>
                            <div className='samples__outer-container'>
                                <h1 className='samples__title'>Popular Sheets</h1>
                                <div className='samples__inner-container'>
                                    <Sample imgPreviewSrc={sampleImg}/>
                                    <Sample imgPreviewSrc={sampleImg}/>
                                    <Sample imgPreviewSrc={sampleImg}/>
                                    <Sample imgPreviewSrc={sampleImg}/>
                                    <Sample imgPreviewSrc={sampleImg}/>
                                    <Sample imgPreviewSrc={sampleImg}/>
                                    <Sample imgPreviewSrc={sampleImg}/>
                                    <Sample imgPreviewSrc={sampleImg}/>
                                </div>
                                <Button className='samples__btn'>VIEW ALL</Button>
                            </div>
                        </div>
                    <div className='samples'>
                        <div className='samples__outer-container'>
                            <h1 className='samples__title'>Free Sheets</h1>
                            <div className='samples__inner-container'>
                                <Sample imgPreviewSrc={sampleImg}/>
                                <Sample imgPreviewSrc={sampleImg}/>
                                <Sample imgPreviewSrc={sampleImg}/>
                                <Sample imgPreviewSrc={sampleImg}/>
                                <Sample imgPreviewSrc={sampleImg}/>
                                <Sample imgPreviewSrc={sampleImg}/>
                                <Sample imgPreviewSrc={sampleImg}/>
                                <Sample imgPreviewSrc={sampleImg}/>
                            </div>
                            <Button className='samples__btn'>VIEW ALL</Button>
                        </div>
                    </div>
                </section>
                <Footer/>
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