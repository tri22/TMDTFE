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
import axiosInstance, { SERVER_URL_BASE, showToast } from "./axiosInstance";

export async function submitComment(
  productId: number,
  content: string,
  parentId: number,
  level: number
): Promise<Comment[]> {
  console.log("submitComment");
    const userIdStr = await AsyncStorage.getItem('userId');
  const userId = userIdStr ? parseInt(userIdStr) : null;

  if (userId === null) {
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
        userAvatar: SERVER_URL_BASE + "/" + item.userAvatar,
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
                userAvatar: SERVER_URL_BASE + "/" + reply.userAvatar,
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
