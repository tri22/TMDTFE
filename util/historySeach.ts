import { ProductDetailModel } from "@/models/ProductDetailModel";
import { ProductItemModel } from "@/models/ProductItemModel";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SEARCH_HISTORY_KEY = "searchHistory";
const RECENT_VIEWED_PRODUCT_KEY = "recentViewedProduct";

export const saveSearchHistory = async (keyword: string) => {
  try {
    const raw = await AsyncStorage.getItem(SEARCH_HISTORY_KEY);
    const history: string[] = raw ? JSON.parse(raw) : [];

    const updated = [
      keyword,
      ...history.filter((item) => item !== keyword),
    ].slice(0, 10);
    await AsyncStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("Error saving search history", error);
  }
};

export const getSearchHistory = async (): Promise<string[]> => {
  try {
    const raw = await AsyncStorage.getItem(SEARCH_HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error("Error getting search history", error);
    return [];
  }
};

export const clearSearchHistory = async () => {
  try {
    await AsyncStorage.removeItem(SEARCH_HISTORY_KEY);
    console.log("clearSearchHistory");
  } catch (error) {
    console.error("Error clearing search history", error);
  }
};

export const saveRecentViewedProduct = async (
  productDetail: ProductDetailModel
) => {
  console.log("saveRecentViewedProduct");
  try {
    const product: ProductItemModel = {
      id: productDetail.product?.id || 0,
      name: productDetail.product?.name || "",
      price: productDetail.product?.price || 0,
      thumbnail: productDetail.images.length > 0 ? productDetail.images[0] : "",
      isSold: productDetail.sold,
    };

    const raw = await AsyncStorage.getItem(RECENT_VIEWED_PRODUCT_KEY);
    const history: ProductItemModel[] = raw ? JSON.parse(raw) : [];

    const updated = [
      product,
      ...history.filter((item) => item.id !== product.id),
    ].slice(0, 10);
    await AsyncStorage.setItem(
      RECENT_VIEWED_PRODUCT_KEY,
      JSON.stringify(updated)
    );
  } catch (error) {
    console.error("Error saving recent viewed product", error);
  }
};

export const getRecentViewedProduct = async (): Promise<ProductItemModel[]> => {
  console.log("getRecentViewedProduct");
  try {
    const raw = await AsyncStorage.getItem(RECENT_VIEWED_PRODUCT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error("Error getting recent viewed product", error);
    return [];
  }
};
