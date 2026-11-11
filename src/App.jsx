
import { useState } from "react";
import "./App.css";

const API_URL =
  "https://underpaid-lumping-landed.ngrok-free.dev/gps";

function App() {
  const [latitude, setLatitude] = useState("-7.3657");
  const [longitude, setLongitude] = useState("108.53397");
  const [deviceId, setDeviceId] = useState("android");
  const [status, setStatus] = useState("Ready");

  async function sendGPS(e) {
    e.preventDefault();

    setStatus("Sending...");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          latitude: Number(latitude),
          longitude: Number(longitude),
          device_id: deviceId
        })
      });

      if (!response.ok) {
        throw new Error("POST failed");
      }

      const result = await response.json();

      setStatus("POST Success");

      console.log(result);

    } catch (error) {
      setStatus("Error: " + error.message);
    }
  }

  return (
    <div className="container">

      <h2>GPS POST CLIENT</h2>

      <form onSubmit={sendGPS}>

        <label>Latitude</label>
        <input
          type="number"
          step="any"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          required
        />

        <label>Longitude</label>
        <input
          type="number"
          step="any"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          required
        />

        <label>Device ID</label>
        <input
          value={deviceId}
          onChange={(e) => setDeviceId(e.target.value)}
          required
        />

        <button type="submit">
          SEND GPS
        </button>

      </form>

      <p>{status}</p>

    </div>
  );
}

export default App;
