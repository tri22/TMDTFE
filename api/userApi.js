import axiosInstance from "./axiosInstance";

const userApi  = {
  getUserById :(userId) => {
    return axiosInstance.get(`/users/${userId}`);
  },

  upadtetUserById :(userId,data) => {
    return axiosInstance.put(`/users/${userId}`,data);
  },

  upadtetUserAddressById :(data) => {
    return axiosInstance.put(`/users/address-update`,data);
  },

  getUserAddress :(userId ) => {
    return axiosInstance.get(`/users/address-list/${userId}`);
  }

}


export default userApi;