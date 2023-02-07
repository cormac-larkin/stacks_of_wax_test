import logo from "./logo.svg";
import "./App.css";

import { useState, useEffect } from "react"; ///////

function App() {
  // Initialize 'data' state to be empty on first render
  const [data, setData] = useState([]);

  // Function to fetch data from the API
  const fetchData = async () => {
    const response = await fetch("http://localhost:5000/");

    setData(await response.json()); // Use API response to set our 'data' state
  };

  // When page renders, fire the fetchData function, which sets the 'data' state
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="app">
      <div>
        {data.map((data) => {
          return <h1 key={data.success}>{data.data}</h1>;
        })}
      </div>
    </div>
  );
}

export default App;
