import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CustomizedDot = (props) => {
  const { cx, cy, stroke, payload, value, type} = props;

  if(type == "forecasted"){
    return (
      <svg x={cx-7} y={cy-8} width={150} height={150} viewBox="0 0 1024 1024">
        <circle cx="50" cy="50" r={payload.alert==1?35:25} strokeWidth="20" fill={payload.alert==1?"#f53d3d":"#8884d8"} />
      </svg>
    );
  }
  else{
    if(cy == null || isNaN(cy)){
      return "";
    }
    return(
      <svg x={cx-7} y={cy-8} width={150} height={150} viewBox="0 0 1024 1024">
        <circle cx="50" cy="50" r={payload.alert==1?35:25} strokeWidth="20" fill={payload.alert==1?"#f53d3d":"#78c471"} />
      </svg>
    )
  }
};

const CustomizedActiveDot = (props) => {
  const { cx, cy, stroke, payload, value, type, onclick } = props;

  if(type == "forecasted"){
    return (
      <svg x={cx-10} y={cy-10} width={200} height={200} viewBox="0 0 1024 1024">
        <circle cx="50" cy="50" r="35" strokeWidth="20" fill={payload.alert==1?"#f53d3d":"#8884d8"} onClick={() => onclick(payload)} />
      </svg>
    );
  }
  else{
    if(cy == null || isNaN(cy)){
      return "";
    }
    return (
      <svg x={cx-10} y={cy-10} width={200} height={200} viewBox="0 0 1024 1024">
        <circle cx="50" cy="50" r="35" strokeWidth="20" fill={payload.alert==1?"#f53d3d":"#78c471"} onClick={() => onclick(payload)} />
      </svg>
    )
  }
};

const SalesForcastChart = ({data, handleClick}) => {

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
          <Line type="category" dataKey="forcasted" stroke="#8884d8" dot={<CustomizedDot type="forecasted" />} strokeWidth={2} activeDot={<CustomizedActiveDot type="forecasted" onclick={handleClick} />}  />
          <Line type="category" dataKey="actual" stroke="#78c471" dot={<CustomizedDot type="actual" />} strokeWidth={2} activeDot={<CustomizedActiveDot type="actual" onclick={handleClick} />}  />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default SalesForcastChart