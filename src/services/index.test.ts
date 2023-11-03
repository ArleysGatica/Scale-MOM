import axios from 'axios';
import { ConexionFetch } from './index';

jest.mock('axios');

describe('ConexionFetch', () => {
  const baseURL = 'http://192.168.1.23:3000/api';
  const controller = 'test';
  const url = '1';
  const body = { data: 'test' };
  const requestURL = `${baseURL}/${controller}/${url}`;

  afterEach(() => {
    jest.resetAllMocks();
  });

it('should make a GET request and return the response data', async () => {
    const responseData = { data: 'test' };
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: responseData });

    const response = await ConexionFetch({ url, method: 'GET', controller });

    expect(axios.get).toHaveBeenCalledWith(requestURL);
    expect(response).toEqual(responseData);
});

it('should make a POST request and return the response data', async () => {
    const responseData = { data: 'test' };
    (axios.post as jest.Mock).mockResolvedValueOnce({ data: responseData });

    const response = await ConexionFetch({ url, method: 'POST', body, controller });

    expect(axios.post).toHaveBeenCalledWith(requestURL, body);
    expect(response).toEqual(responseData);
});

it('should make a PUT request and return the response data', async () => {
    const responseData = { data: 'test' };
    (axios.put as jest.Mock).mockResolvedValueOnce({ data: responseData });

    const response = await ConexionFetch({ url, method: 'PUT', body, controller });

    expect(axios.put).toHaveBeenCalledWith(requestURL, body);
    expect(response).toEqual(responseData);
});

it('should make a DELETE request and return the response data', async () => {
    const responseData = { data: 'test' };
    (axios.delete as jest.Mock).mockResolvedValueOnce({ data: responseData });

    const response = await ConexionFetch({ url, method: 'DELETE', body, controller });

    expect(axios.delete).toHaveBeenCalledWith(requestURL, { data: body });
    expect(response).toEqual(responseData);
});

it('should log the request URL if the method is not recognized', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementationOnce(() => {});

    await ConexionFetch({ url, method: 'INVALID_METHOD', controller });

    expect(consoleSpy).toHaveBeenCalledWith(requestURL);
});

it('should throw an error if the request fails', async () => {
    const error = new Error('Request failed');
    (axios.get as jest.Mock).mockRejectedValueOnce(error);

    await expect(ConexionFetch({ url, method: 'GET', controller })).rejects.toThrow(error);
});
});