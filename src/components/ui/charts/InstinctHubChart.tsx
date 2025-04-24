"use client"
import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { ChartPropsType } from '../../../types/charts';

const InstinctHubChart= ({
  type = 'line',
  data = [],
  dataKeys = ['value'],
  title,
  height = 300,
  colors = ['#00838f', '#bc658d', '#69779b', '#00c5a2', '#756c83', '#432160'],
  showLegend = true,
  showGrid = true,
  className = '',
}:ChartPropsType) => {
  const [chartWidth, setChartWidth] = useState<number>(0);
  const chartRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const updateWidth = () => {
      if (chartRef.current) {
        setChartWidth(chartRef.current.offsetWidth);
      }
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  const renderChart = () => {
    switch(type) {
      case 'line':
        return (
          <LineChart data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            {showLegend && <Legend />}
            {dataKeys.map((key, index) => (
              <Line 
                key={key}
                type="monotone" 
                dataKey={key} 
                stroke={colors[index % colors.length]} 
                activeDot={{ r: 8 }} 
              />
            ))}
          </LineChart>
        );
      
      case 'bar':
        return (
          <BarChart data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            {showLegend && <Legend />}
            {dataKeys.map((key, index) => (
              <Bar 
                key={key} 
                dataKey={key} 
                fill={colors[index % colors.length]} 
              />
            ))}
          </BarChart>
        );
      
      case 'pie':
        return (
          <PieChart>
            <Tooltip />
            {showLegend && <Legend />}
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={chartWidth > 600 ? 130 : 80}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
          </PieChart>
        );
      
      case 'area':
        return (
          <AreaChart data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            {showLegend && <Legend />}
            {dataKeys.map((key, index) => (
              <Area 
                key={key} 
                type="monotone" 
                dataKey={key} 
                fill={colors[index % colors.length]}
                stroke={colors[index % colors.length]}
                fillOpacity={0.3}
              />
            ))}
          </AreaChart>
        );
      
      default:
        return <div>Unsupported chart type</div>;
    }
  };
  
  return (
    <div className={`ihub-chart-container ${className}`} ref={chartRef}>
      {title && <h3 className="ihub-chart-title">{title}</h3>}
      <div className="ihub-chart-wrapper" style={{ height: `${height}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default InstinctHubChart;