import PageHeader from '../PageHeader/PageHeader';
import ReadXlsx from '../../helpers/ReadXlsx';
import { useState, useEffect } from 'react';
import SalesForcastChart from './Charts/SalesForcastChart';
import TotalSalesTable from './Charts/TotalSalesTable';
import {totalData,getStaticData,getBiasData,getDriversData} from '../../helpers/DataSetOperation';
import ForcastBiasChart from './Charts/ForcastBiasChart';
import './dashboard.scss';
import DriversChart from './Charts/DriversChart';



const Dashboard = () => {
  const [pageName, setPageName] = useState("Sales forcast dashboard");
  const [pageSummary, setPageSummary] = useState();

  const [startDate, setStartDate] = useState("2022-01-01");
  const [endDate, setEndDate] = useState("2022-12-31");
  const [productType, setProductType] = useState("CR Coil");
  const [forcastType, setForcastType] = useState("Daily");

  const [productData, setProductData] = useState([]);
  const [productDataChart, setProductDataChart] = useState([]);
  
  const [biasDataChart, setBiasDataChart] = useState([]);

  const [diversDataChart, setDriversDataChart] = useState([]);

  const [totalSalesData, setTotalSalesData] = useState([]);
  const [totalSalesDataTable, setTotalSalesDataTable] = useState([]);

  useEffect(()=>{
    ReadXlsx([setProductData,setTotalSalesData], 0);
  },[]);

  useEffect(()=>{
    if(productData.length>0){
      setProductDataChart(getStaticData(productData, startDate, endDate, productType, forcastType));
      setBiasDataChart(getBiasData(productData, startDate, endDate, productType, forcastType));
      setDriversDataChart(getDriversData(productData, startDate, endDate, productType));
    }
    if(totalSalesData.length>0){
      setTotalSalesDataTable(totalData(totalSalesData,startDate,endDate));
    }
  },[productData,totalSalesData,startDate,endDate,productType,forcastType])

  return (
    <div className='page-details'>
      <PageHeader pageName={pageName} pageSummary={pageSummary}/>
      <div className="header-actions bg-shadow">
        <div className="status">
          <p>Choose date range</p>
          <input id="startdate" type="date" value={startDate} max={endDate} onChange ={(e) => setStartDate(e.target.value)} />
          <input id="enddate" type="date" value={endDate} min={startDate} onChange ={(e) => setEndDate(e.target.value)} />
        </div>
        <div className="action-container">
          <p>Choose product</p>
          <select value={productType} onChange={(e) => setProductType(e.target.value)}>
            <option value="CR Coil">CR Coil</option>
            <option value="HR Coil">HR Coil</option>
          </select>
        </div>
      </div>
      <div className="report-container">
        <div className='sales-report'>
          <div className="card-heading">
            <h4>Sales forcast</h4>
            <select value={forcastType} onChange={(e) => setForcastType(e.target.value)}>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>
          <div className="card-chart">
            <SalesForcastChart data={productDataChart} />
          </div>
        </div>
        <div className="driver-report">
          <div className="card-heading">
            <h4>Drivers impact</h4>
          </div>
          <div className="card-chart">
            <DriversChart data={diversDataChart} />
          </div>
        </div>
        <div className="forcast-bias-report">
          <div className="card-heading">
            <h4>Forcast bias</h4>
          </div>
          <div className="card-chart">
            <ForcastBiasChart data={biasDataChart} />
          </div>
        </div>
        <div className="total-sales-report">
          <div className="card-heading">
            <h4>Top projected selling product</h4>
          </div>
          <div className="card-detail">
            <TotalSalesTable data={totalSalesDataTable} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard