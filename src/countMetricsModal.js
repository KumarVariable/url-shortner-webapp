import React from "react";
import axios from "axios";

import { GET_CLICK_COUNT_METRICS_ENDPOINT } from "./constants";

function CountMetricsModal({
  isOpen,
  onMetricsModalClose,
  onSubmitBtn,
  countMetricsData,
  setCountMetricsRequest,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Get Count Metrics</h2>
        <input
          type="text"
          className="input-field"
          placeholder="Enter 7 digit short url. ex: 1L9zO9X"
          value={countMetricsData.shortUrlId}
          onChange={(e) =>
            setCountMetricsRequest({
              ...countMetricsData,
              shortUrlId: e.target.value,
            })
          }
        />
        <button className="action-button" onClick={onMetricsModalClose}>
          Cancel
        </button>
        <button className="action-button" onClick={onSubmitBtn}>
          Submit
        </button>
      </div>
    </div>
  );
}

async function ClickCountMetrics(shortUrlId) {
  try {
    const axiosConfig = {
      headers: {
        Accept: "application/json",
      },
    };

    let payload = {
      shortUrlId: shortUrlId,
    };

    let data = JSON.stringify(payload);

    const response = await axios.post(
      GET_CLICK_COUNT_METRICS_ENDPOINT,
      data,
      axiosConfig
    );

    return response.data;
  } catch (error) {
    console.log("Error caught to create short url ", error);
    throw error; // Handle the error where the function is called
  }
}

export { CountMetricsModal, ClickCountMetrics };
