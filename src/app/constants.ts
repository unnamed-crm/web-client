export const HOST_URL = process.env.host || 'http://localhost:8081/api/v1';

export enum HTTP_METHODS {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}
