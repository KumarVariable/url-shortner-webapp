import React, { useState } from "react";

import "./App.css";
import {
  testCall,
  getShortUrl,
  createShortUrl,
  deleteShortUrl,
  updateShortUrl,
} from "./apiServices";

import {
  CreateCustomShortUrl,
  CustomUrlModal,
  ValidateShortUrl,
} from "./customUrlModal";
import { CountMetricsModal, ClickCountMetrics } from "./countMetricsModal";

function App() {
  const [longUrl, setLongUrl] = useState("");
  const [getResponseData, setResponseData] = useState(null); // State to store the response data
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [customUrlData, setCustomUrlData] = useState({
    keyId: "",
    longUrl: "",
  }); // State to store custom URL data

  // State to control 'Get Count Metrics' modal visibility
  const [isCountMetricsModalOpen, setIsCountMetricsModalOpen] = useState(false);
  const [countMetricsData, setCountMetricsRequest] = useState({
    shortUrlId: "",
  });

  // Define function to toggle modal visibility
  const toggleModal = () => {
    handleCountMetricsModalVisibility();
    customUrlData.keyId = "";
    customUrlData.longUrl = "";
    setIsModalOpen(!isModalOpen);
  };

  const toggleCountMetricsModal = () => {
    handleModalVisibility();
    setIsCountMetricsModalOpen(!isCountMetricsModalOpen);
  };

  const handleCustomCreate = async () => {
    console.log(customUrlData);

    if (ValidateShortUrl(customUrlData.keyId, customUrlData.longUrl)) {
      // toggleModal();
      try {
        let responseData = await CreateCustomShortUrl(
          customUrlData.keyId,
          customUrlData.longUrl
        );
        setResponseData(responseData);
      } catch (error) {
        if (error.response) {
          let errData = error.response.data;
          let errCode = error.response.status;
          let errMsg = error.response.statusText;

          console.log(
            "Response for create custom short url: " + errCode + "-" + errMsg
          );
          alert("Error to create custom short url call: " + errData.ErrMsg);
        }
      }
    }
  };

  const handleTestCall = async () => {
    handleModalVisibility();
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
    handleModalVisibility();
    try {
      if (!validateInput()) {
        return;
      }
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
    handleModalVisibility();
    try {
      if (!validateInput()) {
        return;
      }
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
    handleModalVisibility();
    try {
      if (!validateInput()) {
        return;
      }
      const responseData = await updateShortUrl(longUrl);
      setResponseData(responseData);
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
    handleModalVisibility();
    try {
      if (!validateInput()) {
        return;
      }
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

  const handleSubmitMetrics = async () => {
    // console.log(countMetricsData.shortUrlId);

    let shortUrlId = countMetricsData.shortUrlId;

    if (ValidateShortUrl(shortUrlId, shortUrlId)) {
      try {
        let responseData = await ClickCountMetrics(shortUrlId);

        alert(responseData.message);

        toggleCountMetricsModal();
      } catch (error) {
        let errData = error.response.data;
        let errCode = error.response.status;
        let errMsg = error.response.statusText;

        console.log(
          "Response for total count of clicks: " + errCode + "-" + errMsg
        );
        alert("Error to get total count of clicks: " + errData.ErrMsg);
      }
    }
  };

  function validateInput() {
    if (!longUrl.trim()) {
      alert("Please enter a long URL.");
      return false;
    }
    return true;
  }

  function handleModalVisibility() {
    if (isModalOpen) {
      toggleModal();
    }
  }

  function handleCountMetricsModalVisibility() {
    if (isCountMetricsModalOpen) {
      toggleCountMetricsModal();
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>A Sample Application to Create Short URLs</h2>
        <div>
          <input
            type="text"
            className="input-field"
            id="longUrl"
            name="longUrl"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            placeholder="Enter long URL here"
          />
          <button className="action-button" onClick={handleGetShortUrl}>
            Get
          </button>
          <button className="action-button" onClick={handleCreateShortUrl}>
            Create
          </button>
          <button className="action-button" onClick={handleUpdateShortUrl}>
            Update
          </button>
          <button className="action-button" onClick={handleDeleteShortUrl}>
            Delete
          </button>
        </div>

        <div>
          <button className="action-button" onClick={handleTestCall}>
            Test URL Shortener Service
          </button>
          <button className="action-button" onClick={toggleModal}>
            Create Custom URL
          </button>
          <button className="action-button" onClick={toggleCountMetricsModal}>
            Get Count Metrics
          </button>
          <CustomUrlModal
            isOpen={isModalOpen}
            onClose={toggleModal}
            onCustomCreate={handleCustomCreate}
            customUrlData={customUrlData}
            setCustomUrlData={setCustomUrlData}
          />
          <CountMetricsModal
            isOpen={isCountMetricsModalOpen}
            onMetricsModalClose={toggleCountMetricsModal}
            onSubmitBtn={handleSubmitMetrics}
            countMetricsData={countMetricsData}
            setCountMetricsRequest={setCountMetricsRequest}
          />
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
