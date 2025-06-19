import React, { useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

type Props = {
  name?: string;
  style?: StyleProp<ViewStyle>;
  image?: ImageSourcePropType;
  content?: string;
  time?: string;
  replies?: Props[];
  level?: number; // cấp độ comment
};

function CommentItem({ name,
  style,
  image,
  content,
  time,
  replies = [],
  level = 0, }: Props) {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleSendReply = () => {
    console.log('Reply:', replyText);
    setReplyText('');
    setShowReplyInput(false);
    // TODO: emit lên cha hoặc xử lý thêm comment
  };

  console.log("relies: "+ replies.length);

  return (
    <View style={[styles.commentWrapper, { marginLeft: level * 20 }]}>
      <View style={styles.dFlex}>
        <Image source={image} style={styles.image} />
        <View style={{ flex: 1 }}>
          <View style={styles.contentContainer}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.contentText}>{content}</Text>
          </View>

          <View style={styles.footerRow}>
            <Text style={styles.time}>{time}</Text>
            <TouchableOpacity onPress={() => setShowReplyInput(!showReplyInput)}>
              <Text style={styles.reply}>Phản hồi</Text>
            </TouchableOpacity>
          </View>

          {showReplyInput && (
            <View style={styles.replyInputContainer}>
              <TextInput
                style={styles.input}
                value={replyText}
                onChangeText={setReplyText}
                placeholder="Nhập phản hồi..."
                multiline
              />
              <TouchableOpacity onPress={handleSendReply}>
                <Text style={styles.sendBtn}>Gửi</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* {replies.length > 0 && (
            <View style={styles.repliesContainer}>
              {replies.map((reply, idx) => (
                <CommentItem key={idx} {...reply} style={{ marginTop: 10 }} />
              ))}
            </View>
          )} */}
        </View>
      </View>
      {replies.length > 0 && (
        <View style={styles.repliesContainer}>
          {replies.map((reply, idx) => (
            <CommentItem
              key={idx}
              {...reply}
              level={level + 1} // tăng cấp độ khi render con
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
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  contentContainer: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 4,
  },
  name: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 2,
  },
  contentText: {
    fontSize: 15,
  },
  time: {
    fontSize: 13,
    color: '#888',
  },
  reply: {
    fontSize: 13,
    color: '#007bff',
    marginLeft: 16,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  replyInputContainer: {
    marginTop: 8,
    paddingRight: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    fontSize: 14,
    marginBottom: 6,
  },
  sendBtn: {
    alignSelf: 'flex-end',
    color: '#007bff',
    fontWeight: '500',
  },
  repliesContainer: {
    marginTop: 8,
    paddingLeft: 20,
    borderLeftWidth: 1,
    borderLeftColor: '#ddd',
  },
});


export default CommentItem;
