import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import {

  FlatList,
  Image,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,

} from "react-native";

import { submitComment } from "@/api/commentApi";
import { getProductDetail, getProductsByUser } from "@/api/productApi";
import wishlistAPI from "@/api/WishlistAPI";
import { colors } from "@/baseStyle/Style";
import { IconButton, SimpleButton } from "@/components/button";
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
} from "@/models/ProductItemModel";
import { formatMoney } from "@/util";
import { saveRecentViewedProduct } from "@/util/historySeach";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Modal } from "react-native-paper";
import Toast from "react-native-toast-message";
import DefaultLayout from "../DefaultLayout";
import ProductItem from "../product/components/productItem";
import { CommentItem, MyCarousel, ShopInfo } from "./components";
const imgDir = "@/assets/images/searchProduct";

type ShopInfo = {
    name: string;
    image: ImageSourcePropType;
    avgRating: number;
    link: string;
    saledQty: number;
};

type CommentItem = {
    name: string;
    image: ImageSourcePropType;
    content: string;
    time: string;
    replies: CommentItem[];
};

type ShippingFeeItem = {
    title: string;
    time: string;
    price: number;
};

const shippingFeeItems: ShippingFeeItem[] = [
    {
        title: "Tiêu chuẩn",
        time: "5 - 7 ngày",
        price: 15000,
    },
    {
        title: "Nhanh",
        time: "1 - 3 ngày",
        price: 25000,
    },
];

type ClassificationItem = {
    title: string;
    link: string;
    price: number;
    qty: number;
};

const classificationItems: ClassificationItem[] = [
    {
        title: "size M",
        price: 125000,
        link: "jean",
        qty: 100,
    },
    {
        title: "size L",
        price: 125000,
        link: "jean",
        qty: 0,
    },
    {
        title: "size XL",
        price: 125000,
        link: "jean",
        qty: 100,
    },
];

const productDefault: Product = {
    id: 0,
    name: "",
    price: 0,
    description: "",
    createAt: new Date(),
    qty: 0,
};

const ownerDefault: User = {
    id: 0,
    name: "",
    soldOrderQty: 0,
    rating: 0,
    avatar: "",
};

