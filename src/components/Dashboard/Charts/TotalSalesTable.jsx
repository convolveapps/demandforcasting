const TotalSalesTable = ({data}) => {
  return (
    
      data.length>0
      ?
        <table className="tbl tbl-bordered tbl-hover tbl-alternate">
          <thead>
            <tr>
              <th>Product name</th>
              <th>Forcasted sales volume</th>
              <th>Forcasted sales value</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((d,index) => 
              <tr key={index}>
                <td>{d.productName}</td>
                <td>{d.salesVolume}</td>
                <td>{d.salesValue}</td>
              </tr>)
            }
          </tbody>
        </table>
      :
      <></>
    
  )
}

export default TotalSalesTable