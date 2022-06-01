import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CustomizedDot = (props) => {
  const { cx, cy, stroke, payload, value } = props;
    return (
      <svg x={cx-7} y={cy-8} width={150} height={150} viewBox="0 0 1024 1024">
        <circle cx="50" cy="50" r={payload.alert==1?35:25} strokeWidth="20" fill={payload.alert==1?"#f53d3d":"#8884d8"} />
      </svg>
    );
};

const CustomizedActiveDot = (props) => {
  const { cx, cy, stroke, payload, value } = props;
    return (
      <svg x={cx-10} y={cy-10} width={200} height={200} viewBox="0 0 1024 1024">
        <circle cx="50" cy="50" r="35" strokeWidth="20" fill={payload.alert==1?"#f53d3d":"#8884d8"} />
      </svg>
    );
};

const SalesForcastChart = ({data}) => {

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
          <Line type="category" dataKey="forcasted" stroke="#8884d8" dot={<CustomizedDot/>} strokeWidth={2} activeDot={<CustomizedActiveDot/>} />
          <Line type="category" dataKey="actual" stroke="#ff7752" fill='#ff7752' strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default SalesForcastChart