import React from 'react';

import './Sample.scss';

interface SampleProps {
    imgPreviewSrc: any;
}

const Sample: React.FC<SampleProps> = (props) => {
    return (
        <div className='sample'>
            <img src={props.imgPreviewSrc}/>
        </div>
    );
}

export default Sample;