function ProductDetail() {
    const { id } = useLocalSearchParams();
    const productId = useMemo(() => {
        if (!id) return 0;
        if (Array.isArray(id)) {
            return id.length > 0 ? Number(id[0]) : 0;
        }
        return Number(id);
    }, [id]);
    const [productDetail, setProductDetail] = useState<ProductDetailModel | null>(
        null
    );
    const [productOfSalers, setProductOfSalers] = useState<ProductItemModel[]>(
        []
    );
    const [showWishlistSuccess, setShowWishlistSuccess] = useState(false);

    const [product, setProduct] = useState<Product>(productDefault);
    const [images, setImages] = useState<string[]>([]);
    const [comments, setComments] = useState<Comment[]>([]);
    const [owner, setOwner] = useState<User>(ownerDefault);
    const [category, setCategory] = useState<Category | null | undefined>(null);
    const [sold, setSold] = useState<boolean>(false);
    const [thumbnail, setThumbnail] = useState<string>("");

    const fetchProductDetail = async (id: number) => {
        try {
            const result: ProductDetailModel = await getProductDetail(id);
            setProductDetail(result);
            saveRecentViewedProduct(result);
        } catch (err: any) {
            console.error("Failed to fetch products:", err);
        } finally {
        }
    };
    const fetchProductsByUser = async (id: number) => {
        try {
            const result: PaginatedProductsResult = await getProductsByUser(owner.id);
            setProductOfSalers((prevProducts) => [
                ...prevProducts,
                ...result.products,
            ]);
        } catch (err: any) {
            console.error("Failed to fetch products of saler: ", err);
        }
    };

    useEffect(() => {
        if (productDetail) {
            setProduct(productDetail.product ?? productDefault);
            setImages(productDetail.images ?? []);
            setComments(productDetail.comments ?? []);
            setOwner(productDetail.owner ?? ownerDefault);
            setCategory(productDetail.category ?? null);
            setSold(productDetail.sold ?? false);
        }
    }, [productDetail]);

    useEffect(() => {
        if (productId) {
            fetchProductDetail(productId);
        }
    }, [productId]);

    useEffect(() => {
        if (owner) {
            fetchProductsByUser(owner.id);
        }
    }, [owner]);

    useEffect(() => {
        if (images.length > 0) {
            setThumbnail(images[0]);
        }
    }, [images]);

    const handlePress = () => {
        console.log("handlePress");
    };

    const [commentInput, setCommentInput] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const clearCommentInput = () => {
        setCommentInput("");
    };


    // function for handle add to wish list or cart
    const handleAddToWishlist = async () => {
      const userString = await AsyncStorage.getItem("user");

      if (!userString) {
        console.warn("No user data found");
        return;
      }
      const user = JSON.parse(userString);

      await wishlistAPI
        .addWishlistByUserId(user.id, productId)
        .then((respone) => {
          // show a pop up to notify user
          if (respone.status == 200 && respone.data == "success") {
            Toast.show({
              type: "success",
              text1: "Thành công",
              text2: "Đã thêm vào danh sách yêu thích!",
            });
          } else {
            Toast.show({
              type: "error",
              text1: "Thất bại",
              text2: "Vật phẩm đã có trong giỏ hàng !",
            });
          }
        })
        .catch((e) => {
          console.log("Error adding to wishlist:", e);
        });

    };

    const bottomSheetRef = useRef<BottomSheet>(null);

    // Định nghĩa chiều cao mở ra của bottom sheet
    const snapPoints = useMemo(() => ["25%", "50%"], []);

    const handleOpenBottomSheet = useCallback(() => {
        bottomSheetRef.current?.snapToIndex(1); // mở tới 50%
    }, []);

    const ClassificationSelection = () => {
        const [qty, setQty] = useState(1);

        const handleSelect = (item: ClassificationItem) => {
            setQty(1);
        };

        const handlePlus = () => {
            if (qty < product.qty) setQty(qty + 1);
        };

        const handleMinus = () => {
            if (qty >= 2) setQty(qty - 1);
        };

        // function for handle add to wish list or cart
        const handleAddToWishlist = async () => {
            const userString = await AsyncStorage.getItem("user");

            if (!userString) {
                console.warn("No user data found");
                return;
            }
            const user = JSON.parse(userString);

            await wishlistAPI
                .addWishlistByUserId(user.id, productId)
                .then((r) => {
                    // show a pop up to notify user
                    setShowWishlistSuccess(true);
                    setTimeout(() => {
                        setShowWishlistSuccess(false);
                    }, 1500);
                })
                .catch((e) => {
                    console.log("Error adding to wishlist:", e);
                });
        };
        //
        return (
            <>
                <BottomSheet
                    ref={bottomSheetRef}
                    index={-1}
                    snapPoints={snapPoints}
                    backdropComponent={(props) => (
                        <BottomSheetBackdrop
                            {...props}
                            appearsOnIndex={0}
                            disappearsOnIndex={-1}
                            opacity={0.5}
                        />
                    )}
                >
                    <BottomSheetView style={{}}>
                        <View style={styles.dFlex}>
                            <Image source={{ uri: thumbnail }} style={styles.image} />
                            <View>
                                <Text style={{ fontSize: 20, marginBottom: 20 }}>
                                    {product.name}
                                </Text>
                                <View style={styles.dFlex}>
                                    <Text style={styles.price}>{formatMoney(product.price)}</Text>
                                    <Text style={{ marginLeft: 20 }}>Còn lại: {product.qty}</Text>
                                </View>
                            </View>
                        </View>
                        <Text style={[styles.label, { marginLeft: 10 }]}>
                            Chọn số lượng
                        </Text>
                        <View style={[styles.dFlex, { marginLeft: "auto" }]}>
                            <View style={styles.dFlex}>
                                <IconButton
                                    icon="add-circle-outline"
                                    onPress={handlePlus}
                                    iconColor={colors.primary}
                                    iconSize={60}
                                    style={{
                                        alignSelf: "stretch",
                                        borderTopLeftRadius: 0,
                                        borderBottomLeftRadius: 0,
                                    }}
                                />
                                <TextInput
                                    style={[styles.inputQty]}
                                    placeholderTextColor={"lightgray"}
                                    placeholder="Nhập số lượng"
                                    onChangeText={(text) => {
                                        const number = parseInt(text, 10);
                                        setQty(isNaN(number) ? 0 : number);
                                    }}
                                    value={qty.toString()}
                                    keyboardType="numeric"
                                />
                                <IconButton
                                    icon="remove-circle-outline"
                                    onPress={handleMinus}
                                    iconColor={colors.primary}
                                    iconSize={60}
                                    style={{
                                        alignSelf: "stretch",
                                        borderTopLeftRadius: 0,
                                        borderBottomLeftRadius: 0,
                                    }}
                                />
                            </View>
                        </View>
                        <View style={[styles.dFlex, {}]}>
                            <SimpleButton
                                title="Thêm vào giỏ hàng"
                                onPress={() => handleAddToWishlist()}
                                style={{
                                    flex: 1,
                                    marginHorizontal: 5,
                                    marginVertical: 10,
                                    backgroundColor: colors.darkPrimary,
                                }}
                                textColor="white"
                            />
                        </View>
                    </BottomSheetView>
                </BottomSheet>
                <Modal
                    visible={showWishlistSuccess}
                    onDismiss={() => setShowWishlistSuccess(false)}
                    contentContainerStyle={{ backgroundColor: "transparent" }}
                >
                    <Pressable
                        style={styles.modalOverlay}
                        onPress={() => setShowWishlistSuccess(false)}
                    >
                        <View style={styles.popupContainer}>
                            <Text style={styles.popupText}>
                                Đã thêm vào danh sách yêu thích!
                            </Text>
                        </View>
                    </Pressable>
                </Modal>
            </>
        );
    };

    const [replyingCommentItemId, setReplyingCommentItemId] = useState<
        number | null
    >(null);
    const [replyingParentId, setReplyingParentId] = useState<number>(0);

    const handleReplyClick = (
        id: number,

        userName: string,
        parentId: number
    ) => {
        setReplyingCommentItemId(id);
        if (parentId === 0) setReplyingParentId(id);
        else setReplyingParentId(parentId);
        console.log(
            "handleReplyClick id: " +
            id +
            " | parentId:  " +
            parentId +
            " | name: " +
            userName
        );
    };

    const handleSubmitReply = (content: string) => {
        handleSubmitComment(replyingParentId, 1, content);
        setReplyingCommentItemId(null);
        setReplyingParentId(0);
    };

    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    };

    return (
        <DefaultLayout>
            <TouchableOpacity onPress={handleGoBack} style={styles.goBackBtn}>
                <Text style={{ color: colors.primary }}>Quay lại</Text>
            </TouchableOpacity>
            <ScrollView style={styles.container}>
                <MyCarousel images={images} />
                <View
                    style={[
                        styles.dFlexSpBetween,
                        { paddingHorizontal: 10, marginTop: 10 },
                    ]}
                >
                    <Text style={styles.price}>{formatMoney(product.price)}</Text>
                    <IconButton
                        icon="share-social-sharp"
                        onPress={handlePress}
                        style={{ backgroundColor: colors.blurPrimary }}
                    />
                </View>
                <View style={[{ paddingHorizontal: 10 }]}>
                    <Text style={styles.title}>{product.name}</Text>
                </View>
                <View style={[{ padding: 10 }]}>
                    <View>
                        <Text style={styles.description}>{product.description}</Text>
                    </View>
                </View>
                <View style={[{ padding: 10 }]}>
                    <ShopInfo
                        name={owner.name}
                        image={owner.avatar}
                        avgRating={owner.rating}
                        link={owner.id.toString()}
                        soldOrderQty={owner.soldOrderQty}
                    />
                    <View
                        style={{
                            height: 1,
                            backgroundColor: "#ccc",
                            marginVertical: 10,
                        }}
                    />
                </View>

                <View style={[{ padding: 10 }]}>
                    <Text style={styles.label}>Bình luận</Text>
                    <View style={[{ marginTop: 10 }]}>
                        <View style={[styles.inputWrapper, { marginBottom: 10 }]}>
                            <TextInput
                                style={[styles.inputText, isFocused && styles.inputFocused]}
                                placeholderTextColor={"lightgray"}
                                placeholder="Nhập bình luận"
                                onChangeText={setCommentInput}
                                value={commentInput}
                                onFocus={() => setIsFocused(true)}
                            />
                            <IconButton
                                icon="send-sharp"
                                onPress={() => handleSubmitComment(0, 0, commentInput)}
                                iconColor="#fff"
                                iconSize={20}
                                style={{
                                    backgroundColor: colors.primary,
                                    alignSelf: "stretch",
                                    borderTopLeftRadius: 0,
                                    borderBottomLeftRadius: 0,
                                }}
                            />
                        </View>

                        {comments?.length > 0 &&
                            comments.map((item: Comment, index) => (
                                <CommentItem
                                    key={index}
                                    id={item.id}
                                    userName={item.userName}
                                    userAvatar={item.userAvatar}
                                    content={item.content}
                                    time={item.createdAt}
                                    replies={(item.replies ?? []).map((reply) => ({
                                        id: reply.id,
                                        userName: reply.userName,
                                        userAvatar: reply.userAvatar,
                                        content: reply.content,
                                        time: reply.createdAt,
                                        replies: [],
                                        parentId: reply.parentId,
                                        onReplyClick: handleReplyClick,
                                        isReplying: reply.id === replyingCommentItemId,
                                        onSubmitReply: handleSubmitReply,
                                    }))}
                                    onReplyClick={handleReplyClick}
                                    isReplying={item.id === replyingCommentItemId}
                                    onSubmitReply={handleSubmitReply}
                                />
                            ))}
                    </View>
                </View>
                <View style={[{ padding: 10 }]}>
                    <Text style={styles.label}>Phí vận chuyển</Text>
                    <View>
                        {shippingFeeItems.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[styles.dFlexSpBetween, styles.shippingFeeItem]}
                            >
                                <Text style={{ fontSize: 17 }}>{item.title}</Text>
                                <Text style={{ fontSize: 14, color: "blue" }}>{item.time}</Text>
                                <Text
                                    style={{
                                        fontSize: 17,
                                        color: colors.primary,
                                        fontWeight: "500",
                                    }}
                                >
                                    {formatMoney(item.price)}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* <FlatList
            data={shippingFeeItems}
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled={true}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.dFlexSpBetween, styles.shippingFeeItem]}
              >
                <Text style={{ fontSize: 17 }}>{item.title}</Text>
                <Text style={{ fontSize: 14, color: "blue" }}>{item.time}</Text>
                <Text
                  style={{
                    fontSize: 17,
                    color: colors.primary,
                    fontWeight: 500,
                  }}
                >
                  {formatMoney(item.price)}
                </Text>
              </TouchableOpacity>
            )}
          /> */}
                </View>
                <View style={[{ padding: 10 }]}>
                    <Text style={styles.label}>Xem thêm sản phẩm từ người bán</Text>
                    <FlatList
                        data={productOfSalers}
                        horizontal={true}
                        keyExtractor={(item, index) => index.toString()}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <ProductItem
                                id={item.id}
                                name={item.name}
                                price={item.price}
                                thumbnail={item.thumbnail}
                            />
                        )}
                    />
                </View>
                <View style={[{ padding: 10 }]}>
                    <Text style={[styles.label, { marginBottom: 10 }]}>
                        Có thể bạn quan tâm
                    </Text>
                    {/* <FlatList
            data={products}
            nestedScrollEnabled={true}
            keyExtractor={(item) => item.link}
            renderItem={({ item }: { item: ProductItem }) => (
              <ProductItem
                name={item.name}
                image={item.image}
                price={item.price}
                link={item.link}
              />
            )}
            numColumns={2}
          /> */}
                </View>
            </ScrollView>
            <View style={styles.bottomBarContainer}>
                <SimpleButton
                    title="Thêm vào giỏ hàng"
                    onPress={handleOpenBottomSheet}
                    style={{
                        flex: 1,
                        marginHorizontal: 5,
                        backgroundColor: colors.darkPrimary,
                    }}
                    textColor="white"
                />
                <SimpleButton
                    title="Mua ngay"
                    onPress={handlePress}
                    style={{
                        flex: 1,
                        marginHorizontal: 5,
                        backgroundColor: colors.primary,
                    }}
                    textColor="white"
                />
            </View>
            <ClassificationSelection />
        </DefaultLayout>
    );
}

