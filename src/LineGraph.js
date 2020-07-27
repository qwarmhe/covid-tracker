import React,{useState,useEffect} from 'react'
import { Line } from "react-chartjs-2";
import numeral from "numeral"
import "./LineGraph.css";


const options={
    legend:{
        display:false,

    },
    elements:{
        point:{
            radius:0
        },
    },
    maintainAspectRatio:false,
    tootips:{
        mode:"index",
        intersect:false,
        callbacks:{
            label:function(tooltipItem,data){
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },

    scales:{
        xAxes:[
            {
                type:"time",
                time:{
                    format:"MM/DD/YY",
                    tooltipFormat:"ll"
                },
            },
        ],
        yAxes:[
            {
                gridLines: {
                    display:false
                },
                ticks:{
                    callbackk: function(value,index,values){
                        return numeral(value).format("0a");
                    },
                },
            },
        ],
    },
}

function LineGraph({casesType="cases"}) {
    
    const [data,setData]= useState({});

    useEffect(()=>{
       const fetchData= async ()=>{
        fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then(response=>response.json())
        .then(data=>{
            let chartData= buildChartData(data,"cases");
            setData(chartData);
        })
       }
       fetchData();
    },[]);


    const buildChartData = (data, casesType="cases") =>{
        const chartData= [];
        let lastDataPoint;

        for(let date in data.cases) {
            if(lastDataPoint){
                const newDataPoint = {
                    x:date,
                    y:data[casesType][date]- lastDataPoint
                }
                chartData.push(newDataPoint)                
            }
            lastDataPoint= data['cases'][date];
        }

        return chartData;
    }

    return (
        <div className="linegraph">
        {
            data?.length > 0 && (
                <Line
                options={options}
                data={{
                    datasets:[
                        {
                            backgroundColor:"rgba(205,16,52,0.5)",
                            borderColor: "#CC1034",
                            data:data
                        }
                    ]
                }}
                />
            )
        }
            
        </div>
    )
}

export default LineGraph;
