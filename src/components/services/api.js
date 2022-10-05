import  axios  from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '29587417-df190bcf57e6bfa4b1db84c62';
// const q = '';
// const page = 1;
// const per_page = 12;

export const addBaseFetch = async value => {
  const baseFetch = await axios.get(
    `${BASE_URL}?q=cat&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
  return baseFetch.data;
}; 


export default { addBaseFetch}