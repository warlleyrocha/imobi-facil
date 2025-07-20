import { Link, Stack } from 'expo-router';

import { Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View className='items-center flex-1 justify-center p-5'>
        <Text className='text-xl font-bold'>{"This screen doesn't exist."}</Text>
        <Link href="/" className='mt-4 pt-4'>
          <Text className='text-base text-[#2e78b7]'>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}

