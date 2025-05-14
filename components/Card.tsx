// components/ui/Card.tsx
import React, { PropsWithChildren } from "react";
import { View, ViewProps } from "react-native";

interface CardProps extends ViewProps {
  className?: string;
}

const Card: React.FC<PropsWithChildren<CardProps>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <View className={`bg-white p-4 rounded-2xl shadow ${className}`} {...props}>
      {children}
    </View>
  );
};

export default Card;
