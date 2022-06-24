import { api } from 'utils';

const STATUS_URL = '/status';

export const getStatuses = () => {
  return api.get(STATUS_URL);
};
