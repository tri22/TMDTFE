import { colors } from "@/baseStyle/Style";
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  StyleSheet,
  View,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const { width } = Dimensions.get('window');


type MyCarouselProps = {
  images: (string | ImageSourcePropType)[];
  carouselWidth? : number,
  carouselHeight? : number,
};

function MyCarousel(props: MyCarouselProps) {
  const { images, carouselWidth, carouselHeight,  } = props;
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <View style={styles.carouselWrapper}>
      <Carousel
        width={carouselWidth?carouselWidth:width}
        height={carouselHeight? carouselHeight: 350}
        data={images}
        loop
        scrollAnimationDuration={300}
        onSnapToItem={(index) => setCurrentIndex(index)}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image
              source={typeof item === 'string' ? { uri: item } : item}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        )}
      />

      {/* Pagination dots đè lên hình ảnh */}
      <View style={styles.dotContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === currentIndex ? styles.activeDot : {},
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  carouselWrapper: {
    position: 'relative',
  },
  itemContainer: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  dotContainer: {
    position: 'absolute',
    bottom: 15, 
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.blurPrimary, 
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: colors.primary,
    width: 8,
    height: 8,
  },
});

export default MyCarousel;
