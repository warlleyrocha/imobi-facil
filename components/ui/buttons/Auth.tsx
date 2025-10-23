import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

import { GoogleIcon } from '~/components/icons/GoogleIcon';

interface AuthProps {
  onPress: () => void;
  loading: boolean;
}

const Auth = ({ onPress, loading }: AuthProps) => {
  return (
    <View>
      <TouchableOpacity
        disabled={loading}
        onPress={onPress}
        className="h-[50px] w-[345px] flex-row items-center justify-center gap-[19px] rounded-[5px] bg-[#E6E6E6]">
        <GoogleIcon size={20} />
        {loading ? (
          <ActivityIndicator size="small" color="#111928" />
        ) : (
          <Text className="font-inter-light text-[#111928]">Continue com o Google</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Auth;
