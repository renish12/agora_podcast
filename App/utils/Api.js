import axios from "axios";
import { AUTHENTICATIOM_TOKEN, BASE_URL } from "../constants/env";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
class Api {
  defaultHeader(object) {
    Object.keys(object).forEach((key) => {
      axios.defaults.headers.common[key] = object[key];
    });
  }

  async GET(endpoint, params) {
    var header = await AsyncStorage.getItem(AUTHENTICATIOM_TOKEN);
    return new Promise((resolve) => {
      NetInfo.fetch().then((state) => {
        if (state.isConnected) {
          axios({
            method: "GET",
            url: this.normalizePath(endpoint),
            params,
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${header}`,
            },
            responseType: "json",
            // validateStatus: function (status) {
            //     console.log(status);
            // }
          })
            .then((response) => {
              //console.log(response);
              resolve({
                status: response.status,
                response: response.data,
              });
            })
            .catch((error) => {
              console.log("Catch Error =>", error);
              // console.log(error.response);
              resolve({
                status: error.response.status,
                response: error.response?.data,
              });
            });
        } else {
          resolve({
            status: 502,
            response: "Network Error",
          });
        }
      });
    });
  }

  async POST(endpoint, params, headers) {
    var header = await AsyncStorage.getItem(AUTHENTICATIOM_TOKEN);
    return new Promise((resolve) => {
      NetInfo.fetch().then((state) => {
        if (state.isConnected) {
          axios({
            method: "post",
            url: this.normalizePath(endpoint),
            data: JSON.stringify(params),
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${header}`,
            },
            // validateStatus: function (status) {
            //   return status !== 404
            // }
          })
            .then((response) => {
              // console.log(response);
              resolve({
                status: response.status,
                response: response.data,
              });
            })
            .catch((error) => {
              console.log("Catch Error =>", error);

              resolve({
                status: error.response.status,
                response: error.response?.data,
              });
            });
        } else {
          resolve({
            status: 502,
            response: "Network Error",
          });
        }
      });
    });
  }

  POSTFORMDATA(endpoint, params, headers = {}) {
    return new Promise((resolve) => {
      const data = new FormData();
      if (params) {
        Object.keys(params).forEach((key) => {
          data.append(key, params[key]);
        });
      }
      axios({
        method: "post",
        url: this.normalizePath(endpoint),
        data: data,
        headers: { "Content-Type": "multipart/form-data", ...headers },
        // validateStatus: function (status) {
        //   return status !== 404
        // }
      })
        .then((response) => {
          resolve({
            status: response.status,
            response: response.data,
          });
        })
        .catch((error) => {
          console.log(error.response);
          resolve({
            status: error.response.status,
            response: error.response?.data,
          });
        });
    });
  }

  async DELETE(endpoint, params, headers) {
    var header = await AsyncStorage.getItem(AUTHENTICATIOM_TOKEN);
    return new Promise((resolve) => {
      NetInfo.fetch().then((state) => {
        if (state.isConnected) {
          axios({
            method: "delete",
            url: this.normalizePath(endpoint),
            data: JSON.stringify(params),
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${header}`,
            },
            // validateStatus: function (status) {
            //   return status !== 404
            // }
          })
            .then((response) => {
              // console.log(response);
              resolve({
                status: response.status,
                response: response.data,
              });
            })
            .catch((error) => {
              console.log("Catch Error =>", error);

              resolve({
                status: error.response.status,
                response: error.response?.data,
              });
            });
        } else {
          resolve({
            status: 502,
            response: "Network Error",
          });
        }
      });
    });
  }

  normalizePath(endpoint) {
    return `${BASE_URL}/${endpoint}`;
  }
}

export default new Api();
