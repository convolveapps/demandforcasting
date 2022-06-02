const TotalSalesTable = ({data}) => {

  function convertToInternationalCurrencySystem (labelValue) {

    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e+9

    ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "B"
    // Six Zeroes for Millions 
    : Math.abs(Number(labelValue)) >= 1.0e+6

    ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "M"
    // Three Zeroes for Thousands
    : Math.abs(Number(labelValue)) >= 1.0e+3

    ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + "K"

    : Math.abs(Number(labelValue));

}

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
                <td>{`# ${d.salesVolume.toLocaleString("en-IN")}`}</td>
                <td>{convertToInternationalCurrencySystem(d.salesValue)}</td>
              </tr>)
            }
          </tbody>
        </table>
      :
      <></>
    
  )
}

export default TotalSalesTable