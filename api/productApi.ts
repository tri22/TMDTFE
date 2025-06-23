import {
    Category,
    Comment,
    Product,
    ProductDetailModel,
    User,
} from "@/models/ProductDetailModel";
import {
    PaginatedProductsResult,
    ProductItemModel,
    ProductResponse,
} from "@/models/ProductItemModel";
import axiosInstance from "./axiosInstance";
import { SERVER_URL_BASE } from "./ipConstant";

export async function getProductsByCategory(
    categoryLink: string,
    page: number
): Promise<PaginatedProductsResult> {
    console.log("getProductsByCategory:" + categoryLink + " page: " + page);
    try {
        const response = await axiosInstance.post<ProductResponse<any>>(
            `/products/${categoryLink}`,
            {},
            {
                params: {
                    page,
                },
            }
        );

        const responseData = response.data;

        const products: ProductItemModel[] = responseData.content.map(
            (item: any): ProductItemModel => ({
                id: item.id,
                name: item.name + " id" + item.id,
                price: item.price,
                thumbnail: SERVER_URL_BASE + "/" + item.thumbnail,
                isSold: item.sold,
            })
        );

        return {
            products: products,
            isFirst: responseData.last,
            isLast: responseData.last,
            nextPage: !responseData.last ? responseData.number + 1 : 0,
        };
    } catch (error: any) {
        console.error(
            "Lỗi khi lấy sản phẩm theo category (paginated):",
            error?.response?.data || error?.message || error
        );
        throw new Error("Không thể tải danh sách sản phẩm.");
    }
}

export async function getProductsByUser(
    id: number,
): Promise<PaginatedProductsResult> {
    console.log("getProductsByUser:" + id);
    try {
        const response = await axiosInstance.post<ProductResponse<any>>(
            `/products/owner/${id}`,
            {},
            {

            }
        );

        const responseData = response.data;

        const products: ProductItemModel[] = responseData.content.map(
            (item: any): ProductItemModel => ({
                id: item.id,
                name: item.name + " id" + item.id,
                price: item.price,
                thumbnail: SERVER_URL_BASE + "/" + item.thumbnail,
                isSold: item.sold,
            })
        );

        return {
            products: products,
            isFirst: responseData.last,
            isLast: responseData.last,
            nextPage: !responseData.last ? responseData.number + 1 : 0,
        };
    } catch (error: any) {
        console.error(
            "Lỗi khi lấy sản phẩm theo category (paginated):",
            error?.response?.data || error?.message || error
        );
        throw new Error("Không thể tải danh sách sản phẩm.");
    }
}

export async function getProductDetail(
    id: number
): Promise<ProductDetailModel> {
    console.log("getProductDetail id:" + id);
    try {
        const response = await axiosInstance.post<ProductDetailModel>(
            `/products/detail/${id}`,
            {}, // body,
            {} // params
        );

        const responseData = response.data;

        console.log('responseData: ' + JSON.stringify(responseData, null, 2))

        const productDefault: Product = {
            id: 0,
            name: "",
            price: 0,
            qty: 0,
            description: "",
            createAt: new Date(),
        };
        const responseProduct = responseData.product ?? productDefault;
        const product: Product = {
            id: responseProduct.id,
            name: responseProduct.name,
            price: responseProduct.price,
            qty: responseProduct.qty,
            description: responseProduct.description,
            createAt: responseProduct.createAt,
        };

        const comments: Comment[] = responseData.comments.map(
            (item: any): Comment => ({
                id: item.id,
                userId: item.userId,
                userName: item.userName,
                userAvatar: SERVER_URL_BASE + "/" + item.userAvatar,
                content: item.content,
                createdAt: new Date(item.createdAt),
                parentId: item.parentId,
                level: item.level,
                replies: item.replies
                    ? item.replies.map((reply: any): Comment => ({
                        id: reply.id,
                        userId: reply.userId,
                        userName: reply.userName,
                        userAvatar: SERVER_URL_BASE + "/" + reply.userAvatar,
                        content: reply.content,
                        createdAt: new Date(reply.createdAt),
                        parentId: reply.parentId,
                        level: reply.level,
                        replies: reply.replies ?? null, // nếu có nested replies thì tiếp tục xử lý nếu cần
                    }))
                    : null,
            })
        );


        const responseImages = responseData.images;
        const images: string[] = responseImages.map((img: string) => SERVER_URL_BASE + "/" + img);

        const ownerDefault: User = {
            id: 0,
            name: "",
            soldOrderQty: 0,
            rating: 0,
            avatar: "",
        };
        const responseOwner = responseData.owner ?? ownerDefault;
        const owner: User = {
            id: responseOwner.id,
            name: responseOwner.name,
            soldOrderQty: responseOwner.soldOrderQty,
            rating: responseOwner.rating,
            avatar: SERVER_URL_BASE + "/" + responseOwner.avatar,
        };



        const categoryDefault: Category = {
            title: "",
            link: "",
        };
        const responseCategory = responseData.category ?? categoryDefault;
        const category: Category = {
            title: responseCategory.title,
            link: responseCategory.link,
        };

        const productDetail: ProductDetailModel = {
            product: product,
            images: images,
            comments: comments,
            owner: owner,
            category: category,
            sold: responseData.sold,
        };

        return productDetail;
    } catch (error: any) {
        console.error(
            "Lỗi khi lấy sản phẩm theo category (paginated):",
            error?.response?.data || error?.message || error
        );
        throw new Error("Không thể tải danh sách sản phẩm.");
    }
}

export async function searchProductByKeyword(
    keyword: string,
    page: number
): Promise<PaginatedProductsResult> {
    console.log("searchProductByKeyword:" + keyword);
    try {
        const response = await axiosInstance.post<ProductResponse<any>>(
            `/products/search`,
            {},
            {
                params: {
                    keyword,
                    page
                },
            }
        );

        const responseData = response.data;

        const products: ProductItemModel[] = responseData.content.map(
            (item: any): ProductItemModel => ({
                id: item.id,
                name: item.name + " id" + item.id,
                price: item.price,
                thumbnail: SERVER_URL_BASE + "/" + item.thumbnail,
                isSold: item.sold,
            })
        );

        return {
            products: products,
            isFirst: responseData.last,
            isLast: responseData.last,
            nextPage: !responseData.last ? responseData.number + 1 : 0,
        };
    } catch (error: any) {
        throw new Error("Không thể tải danh sách sản phẩm.");
    }
}

export async function getNewestProducts(
    page: number
): Promise<PaginatedProductsResult> {
    console.log("getNewestProducts: page: " + page);
    try {
        const response = await axiosInstance.post<ProductResponse<any>>(
            `/products/newest`,
            {},
            {
                params: {
                    page,
                },
            }
        );

        const responseData = response.data;

        const products: ProductItemModel[] = responseData.content.map(
            (item: any): ProductItemModel => ({
                id: item.id,
                name: item.name + " id" + item.id,
                price: item.price,
                thumbnail: SERVER_URL_BASE + "/" + item.thumbnail,
                isSold: item.sold,
            })
        );

        return {
            products: products,
            isFirst: responseData.last,
            isLast: responseData.last,
            nextPage: !responseData.last ? responseData.number + 1 : 0,
        };
    } catch (error: any) {
        console.error(
            "Lỗi khi lấy sản phẩm mới nhất (paginated):",
            error?.response?.data || error?.message || error
        );
        throw new Error("Không thể tải danh sách sản phẩm.");
    }
}

export const getProductById = (productId: number) => {
    return axiosInstance.get(`/products/find/${productId}`)
};

export const updateProduct = (productId: number, data: any) => {
    return axiosInstance.put(`/products/update/${productId}`, data)
};

