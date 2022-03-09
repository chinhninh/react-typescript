import axios from "axios";
import { getToken } from "../redux/localStorage";


const fetchClient = () => {
  const defaultOptions = {
    baseURL: `${process.env.REACT_APP_DOMAIN_API}/api/v0/`,
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
  } as any

  // Create instance
  let instance = axios.create(defaultOptions);

  // Set the AUTH token for any request
  instance.interceptors.request.use(function (config: any) {
    const token = getToken();
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
  });

  return instance;
};

export default fetchClient();