export default ProductDetail;

const styles = StyleSheet.create({
    container: {
        // padding: 15,
        // marginTop: 40,
        // backgroundColor: '#fff'
        position: "relative",
    },
    dFlex: {
        flexDirection: "row",
        alignItems: "center",
    },
    inputWrapper: {
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: 7,
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    inputText: {
        padding: 10,
        flex: 1,
        borderWidth: 0,
    },
    inputFocused: {
        borderWidth: 0,
    },
    dFlexSpBetween: {
        flexDirection: "row", // xếp ngang
        justifyContent: "space-between", // cách đều nhau
        alignItems: "center",
    },
    title: {
        fontSize: 25,
        fontWeight: "500",
    },
    price: {
        color: colors.primary,
        fontWeight: "700",
        fontSize: 25,
    },
    description: {
        fontSize: 17,
        backgroundColor: "#ddd",
        padding: 10,
        borderRadius: 7,
    },

    label: {
        fontSize: 17,
        fontWeight: "400",
        color: "gray",
    },
    icon: {
        padding: 10,
    },
    image: {
        width: 100,
        height: 100,
    },
    productOfSalerItem: {
        padding: 4,
        borderRadius: 7,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: colors.primary,
        margin: 10,
        backgroundColor: "#fff",
    },
    shippingFeeItem: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 7,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: colors.primary,
        margin: 10,
    },

    bottomBarContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        flexDirection: "row",
        backgroundColor: "#fff",
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: "#ddd",
        justifyContent: "space-between",
    },
    cartBtn: {
        flex: 1,
        backgroundColor: "#ccc",
        padding: 12,
        borderRadius: 5,
        marginRight: 5,
        alignItems: "center",
    },
    buyBtn: {
        flex: 1,
        backgroundColor: "red",
        padding: 12,
        borderRadius: 5,
        marginLeft: 5,
        alignItems: "center",
    },
    btnText: {
        color: "white",
        fontWeight: "bold",
    },
    inputQty: {
        padding: 10,
        // borderWidth: 1,
        borderRadius: 7,
        fontSize: 35,
        width: 80,
        backgroundColor: colors.blurPrimary,
        color: colors.darkPrimary,
        textAlign: "center",
    },
    goBackBtn: {
        padding: 10,
        paddingLeft: 0,
        position: "absolute",
        top: 10,
        left: 10,
        zIndex: 1,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.2)",
        justifyContent: "center",
        alignItems: "center",
    },
    popupContainer: {
        backgroundColor: "#fff",
        padding: 24,
        borderRadius: 12,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    popupText: {
        fontSize: 18,
        color: colors.primary,
        fontWeight: "bold",
    },
});
