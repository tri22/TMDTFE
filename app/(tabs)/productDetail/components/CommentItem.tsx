import React, { useEffect, useRef, useState } from "react";
import {
    Image,
    StyleProp,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ViewStyle,
} from "react-native";

function getRelativeTime(date?: Date): string {
  if (!date) return "";

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) return "Vừa xong";
  if (diffMinutes < 60) return `${diffMinutes} phút trước`;
  if (diffHours < 24) return `${diffHours} giờ trước`;
  if (diffDays < 7) return `${diffDays} ngày trước`;

  // Nếu trên 7 ngày, trả về ngày định dạng dd/mm/yyyy
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

type Props = {
  id: number;
  userName?: string;
  style?: StyleProp<ViewStyle>;
  userAvatar?: string;
  content?: string;
  time?: Date;
  replies?: Props[];
  onReplyClick?: (id: number, userName: string, parentId: number) => void;
  isReplying?: boolean;
  parentId?: number;
  onSubmitReply?: (content: string) => void;
  onCancel? :() =>void
};

function CommentItem({
  id,
  userName,
  style,
  userAvatar,
  content,
  time,
  replies = [],
  onReplyClick,
  isReplying,
  parentId,
  onSubmitReply,
  onCancel,
}: Props) {
  const [replyText, setReplyText] = useState("");
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (isReplying) {
      setTimeout(() => inputRef.current?.focus(), 80);
      setReplyText(`${userName}, `);
    }
  }, [isReplying, userName]);

  const hanleCancel = () => {
    inputRef.current?.clear();
    inputRef.current?.blur();
    onCancel?.();
  }

  return (
    <View style={[styles.commentWrapper, {}]}>
      <View style={styles.dFlex}>
        <Image source={{ uri: userAvatar }} style={styles.image} />
        <View style={{ flex: 1 }}>
          <View style={styles.contentContainer}>
            <Text style={styles.name}>{userName}</Text>
            <Text style={styles.contentText}>{content}</Text>
          </View>

          <View style={styles.footerRow}>
            <Text style={styles.time}>{getRelativeTime(time)}</Text>
            <TouchableOpacity
              onPress={() =>
                onReplyClick?.(id || 0, userName || "", parentId || 0)
              }
            >
              <Text style={styles.reply}>Phản hồi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {isReplying && (
        <View style={styles.replyInputContainer}>
          <TextInput
            ref={inputRef}
            style={styles.input}
            value={replyText}
            onChangeText={setReplyText}
            placeholder="Nhập phản hồi..."
            multiline
          />
          <View style={styles.dFlexBetween}>
            <TouchableOpacity onPress={hanleCancel}>
              <Text style={styles.cancelSendBtn}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onSubmitReply?.(replyText || "")}>
              <Text style={styles.sendBtn}>Gửi</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {replies.length > 0 && (
        <View style={styles.repliesContainer}>
          {replies.map((reply, idx) => (
            <CommentItem
              key={idx}
              {...reply}
              replies={[]}
              parentId={id}
              style={{ marginTop: 10 }}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  commentWrapper: {
    marginBottom: 10,
  },
  dFlex: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  contentContainer: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 4,
  },
  name: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 2,
  },
  contentText: {
    fontSize: 15,
  },
  time: {
    fontSize: 13,
    color: "#888",
  },
  reply: {
    fontSize: 13,
    color: "#007bff",
    marginLeft: 16,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  replyInputContainer: {
    marginTop: 8,
    paddingRight: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 8,
    fontSize: 14,
    marginBottom: 6,
  },
  dFlexBetween: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between"
  },
  cancelSendBtn: {
    alignSelf: "flex-end",
    color: "gray",
    fontWeight: "500",
    marginRight: 40,
  },
  sendBtn: {
    alignSelf: "flex-end",
    color: "#007bff",
    fontWeight: "500",
  },
  repliesContainer: {
    marginTop: 8,
    paddingLeft: 20,
    borderLeftWidth: 1,
    borderLeftColor: "#ddd",
  },
});

export default CommentItem;
