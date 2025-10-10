import { useRouter } from 'expo-router';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

import EyeIcon from '@/assets/icons-svg/eyes-primary-color.svg';
// Importe seus ícones SVG aqui
import PencilAltIcon from '@/assets/icons-svg/pencil-alt-primary-color.svg';
import Settings from '@/assets/icons-svg/settings.svg';

interface MyAccountModalProps {
  visible: boolean;
  onClose: () => void;
}

interface MenuOption {
  id: string;
  icon: React.ComponentType<any>;
  label: string;
  onPress: () => void;
}

export function MyAccountModal({ visible, onClose }: MyAccountModalProps) {
  const router = useRouter();

  const handleEditBio = () => {
    handleClose(); // Fecha o modal primeiro
    router.push('/(auth)/corretor/profile/editBio'); // Navega para a tela
  };

  const handleClose = () => {
    onClose();
  };

  const menuOptions: MenuOption[] = [
    {
      id: '1',
      icon: PencilAltIcon,
      label: 'Editar Bio',
      onPress: handleEditBio,
    },
    {
      id: '2',
      icon: EyeIcon,
      label: 'Visualizar Bio',
      onPress: () => console.log('Visualizar Bio'),
    },
    {
      id: '3',
      icon: Settings,
      label: 'Configurações',
      onPress: () => console.log('Configurações'),
    },
  ];

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={handleClose}>
      <TouchableOpacity
        className="flex-1 items-center justify-center bg-black/50 p-[16px]"
        activeOpacity={1}
        onPress={handleClose}>
        <TouchableOpacity
          className="w-full max-w-[400px] rounded-[16px] bg-white p-[16px] shadow"
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}>
          <View>
            <Text className="font-mulish-bold text-[16px] text-dark">Minha Conta</Text>
            <View className="mt-2 h-[1px] bg-green-500" />
          </View>

          <View className="mt-4 gap-3">
            {menuOptions.map((option) => {
              const Icon = option.icon;
              return (
                <TouchableOpacity
                  key={option.id}
                  className="flex-row items-center gap-3 rounded-[8px] border border-stroke px-[24px] py-[12px]"
                  onPress={option.onPress}>
                  <Icon width={20} height={20} />
                  <Text className="font-mulish-medium text-[16px] leading-[18px] text-cor-primaria">
                    {option.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}
