import React from 'react';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { easeQuadInOut } from "d3-ease";
import AnimatedProgressProvider from "../utils/Progress";



function Loader(props) {
    const { loading } = props;
    
    return (
        <div className='circular-loader' style={{
            display: loading ? 'flex': 'none',
            height: '100vh',
            transition: 0.8 ,
        }}>
            <AnimatedProgressProvider
            valueStart={0}
            valueEnd={100}
            duration={1}
            easingFunction={easeQuadInOut}
            repeat
            >
                {value => {
                    const roundedValue = Math.round(value);
                    return (
                        <CircularProgressbar
                        value={value}
                        text={`${roundedValue}%`}
                        
                        /* This is important to include, because if you're fully managing the
                        animation yourself, you'll want to disable the CSS animation. */
                        styles={buildStyles({ pathTransition: "none", trailColor: '#ffffff', pathColor: '#d18254',
                        backgroundColor: '#d18254', textColor: '#d18254'})}
                        />
                    );
                }}
            </AnimatedProgressProvider>
        </div>

    );
}

export default Loader;