import { Image, ImageSourcePropType, StyleProp, View, ViewStyle } from 'react-native';

interface ImageWithShadowProps {
  source: ImageSourcePropType;
  className?: string;
  imageClassName?: string;
  style?: StyleProp<ViewStyle>;
}

const ImageWithShadow = ({
  source,
  className = '',
  imageClassName = '',
  style,
}: ImageWithShadowProps) => (
  <View
    className={`rounded-[14px] shadow-lg ${className}`}
    style={[
      {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 1,
      },
      style,
    ]}>
    <Image source={source} className={`rounded-lg ${imageClassName}`} />
  </View>
);

export default ImageWithShadow;
