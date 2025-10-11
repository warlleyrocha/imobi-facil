import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

import { GoogleIcon } from '@/components/Icons/GoogleIcon';
import { useGoogleAuth } from '@/hooks/useGoogleAuth';

const Auth = () => {
  const { loginWithGoogle, isLoading } = useGoogleAuth();

  return (
    <View>
      <TouchableOpacity
        disabled={isLoading}
        onPress={loginWithGoogle}
        className="h-[50px] w-[345px] flex-row items-center justify-center gap-[19px] rounded-[5px] bg-[#E6E6E6]">
        <GoogleIcon size={20} />
        {isLoading ? (
          <ActivityIndicator size="small" color="#111928" />
        ) : (
          <Text className="font-inter-light text-[#111928]">Continue com o Google</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Auth;
