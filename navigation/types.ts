import { ProductItemModel } from "@/models/ProductItemModel";

export type RootStackParamList = {
  Home: undefined;
  Product: { title: string; link: string,products: ProductItemModel[] };
  ProductDetail: { id: string };
};
