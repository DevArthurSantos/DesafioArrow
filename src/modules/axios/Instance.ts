import axios from 'axios';
import { Agent as HttpAgent } from 'http';
import { Agent as HttpsAgent } from 'https';

const httpAgent = new HttpAgent({
  keepAlive: false,
  keepAliveMsecs: 30000,
  maxSockets: 20,
  maxFreeSockets: 10,
  timeout: 120000,
});

const httpsAgent = new HttpsAgent({
  keepAlive: true,
  keepAliveMsecs: 30000,
  maxSockets: 20,
  maxFreeSockets: 10,
  timeout: 120000,
});

const axiosInstance = axios.create({
  httpAgent,
  httpsAgent,
});

export default axiosInstance;
