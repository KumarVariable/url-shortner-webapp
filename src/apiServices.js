import {
  TEST_SHORT_URL_ENDPOINT,
  GET_SHORT_URL_ENDPOINT,
  CREATE_SHORT_URL_ENDPOINT,
  DELETE_SHORT_URL_ENDPOINT,
  UPDATE_SHORT_URL_ENDPOINT,
} from "./constants";

import axios from "axios";

export const testCall = async () => {
  try {
    const axiosConfig = {
      headers: {
        Accept: "text/plain",
      },
    };

    const response = await axios.get(TEST_SHORT_URL_ENDPOINT, axiosConfig);
    return response;
  } catch (error) {
    console.error("Error during test call:", error);
    alert("Test call failed");
  }
};

export const getShortUrl = async (longUrl) => {
  try {
    const axiosConfig = {
      headers: {
        Accept: "application/json",
      },
    };

    let endpointURL =
      GET_SHORT_URL_ENDPOINT + `?longUrl=${encodeURIComponent(longUrl)}`;
    const response = await axios.get(endpointURL, axiosConfig);

    return response.data;
  } catch (error) {
    console.error("Error during get short url call:", error);
    throw error; // Handle the error where the function is called
  }
};

export const createShortUrl = async (longUrl) => {
  try {
    const axiosConfig = {
      headers: {
        Accept: "application/json",
      },
    };

    let data = JSON.stringify({ longUrl: longUrl });

    const response = await axios.post(
      CREATE_SHORT_URL_ENDPOINT,
      data,
      axiosConfig
    );

    return response.data;
  } catch (error) {
    console.log("Error caught to create short url ", error);
    throw error; // Handle the error where the function is called
  }
};

export const updateShortUrl = async (longUrl) => {
  try {
    const axiosConfig = {
      headers: {
        accept: "application/json",
      },
    };

    let data = JSON.stringify({ longUrl: longUrl });

    const response = await axios.post(
      UPDATE_SHORT_URL_ENDPOINT,
      data,
      axiosConfig
    );
    return response.data;
  } catch (error) {
    throw error; // Handle the error to the caller of this function
  }
};

export const deleteShortUrl = async (longUrl) => {
  try {
    let endpointURL =
      DELETE_SHORT_URL_ENDPOINT + `?longUrl=${encodeURIComponent(longUrl)}`;

    return await axios.get(endpointURL);
  } catch (error) {
    throw error; // Handle the error where the function is called
  }
};
