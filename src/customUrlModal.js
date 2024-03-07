// CustomUrlModal.js
import React from "react";
import axios from "axios";

import { CREATE_CUSTOM_SHORT_URL_ENDPOINT } from "./constants";

function CustomUrlModal({
  isOpen,
  onClose,
  onCustomCreate,
  customUrlData,
  setCustomUrlData,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Create Custom URL</h2>
        <input
          type="text"
          className="input-field"
          placeholder="Enter 7 digit short url. ex: 1L9zO9X"
          value={customUrlData.keyId}
          onChange={(e) =>
            setCustomUrlData({ ...customUrlData, keyId: e.target.value })
          }
        />
        <input
          type="text"
          className="input-field"
          placeholder="Enter Long URL"
          value={customUrlData.longUrl}
          onChange={(e) =>
            setCustomUrlData({ ...customUrlData, longUrl: e.target.value })
          }
        />
        <button className="action-button" onClick={onClose}>
          Cancel
        </button>
        <button className="action-button" onClick={onCustomCreate}>
          Create
        </button>
      </div>
    </div>
  );
}

function ValidateShortUrl(customKey, longUrl) {
  const regex = /^[a-zA-Z0-9]{7}$/;

  if (!customKey.trim()) {
    alert("Please enter short url id.");
    return false;
  } else if (!longUrl.trim()) {
    alert("Please enter long url.");
    return false;
  }

  const isValid = regex.test(customKey);

  if (!isValid) {
    alert("Short Url must be alphanumeric and exactly 7 characters long.");
    return false;
  }

  return true;
}

async function CreateCustomShortUrl(customKey, longUrl) {
  try {
    const axiosConfig = {
      headers: {
        Accept: "application/json",
      },
    };

    let payload = {
      longUrl: longUrl,
      shortUrl: customKey,
    };

    let data = JSON.stringify(payload);

    const response = await axios.post(
      CREATE_CUSTOM_SHORT_URL_ENDPOINT,
      data,
      axiosConfig
    );

    return response.data;
  } catch (error) {
    console.log("Error caught to create short url ", error);
    throw error; // Handle the error where the function is called
  }
}

export { CustomUrlModal, ValidateShortUrl, CreateCustomShortUrl };
