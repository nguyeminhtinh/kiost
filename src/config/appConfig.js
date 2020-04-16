let apiUrl = '';
switch (process.env.REACT_APP_ENVIRONMENT) {
  case 'dev':
    apiUrl = process.env.REACT_APP_API_URL;
    break;

  case 'stag':
    apiUrl = process.env.break;
    break;
  case 'prod':
    apiUrl = process.env.REACT_APP_API_URL;
    break;

  default:
}

export default {
  API_URL: apiUrl,
  IMG_URL: process.env.REACT_APP_IMG_URL,
  DEFAULT_PER_PAGE: 10
};
