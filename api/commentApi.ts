//lay userIds
// const userId = await getUserId();
// console.log('User ID:', userId);

// await axios.post('http://<ip>:8080/api/comments', {
//   userId: 1,
//   productId: 12,
//   content: 'Bình luận rất hay!',
//   parentId: 0, // nếu là bình luận cha
//   level: 0
// });
import { Comment } from "@/models/ProductDetailModel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance, { showToast } from "./axiosInstance";
import { SERVER_URL_BASE } from "./ipConstant";
interface User {
  id: number;
  name: string;
  // …các trường khác nếu có
}
export async function getUserId(): Promise<number | undefined> {
  try {
    const json = await AsyncStorage.getItem('user');   // "{"id":123,"name":"A"}" | null
    console.log("user: " + json);
    if (!json) return undefined;

    const user = JSON.parse(json) as { id?: number };
    return user.id;
  } catch (err) {
    console.error('Lỗi đọc user từ AsyncStorage', err);
    return undefined;
  }
}
export async function submitComment(
  productId: number,
  content: string,
  parentId: number,
  level: number
): Promise<Comment[]> {
  console.log("submitComment");
    let userId = await getUserId();
    console.log("userId: " + userId);
  
  if (userId === undefined) {
      showToast("error", "Bạn cần đăng nhập để bình luận.");
     throw new Error("Bạn cần đăng nhập để bình luận.");
    
  }
  try {
    const response = await axiosInstance.post<Comment[]>(
      `/comments`,
      {
        userId,
        productId,
        content,
        parentId,
        level,
      },
      {}
    );

    const responseData = response.data;

    const comments: Comment[] = responseData.map(
      (item: any): Comment => ({
        id: item.id,
        userId: item.userId,
        userName: item.userName,
        userAvatar: SERVER_BASE_URL + "/" + item.userAvatar,
        content: item.content,
        createdAt: new Date(item.createdAt),
        parentId: item.parentId,
        level: item.level,
        replies: item.replies
          ? item.replies.map(
              (reply: any): Comment => ({
                id: reply.id,
                userId: reply.userId,
                userName: reply.userName,
                userAvatar: SERVER_BASE_URL + "/" + reply.userAvatar,
                content: reply.content,
                createdAt: new Date(reply.createdAt),
                parentId: reply.parentId,
                level: reply.level,
                replies: reply.replies ?? null, // nếu có nested replies thì tiếp tục xử lý nếu cần
              })
            )
          : null,
      })
    );

    return comments;
  } catch (error: any) {
    // console.error(
    //   "Lỗi khi lấy sản phẩm theo category (paginated):",
    //   error?.response?.data || error?.message || error
    // );
    throw new Error("Không thể tải danh sách sản phẩm.");
  }
}
