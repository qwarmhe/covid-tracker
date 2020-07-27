import {Circle, Popup} from "react-leaflet";
import numeral from "numeral";
import React from "react";

const casesTypeColors={
    cases:{
        hex:"#cc1034",
        rgb:"rgb(204,16,52) ",
        half:"rgba(204,16,52,0.5) ",
        multiplier:800
    },
    recovered:{
        hex:"#7dd71d",
        rgb:"rgb(125,215,29) ",
        half:"rgba(125,215,29,0.5) ",
        multiplier:1200
    },
    deaths:{
        hex:"#fb4443",
        rgb:"rgb(251,68,67) ",
        half:"rgba(251, 68,67,0.5) ",
        multiplier:2000
    }

};


export const sortData= (data) =>{
    const sortData= [...data];

    sortData.sort((a,b)=>{
        if(a.cases>b.cases){
            return -1;
        }
        else{
            return 1;
        }
    })

    return sortData;
}


    /*
{
    sortedData.sort((a,b)=>a.cases b.cases ? -1" 1);
    
}

*/

export const prettyPrintStat=(stat)=>stat ? `+${numeral(stat).format("0.0a")}`: ''

export const showDataOnMap= (data,casesType="cases")=>(
    data.map((country)=>(
        
        <Circle
        center={[country.countryInfo.lat,country.countryInfo.long]}
        fileOpacity={0.4}
        color={casesTypeColors[casesType].hex}
        fillColor={casesTypeColors[casesType].hex}

        radius={
            Math.sqrt(country[casesType])*casesTypeColors[casesType].multiplier
        }
        >
        <Popup>
            <div className="info-container">
            <div
            className="info-flag"
            style={{backgroundImage: `url(${country.countryInfo.flag})`}}
            />
                <div className="info-name">
                {country.country} 
                </div>

                <div className="info-confirmed">
                Cases: {numeral(country.cases).format("0,0")} 
                </div>

                <div className="info-recovered">
                Recovered: {numeral(country.recovered).format("0,0")} 
                </div>

                <div className="info-deaths">
                Deaths: {numeral(country.deaths).format("0,0")} 
                </div>
            </div>
        </Popup>

        </Circle>
    ))
)