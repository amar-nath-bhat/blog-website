import axios from "axios";
import {
  SERVICE_URLS,
  API_NOTIFICATION_MESSAGES,
} from "../constants/config.js";
import { getType, getAccessToken } from "../utils/common-utils.js";

const API_URL = "https://fouxy-blogging.vercel.app/";
// const API_URL = "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    Accept: "application/json, form-data",
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    if (config.TYPE?.params) {
      config.params = config.TYPE.params;
    } else if (config.TYPE?.query) {
      config.url = `${config.url}/${config.TYPE.query}`;
    }
    return config;
  },
  function (error) {
    return error;
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    // Stop global loader here
    return response;
  },
  function (error) {
    // Stop global loader here
    // Ensure the error response is properly structured
    if (error.response && error.response.data && error.response.data.msg) {
      return Promise.reject(new Error(error.response.data.msg));
    }
    return Promise.reject(error);
  }
);

const ProcessResponse = (response) => {
  if (response.status === 200) {
    return { isSuccess: true, data: response.data };
  } else {
    return {
      isFailure: true,
      status: response?.status,
      msg: response?.msg,
      code: response?.code,
    };
  }
};

const ProcessError = (error) => {
  if (error.response) {
    if (error.response?.status === 403) {
      sessionStorage.clear();
    } else {
      console.log("ERROR IN RESPONSE: ", JSON.stringify(error));
      return {
        isError: true,
        msg: API_NOTIFICATION_MESSAGES.responseFailure,
        code: error.response.status,
      };
    }
  } else if (error.request) {
    // The request was made but no response was received
    console.log("ERROR IN RESPONSE: ", JSON.stringify(error));
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.requestFailure,
      code: "",
    };
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("ERROR IN RESPONSE: ", JSON.stringify(error));
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.networkError,
      code: "",
    };
  }
};

const API = {};

const constructParams = (endpoint, body) => {
  let params = {};

  if (endpoint === "/search") {
    params = body.search || {};
  } else {
    params = {};
  }

  return params;
};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
  API[key] = (body, showUploadProgress, showDownloadProgress) =>
    axiosInstance({
      method: value.method,
      url: value.url,
      data: value.method === "DELETE" ? {} : body,
      params: constructParams(value.url, body),
      // param: value.url === "/search" ? body.search : {},
      responseType: value.responseType,
      headers: {
        authorization: getAccessToken(),
      },
      TYPE: getType(value, body),
      onUploadProgress: function (progressEvent) {
        if (showUploadProgress) {
          let percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showUploadProgress(percentCompleted);
        }
      },
      onDownloadProgress: function (progressEvent) {
        if (showDownloadProgress) {
          let percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showDownloadProgress(percentCompleted);
        }
      },
    });
}

export { API };
