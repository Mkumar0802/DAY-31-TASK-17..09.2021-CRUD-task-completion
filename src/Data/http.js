import axios from "axios";

axios.defaults.baseURL = "https://61f2318b2219930017f503dd.mockapi.io/user/";

const methods = {
  get: axios.get,
  post: axios.post,
  delete: axios.delete,
  put: axios.put,
};
export default methods;