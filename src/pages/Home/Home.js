import React from  'react';
import Dashboard from './Dashboard';
import './Home.css';
import Header from '../../Header/Header';
import MonthPromotion from '../Home/month-promotion';
 
function Home(){

    return (
        <div className="content-home">
            <Header />
            <div className='dashboard-home'>
                <MonthPromotion/>
                <hr />
                <Dashboard/>
            </div>       
        </div>
    ) 
}

export default Home;