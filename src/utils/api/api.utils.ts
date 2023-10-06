import axios, { AxiosResponse } from 'axios';

// Function to perform an HTTP request
async function httpRequest<T, U>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  data?: U,
  jwt?: string,
): Promise<T> {
  // console.log('URL: ', url);
  const config: any = {};

  if (jwt) {
    // If a JWT token is provided, include it in the request headers
    config.headers = {
      Authorization: `Bearer ${jwt}`,
    };
  }

  try {
    const response: AxiosResponse<T> = await axios.request<T>({
      url,
      method,
      data,
      ...config,
    });
    if (response.status !== 200 && response.status !== 201) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    } else if (!response.data) {
      throw new Error(`HTTP error! No data returned`);
    }
    console.log(response.data);
    return response as T;
  } catch (error: any) {
    console.error(`${method} request to ${url} failed: ${error.message}`);
    throw error;
  }
}

// Function to perform a GET request
export async function getRequest<T>(endpoint: string, jwt?: string): Promise<T> {
  console.log('[getRequest] endpoint: ', endpoint);
  return httpRequest('GET', endpoint, undefined, jwt);
}

// Function to perform a POST request
export async function postRequest<T, U>(endpoint: string, data: U, jwt?: string): Promise<T> {
  console.log('[postRequest] endpoint: ', endpoint);
  console.log('[postRequest] data: ', data);
  return httpRequest('POST', endpoint, data, jwt);
}

// Function to perform a PUT request
export async function putRequest<T, U>(endpoint: string, data: U, jwt?: string): Promise<T> {
  console.log('[putRequest] endpoint: ', endpoint);
  console.log('[putRequest] data: ', data);
  return httpRequest('PUT', endpoint, data, jwt);
}

// Function to perform a DELETE request
export async function deleteRequest<T>(endpoint: string, jwt?: string): Promise<T> {
  console.log('[deleteRequest] endpoint: ', endpoint);
  return httpRequest('DELETE', endpoint, undefined, jwt);
}

export default {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
};
