import React from 'react';
import com from 'comma-number';

function Stats(props) {

    const data = window.covid_world_timeline;

    let totalCases = 0
    let totalDeaths = 0
    // calculate total cases deaths as of latest info
    const todayData = data[data.length - 1].list
    for (const c of todayData) {
        if (c.confirmed) {
            totalCases += Number(c.confirmed)
        }
        totalDeaths += Number(c.deaths)
    }

    return (
        <div className='stats-container'>
           <snippet className='total-cases'>
                <p id='cases-number'>{com(totalCases)}</p>
                <p className='stats-titles'>CASES</p>
            </snippet>
            <snippet className='total-deaths'>
                <p id='deaths-number'>{com(totalDeaths)}</p>
                <p className='stats-titles'>DEATHS</p>
            </snippet>
        </div>
    );
}

export default Stats;