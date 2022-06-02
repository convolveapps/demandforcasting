export const getStaticData = (data, startDate, endDate, product, type) => {
  const sDate = new Date(startDate).setHours(0,0,0,0);
  const eDate = new Date(endDate).setHours(0,0,0,0);
  const filteredData = data.filter(d => new Date(d["Date"])>=sDate  && new Date(d["Date"])<=eDate && d["Product"]==product);

  const finalData=[];
  if(type == "Daily"){
    for(let i=0;i<filteredData.length;i++){
      const date = new Date(filteredData[i]["Date"]);

      finalData.push({
        forcasted: parseInt(filteredData[i]["Foreccasted Demand"]),
        actual: parseInt(filteredData[i]["Actual Demand"]),
        date: `${date.getDate()} ${getMonthString(date.getMonth())}`,
        alert: filteredData[i]["Alert"]
      });
    }
  }
  if(type == "Weekly"){
    let uniqueWeeks = [];
    for(let i=0;i<filteredData.length;i++){
      const week = new Date(filteredData[i]["Date"]).getWeek();
      const index = uniqueWeeks.indexOf(week);
      if(index == -1){
        uniqueWeeks.push(week);
        finalData.push({
          forcasted: parseInt(filteredData[i]["Foreccasted Demand"]),
          actual: parseInt(filteredData[i]["Actual Demand"]),
          date: week,
          alert: filteredData[i]["Alert"]
        })
      }
      else{
        finalData[index].forcasted += parseInt(filteredData[i]["Foreccasted Demand"]);
        finalData[index].actual += isNaN(parseInt(filteredData[i]["Actual Demand"])) ? 0 : parseInt(filteredData[i]["Actual Demand"]);
        finalData[index].alert = finalData[index].alert == 1 ? 1 : parseInt(filteredData[i]["Alert"]);
      }
    }
  }
  if(type == "Monthly"){
    let uniqueMonths = [];
    for(let i=0;i<filteredData.length;i++){
      const month = getMonthString(new Date(filteredData[i]["Date"]).getMonth());
      const index = uniqueMonths.indexOf(month);
      if(index == -1){
        uniqueMonths.push(month);
        finalData.push({
          forcasted: parseInt(filteredData[i]["Foreccasted Demand"]),
          actual: parseInt(filteredData[i]["Actual Demand"]),
          date: month,
          alert: filteredData[i]["Alert"]
        })
      }
      else{
        finalData[index].forcasted += parseInt(filteredData[i]["Foreccasted Demand"]);
        finalData[index].actual += isNaN(parseInt(filteredData[i]["Actual Demand"])) ? 0 : parseInt(filteredData[i]["Actual Demand"]);
        finalData[index].alert = finalData[index].alert == 1 ? 1 : parseInt(filteredData[i]["Alert"]);
      }
    }
  }
  return finalData;
}

export const getBiasData = (data, startDate, endDate, product, type) =>{
  const sDate = new Date(startDate).setHours(0,0,0,0);
  const eDate = new Date(endDate).setHours(0,0,0,0);
  const filteredData = data.filter(d => new Date(d["Date"])>=sDate  && new Date(d["Date"])<=eDate && d["Product"]==product);

  const finalData=[];
  if(type == "Daily"){
    for(let i=0;i<filteredData.length;i++){
      finalData.push({
        bias: parseInt(filteredData[i]["Bais"]),
        date: filteredData[i]["Date"]
      });
    }
  }
  if(type == "Weekly"){
    let uniqueWeeks = [];
    for(let i=0;i<filteredData.length;i++){
      const week = new Date(filteredData[i]["Date"]).getWeek();
      const index = uniqueWeeks.indexOf(week);
      if(index == -1){
        uniqueWeeks.push(week);
        finalData.push({
          bias: parseInt(filteredData[i]["Bais"]),
          date: week
        })
      }
      else{
        finalData[index].bias += parseInt(filteredData[i]["Bais"]);
      }
    }
  }
  if(type == "Monthly"){
    let uniqueMonths = [];
    for(let i=0;i<filteredData.length;i++){
      const month = getMonthString(new Date(filteredData[i]["Date"]).getMonth());
      const index = uniqueMonths.indexOf(month);
      if(index == -1){
        uniqueMonths.push(month);
        finalData.push({
          bias: parseInt(filteredData[i]["Bais"]),
          date: month
        })
      }
      else{
        finalData[index].bias += parseInt(filteredData[i]["Bais"]);
      }
    }
  }
  return finalData;
}

