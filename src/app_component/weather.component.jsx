import React from 'react';
import './weather.style.css';

const Weather=(props)=>{
    return(
        <div className="container text-muted">
        <div className="cards pt-4">
            <h1>{props.city} </h1>
            <h5 className="py-4">
            <i className={`wi ${props.weatherIcon} display-1`}/>   
            </h5>
            {props.temp ? (<h1 className="py-2">{props.temp}&deg;</h1>):null}
            {minmax(props.max_temp,props.min_temp)}
            <h3 className="py-3">{props.description}</h3>
            </div>
        </div>
    );

};
const minmax=(min,max)=>{
    if(min && max){
        return(
    <h3>
    <span className="px-4">{min}&deg;</span>
    <span className="px-4">{max}&deg;</span>
    </h3>
    )}}
export default Weather;