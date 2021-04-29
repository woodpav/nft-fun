import fetch, { Headers } from 'node-fetch';
import FormData from 'form-data';

const PINATA_API_KEY = process.env.REACT_APP_PINATA_API_KEY || ''
const PINATA_API_SECRET = process.env.REACT_APP_PINATA_API_SECRET || ''

interface RequestOptions {
  body?: FormData;
}

const makePinataRequest = async (
  path: string,
  options: RequestOptions | undefined = undefined
): Promise<object> => {
  const url = `https://api.pinata.cloud/${path}`;

  const headers = new Headers({
    pinata_api_key: PINATA_API_KEY || '',
    pinata_secret_api_key: PINATA_API_SECRET || '',
  });

  const resp = await fetch(url, {
    method: options?.body ? 'POST' : 'GET',
    headers,
    body: options?.body,
  });

  return await resp.json();
};

export const testAuthentication = () => makePinataRequest('data/testAuthentication')

export const uploadFile = async (
  file: File,
  metadata: object | undefined = undefined
) => {
  const body = new FormData();
  body.append('file', file)

  if (metadata) {
    body.append('pinataMetadata', JSON.stringify(metadata));
  }

  return makePinataRequest('pinning/pinFileToIPFS', { body });
};