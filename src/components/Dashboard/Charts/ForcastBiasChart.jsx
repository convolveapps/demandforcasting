import React from 'react';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';

const ForcastBiasChart = ({data}) => {

    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
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
          <ReferenceLine y={0} stroke="#000" />
          <Bar dataKey="bias" >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry["bias"]<0 ? "#ff7752" : "#8884d8"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
}

export default ForcastBiasChart;
