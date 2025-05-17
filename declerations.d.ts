// declarations.d.ts
declare module 'react-native-vector-icons/FontAwesome';
declare module 'react-native-vector-icons/MaterialIcons';
declare module 'react-native-vector-icons/Ionicons';
// thêm các module icon khác nếu dùng
// declarations.d.ts
declare module '*.svg' {
    import React from 'react';
    import { SvgProps } from 'react-native-svg';
    const content: React.FC<SvgProps>;
    export default content;
  }
  