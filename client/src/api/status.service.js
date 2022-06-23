import { api } from 'utils';

const STATUS_URL = '/status';
// export let NEW_STATUS_ID = '';
export const getStatuses = () => {
  // const statuses =
  // statuses.then(
  //   res =>
  //     (NEW_STATUS_ID = res.data.map(d => {
  //       if (d.Title === 'New') return d.Id;
  //     }))
  // );
  return api.get(STATUS_URL);
};
