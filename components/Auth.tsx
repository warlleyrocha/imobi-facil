import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

import { GoogleIcon } from '@/components/Icons/GoogleIcon';
import { useGoogleAuth } from '@/hooks/useGoogleAuth';

const Auth = () => {
  const { loginWithGoogle, loading, error } = useGoogleAuth();

  return (
    <View>
      <TouchableOpacity
        disabled={loading}
        onPress={loginWithGoogle}
        className="h-[50px] w-[345px] flex-row items-center justify-center gap-[19px] rounded-[5px] bg-[#E6E6E6]">
        <GoogleIcon size={20} />
        {loading ? (
          <ActivityIndicator size="small" color="#111928" />
        ) : (
          <Text className="font-inter-light text-[#111928]">Continue com o Google</Text>
        )}
      </TouchableOpacity>
      {error && <Text className="mt-2 text-red-600">{error}</Text>}
    </View>
  );
};

export default Auth;
