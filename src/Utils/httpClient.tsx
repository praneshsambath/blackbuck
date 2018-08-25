import axios from "axios";

const httpClient = {
  getInstance() {
    const instance = axios.create({
      headers: {
        Authorization: `Token :${localStorage.getItem("sessionKey")}`
      }
    });

    instance.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        if (error.response.status === 403 || error.response.status === 401) {
          localStorage.removeItem("sessionKey");
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }
};

export default httpClient;
