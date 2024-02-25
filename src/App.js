import React, { useState } from "react";

import "./App.css";
import {
  testCall,
  getShortUrl,
  createShortUrl,
  deleteShortUrl,
  updateShortUrl,
} from "./apiServices";

function App() {
  const [longUrl, setLongUrl] = useState("");
  const [getResponseData, setResponseData] = useState(null); // State to store the response data

  const handleTestCall = async () => {
    try {
      const response = await testCall();
      if (response) {
        if (response.status === 200) {
          console.log(response.data);
          alert("Response received: " + response.data);
        }
      } else {
        alert("Response received as null or empty ");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetShortUrl = async () => {
    try {
      const responseData = await getShortUrl(longUrl);
      setResponseData(responseData);
    } catch (error) {
      if (error.response) {
        let errData = error.response.data;
        let errCode = error.response.status;
        let errMsg = error.response.statusText;

        console.log("Response for get short url: " + errCode + "-" + errMsg);
        alert("Error to get short url call: " + errData.ErrMsg);
      }
    }
  };

  const handleCreateShortUrl = async () => {
    try {
      let responseData = await createShortUrl(longUrl);
      setResponseData(responseData);
    } catch (error) {
      console.log(error);
      if (error.response) {
        let errData = error.response.data;
        let errCode = error.response.status;
        let errMsg = error.response.statusText;

        console.log("Response for create short url: " + errCode + "-" + errMsg);
        alert("Error to create short url call: " + errData.ErrMsg);
      }
    }
  };

  const handleUpdateShortUrl = async () => {
    try {
      const responseData = await updateShortUrl(longUrl);
      setResponseData(responseData)
    } catch (error) {
      console.log(error);
      if (error.response) {
        let data = error.response.data;
        let errCode = data.ErrCode;
        let errMsg = data.ErrMsg;

        console.log(
          "Request failed to update long url, error code = ",
          errCode + ", message = " + errMsg
        );
        alert("Error to update long url call: " + errMsg);
      }
    }
  };

  const handleDeleteShortUrl = async () => {
    try {
      const response = await deleteShortUrl(longUrl);
      console.log("Response for delete long url" + response);
      alert("Record removed with status code " + response.status);
    } catch (error) {
      console.log(error);
      if (error.response) {
        let data = error.response.data;
        let errCode = data.ErrCode;
        let errMsg = data.ErrMsg;

        console.log(
          "Request failed to delete long url, error code = ",
          errCode + ", message = " + errMsg
        );
        alert("Error to delete  long url call: " + errMsg);
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>A Sample Application to Create Short URLs</h1>
        <div>
          <label htmlFor="longUrl" className="Form-label">
            Long URL
          </label>
          <input
            type="text"
            id="longUrl"
            name="longUrl"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            placeholder="Enter long URL here"
          />
        </div>
        <div className="Button-group">
          <button onClick={handleTestCall}>Test URL Shortner Service</button>
          <button onClick={handleGetShortUrl}>Get</button>
          <button onClick={handleCreateShortUrl}>Create</button>
          <button onClick={handleUpdateShortUrl}>Update</button>
          <button onClick={handleDeleteShortUrl}>Delete</button>
        </div>

        {getResponseData && (
          <div>
            <h3>Shortened URL Details</h3>
            <table className="styledTable">
              <tbody>
                <tr>
                  <td>Key Id</td>
                  <td>{getResponseData.keyId}</td>
                </tr>
                <tr>
                  <td>Short URL Id</td>
                  <td>{getResponseData.shortUrlId}</td>
                </tr>
                <tr>
                  <td>Short URL</td>
                  <td>
                    <a
                      href={getResponseData.shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {getResponseData.shortUrl}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Long URL</td>
                  <td>{getResponseData.longUrl}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