export const getDriversData = (data, startDate, endDate, product) => {
  const sDate = new Date(startDate).setHours(0,0,0,0);
  const eDate = new Date(endDate).setHours(0,0,0,0);
  const filteredData = data.filter(d => new Date(d["Date"])>=sDate  && new Date(d["Date"])<=eDate && d["Product"]==product);
  
  const finalData=[
    { name: "Special event", value:0},
    { name: "Holiday", value:0},
    { name: "Price", value:0},
    { name: "Govt Initiatives", value:0},
    { name: "Fear sentiment", value:0},
    { name: "Metal index", value:0},
    { name: "Others", value:0}];
  
  for(let i=0;i<filteredData.length;i++){
    finalData[0].value += parseInt(filteredData[i]["Special Event"]);
    finalData[1].value += parseInt(filteredData[i]["Holiday"]);
    finalData[2].value += parseInt(filteredData[i]["Price"]);
    finalData[3].value += parseInt(filteredData[i]["Govt Initiatives"]);
    finalData[4].value += parseInt(filteredData[i]["Fear Sentiment Index"]);
    finalData[5].value += parseInt(filteredData[i]["Metal Index"]);
    finalData[6].value += parseInt(filteredData[i]["Others"]);
  }

  finalData[0].value = (finalData[0].value/filteredData.length).toFixed(2);
  finalData[1].value = (finalData[1].value/filteredData.length).toFixed(2);
  finalData[2].value = (finalData[2].value/filteredData.length).toFixed(2);
  finalData[3].value = (finalData[3].value/filteredData.length).toFixed(2);
  finalData[4].value = (finalData[4].value/filteredData.length).toFixed(2);
  finalData[5].value = (finalData[5].value/filteredData.length).toFixed(2);
  finalData[6].value = (finalData[6].value/filteredData.length).toFixed(2);

  finalData.sort((a,b) => b.value - a.value);
  
  return finalData;
}

export const totalData = (data, startDate, endDate) =>{
  const sDate = new Date(startDate).setHours(0,0,0,0);
  const eDate = new Date(endDate).setHours(0,0,0,0);
  const filteredData = data.filter(d => new Date(d["Date"])>=sDate  && new Date(d["Date"])<=eDate);

  const finalData = [];
  const uniqueProduct = [];
  for(let i=0;i<filteredData.length;i++){
    const index = uniqueProduct.indexOf(filteredData[i]["Product Name"]);
    if(index == -1){
      uniqueProduct.push(filteredData[i]["Product Name"]);
      finalData.push({
        productName: filteredData[i]["Product Name"],
        salesVolume: parseInt(filteredData[i]["Sales Volume"]),
        salesValue: parseInt(filteredData[i]["Sales Cost"])
      });
    }
    else{
      finalData[index].salesVolume += parseInt(filteredData[i]["Sales Volume"]);
      finalData[index].salesValue += parseInt(filteredData[i]["Sales Cost"]);
    }
  }

  return finalData;
}

/**
 * Returns the week number for this date.  dowOffset is the day of week the week
 * "starts" on for your locale - it can be from 0 to 6. If dowOffset is 1 (Monday),
 * the week returned is the ISO 8601 week number.
 * @param int dowOffset
 * @return int
 */
Date.prototype.getWeek = function (dowOffset) {
/*getWeek() was developed by Nick Baicoianu at MeanFreePath: http://www.meanfreepath.com */

    dowOffset = typeof(dowOffset) == 'number' ? dowOffset : 0; //default dowOffset to zero
    var newYear = new Date(this.getFullYear(),0,1);
    var day = newYear.getDay() - dowOffset; //the day of week the year begins on
    day = (day >= 0 ? day : day + 7);
    var daynum = Math.floor((this.getTime() - newYear.getTime() - 
    (this.getTimezoneOffset()-newYear.getTimezoneOffset())*60000)/86400000) + 1;
    var weeknum;
    //if the year starts before the middle of a week
    if(day < 4) {
        weeknum = Math.floor((daynum+day-1)/7) + 1;
        if(weeknum > 52) {
            nYear = new Date(this.getFullYear() + 1,0,1);
            nday = nYear.getDay() - dowOffset;
            nday = nday >= 0 ? nday : nday + 7;
            /*if the next year starts before the middle of
              the week, it is week #1 of that year*/
            weeknum = nday < 4 ? 1 : 53;
        }
    }
    else {
        weeknum = Math.floor((daynum+day-1)/7);
    }
    return weeknum;
};

function getMonthString(month){
  switch(month){
    case 0: return "Jan";
    case 1: return "Feb";
    case 2: return "Mar";
    case 3: return "Apr";
    case 4: return "May";
    case 5: return "Jun";
    case 6: return "Jul";
    case 7: return "Aug";
    case 8: return "Sep";
    case 9: return "Oct";
    case 10: return "Nov";
    case 11: return "Dec";
  }
}