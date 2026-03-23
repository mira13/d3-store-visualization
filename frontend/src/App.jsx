import "./styles.css";
import LinePlot from "./LinePlot";
import React, { useState, useEffect } from "react";

export default function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const groups = ["Sub-Category", "Region", "Category", "State", "Segment", "Ship Mode"]
  const [dataGrouped, setDataGrouped] = useState(null);
  const [group, setGroup] = useState("Region");
  const backendApi = "http://localhost:8000/";
  const pageHeader = "Profit chart";
  const sumColumn = "Profit";
  const loadingMsg = "Loading data...";

  function groupData(data, group) {
    const tempData = data.reduce((dataSoFar, item) => {
      if (!dataSoFar[item[group]]) dataSoFar[item[group]] = 0;
      dataSoFar[item[group]] = dataSoFar[item[group]] + item[sumColumn];
      return dataSoFar;
    }, {});
     
    let tempDataMap = Object.keys(tempData).map(key => ({
      name: key,
      value: tempData[key]
    }));
    return tempDataMap;
  }

  useEffect(() => {
    if (data == undefined) 
      return;
    setDataGrouped(groupData(data, group));
  }, [data, group])

  useEffect(() => {
    fetch(backendApi)
    .then(response => response.json())
    .then(dataNew => {
      setData(dataNew)
    })
    .catch(error => {
      setError('Error', error);  
    });
  }, [])

  return (
    <div>
      <h2>{pageHeader}</h2>
      <select value={group} onChange={e => setGroup(e.target.value)}>
      {
        dataGrouped && groups.map((item) => (
            <option value={item} key={item}>
                {item}
            </option>
        ))
      }  

    </select>
      {error ? <h2>{error}</h2> 
      : dataGrouped ? <LinePlot data={dataGrouped}/> 
      : <h2>{loadingMsg}</h2> }

    </div>
  );
}
