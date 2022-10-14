import axios from "axios";
import { tokenExpire } from "../actions";
import { envs } from "../constants";

class Api {
  defaultHeader(object) {
    Object.keys(object).forEach((key) => {
      axios.defaults.headers.common[key] = object[key];
    });
  }

  GET(endpoint, params) {
    return new Promise((resolve) => {
      axios({
        method: "GET",
        url: this.normalizePath(endpoint),
        params,
        headers: { "Content-Type": "application/json" },
        validateStatus(status) {
          return status !== 404;
        },
      })
        .then((response) => {
          // console.log(
          //   "GET :: ",
          //   "uri :",
          //   endpoint,
          //   "body :",
          //   params,
          //   "response Data",
          //   JSON.stringify(response.data)
          // );
          resolve(response.data);
        })
        .catch((error) => {
          console.log("GET error", error);
          resolve({ success: 0, message: "Oops!  Something is wrong" });
        });
    });
  }

  POST(endpoint, params, headers) {
    return new Promise((resolve) => {
      axios({
        method: "post",
        url: this.normalizePath(endpoint),
        data: JSON.stringify(params),
        headers: { "Content-Type": "application/json", ...headers },
        validateStatus(status) {
          return status !== 404;
        },
      })
        .then((response) => {
          console.log(
            "POST :: ",
            "uri :",
            endpoint,
            "body :",
            params
            // "response Data",
            // JSON.stringify(response.data)
          );

          if (String(response?.data?.responsecode) === "101") {
            return tokenExpire();
          }
          resolve(response.data);
        })
        .catch((error) => {
          console.log("POST error:", error);
          resolve({ success: 0, message: "Oops!  Something is wrong" });
        });
    });
  }

  POSTFORMDATA(endpoint, params, headers) {
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
        headers: {
          "Content-Type": "multipart/form-data",
          ...headers,
        },
        validateStatus(status) {
          return status !== 404;
        },
      })
        .then((response) => {
          console.log(
            "POSTFORMDATA :: \n",
            "uri :",
            endpoint,
            "body :\n",
            JSON.stringify(data)
            // "response Data\n",
            // JSON.stringify(response.data)
          );
          resolve(response.data);
        })
        .catch((error) => {
          console.log("POSTFORMDATA error:", error);
          resolve({
            success: false,
            message: "API: Oops!  Something is wrong",
          });
        });
    });
  }

  normalizePath(endpoint) {
    return `${envs.api_base_uri}/${endpoint}`;
  }
}

export default new Api();
