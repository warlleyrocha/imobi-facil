import { Text, View } from 'react-native';

import { EditScreenInfo } from './EditScreenInfo';

type ScreenContentProps = {
  title: string;
  path: string;
  children?: React.ReactNode;
};

export const ScreenContent = ({ title, path, children }: ScreenContentProps) => {
  return (
    <View className="items-center flex-1 justify-center">
      <Text className="text-xl font-bold">{title}</Text>
      <View className="h-[1px] my-7 w-4/5 bg-gray-200" />
      <EditScreenInfo path={path} />
      {children}
    </View>
  );
};
