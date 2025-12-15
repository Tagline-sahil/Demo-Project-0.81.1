import { axiosClient } from '../api';
import { endpoints } from '../endpoints';

export const getAllProducts = async () => {
  try {
    const response = await axiosClient.get(endpoints.all_products);
    console.log('🚀 ~ getAllProducts ~ response:', response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
