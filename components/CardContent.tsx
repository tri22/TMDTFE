// components/ui/CardContent.tsx
import React, { PropsWithChildren } from "react";
import { View, ViewProps } from "react-native";

interface CardContentProps extends ViewProps {
  className?: string;
}

const CardContent: React.FC<PropsWithChildren<CardContentProps>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <View className={`space-y-2 ${className}`} {...props}>
      {children}
    </View>
  );
};

export default CardContent;
