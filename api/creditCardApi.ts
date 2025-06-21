import axiosInstance from "./axiosInstance";

export interface CardData{
    id?: number;
    number:string;
    ownerName:string;
    expiryDate:string;
    ccv:number;
    userId?: number;
}

const creditCardApi = {
    getAllByUserId: (userId: number) => {
        return axiosInstance.get(`/credit_card/all/${userId}`);
    },

    updateCard : (id: number, data: CardData) => {
        return axiosInstance.put(`/credit_card/update/${id}`, data);
    },

    addCard: (data: CardData) => {
        return axiosInstance.post(`/credit_card/add-card`, data);
    },

    deleteCard: (id: number) => {
        return axiosInstance.delete(`/credit_card/delete/${id}`);
    }


}

export default creditCardApi;