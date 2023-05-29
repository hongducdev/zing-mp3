/* eslint-disable no-async-promise-executor */
import axios from "../axios";

export const apiGetHome = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/home",
        method: "GET",
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
