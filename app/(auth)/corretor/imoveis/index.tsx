import CirclePlusIcon from '@/assets/icons-svg/circle-plus.svg';
import ForSaleImage from '@/assets/icons-svg/for-sale.svg';
import { useRouter } from 'expo-router';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FormDataWithId } from '@/types/formProperty';
import LocationOnIcon from '@/assets/icons-svg/location_on.svg';
import OptionIcon from '@/assets/icons-svg/option.svg';
import EditIcon from '@/assets/icons-svg/pencil-alt.svg';
import TrashIcon from '@/assets/icons-svg/trash.svg';
import NewFolderIcon from '@/assets/icons-svg/create_new_folder_black.svg';

export default function MyProperties() {
  const router = useRouter();
  const setaEsquerda = require('~/assets/arrow-left.png');

  const [propertyList, setPropertyList] = useState<FormDataWithId[]>([]);
  const [menuVisible, setMenuVisible] = useState<string | null>(null); // ID do imóvel com menu aberto
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null);

  // Carregar imóveis do AsyncStorage sempre que a tela for focada
  useEffect(() => {
    const loadProperties = async () => {
      try {
        const savedData = await AsyncStorage.getItem('formPropertyData');
        console.log('Raw do AsyncStorage:', savedData);

        if (savedData) {
          let parsedList: FormDataWithId[] = JSON.parse(savedData);

          // Se não for array (cadastrado antes como único), transforma em array
          if (!Array.isArray(parsedList)) {
            parsedList = [parsedList];
          }

          setPropertyList(parsedList);
        } else {
          setPropertyList([]);
        }
      } catch (error) {
        console.error('Erro ao carregar imóveis:', error);
      }
    };

    loadProperties();
  }, []); // Você pode adicionar dependência para re-carregar quando voltar da tela de detalhes

  const handleEdit = (propertyId: string) => {
    console.log('Editar imóvel:', propertyId);
    // Navegar para tela de edição
    router.push({
      pathname: '/(auth)/corretor/imoveis/new',
      params: { id: propertyId },
    });
  };

  const handleAddToFolder = (propertyId: string) => {
    console.log('Adicionar à pasta:', propertyId);
    // Implementar lógica de adicionar à pasta
  };

  const handleDeleteClick = (propertyId: string) => {
    setPropertyToDelete(propertyId);
    setDeleteConfirmVisible(true);
  };

  const confirmDelete = async () => {
    if (!propertyToDelete) return;

    try {
      const updatedList = propertyList.filter((p) => p.id !== propertyToDelete);
      await AsyncStorage.setItem('formPropertyData', JSON.stringify(updatedList));
      setPropertyList(updatedList);
      console.log('Imóvel deletado:', propertyToDelete);
    } catch (error) {
      console.error('Erro ao deletar imóvel:', error);
    } finally {
      setDeleteConfirmVisible(false);
      setPropertyToDelete(null);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmVisible(false);
    setPropertyToDelete(null);
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="px-[16px] pt-[55px]">
        <View className="relative flex-row items-center justify-center pb-[32px]">
          <TouchableOpacity onPress={() => router.back()} className="absolute left-0 top-1">
            <Image source={setaEsquerda} className="h-6 w-6" />
          </TouchableOpacity>

          <Text className="font-mulish-bold text-[20px] text-dark">Meus Imóveis</Text>
        </View>

        {/* Lista de imóveis */}
        <View className="gap-[16px]">
          {propertyList.length === 0 && <ForSaleImage />}

          {propertyList.map((property) => (
            <TouchableOpacity
              key={property.id}
              onPress={() =>
                router.push({
                  pathname: '/(auth)/corretor/imoveis/[id]',
                  params: { id: property.id },
                })
              }
              className="flex-row gap-4 rounded-[8px]  border border-stroke bg-white shadow-md">
              {/* Imagem */}
              {property.midias?.[0] && (
                <Image
                  source={{ uri: property.midias[0] }}
                  style={{ width: 132, height: 136, borderRadius: 8 }}
                />
              )}

              {/* Conteúdo */}
              <View className="flex-1 flex-col justify-between py-[8px] pr-[12px]">
                <View className="flex-row justify-between">
                  <Text
                    className="flex-shrink font-inter-semibold text-[12px] text-dark"
                    numberOfLines={2}>
                    {property.titulo}
                  </Text>
                  <TouchableOpacity
                    onPress={(e) => {
                      e.stopPropagation(); // Evita abrir os detalhes do imóvel
                      setMenuVisible(property.id);
                    }}>
                    <OptionIcon />
                  </TouchableOpacity>
                </View>

                {/* Localização */}
                <View className="flex-row items-center justify-start gap-[4px] pt-[14px]">
                  <LocationOnIcon />
                  <Text className="w-[92px] font-inter text-[12px] text-dark">
                    {property.cidade}, {property.estado}
                  </Text>
                  <View className="h-[24px] items-center justify-center rounded-full bg-green-light px-[10px]">
                    <Text className="font-inter-medium text-[10px] text-green-dark">
                      {property.finalidade}
                    </Text>
                  </View>
                </View>

                {/* Preço */}
                <Text className="mt-auto font-inter-semibold text-[16px] text-cor-primaria">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(Number(property.preco))}
                </Text>
              </View>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            className="h-[44px] w-full flex-row items-center justify-center gap-[8px] rounded-lg bg-cor-primaria px-[24px] py-[12px]"
            onPress={() => router.push('/(auth)/corretor/imoveis/new')}>
            <CirclePlusIcon />
            <Text className="font-mulish-medium text-[16px] text-white">Novo imóvel</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal do Menu Suspenso */}
      <Modal
        visible={menuVisible !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(null)}>
        <Pressable className="flex-1 bg-black/30" onPress={() => setMenuVisible(null)}>
          <View className="absolute right-[28px] top-[150px] w-[200px] rounded-[8px] bg-white shadow-2xl">
            {/* Editar Imóvel */}
            <TouchableOpacity
              onPress={() => {
                if (menuVisible) handleEdit(menuVisible);
                setMenuVisible(null);
              }}
              className="flex-row gap-[10px] px-[16px] py-[14px] ">
              <EditIcon />
              <Text className="font-mulish-medium text-[16px] leading-[18px] text-dark">
                Editar Imóvel
              </Text>
            </TouchableOpacity>

            {/* Adicionar à pasta */}
            <TouchableOpacity
              onPress={() => {
                if (menuVisible) handleAddToFolder(menuVisible);
                setMenuVisible(null);
              }}
              className="flex-row gap-[10px] px-[16px] py-[14px]">
              <NewFolderIcon />
              <Text className="font-mulish-medium text-[16px] leading-[18px] text-dark">
                Adicionar a pasta
              </Text>
            </TouchableOpacity>

            {/* Deletar */}
            <TouchableOpacity
              onPress={() => {
                if (menuVisible) handleDeleteClick(menuVisible);
                setMenuVisible(null);
              }}
              className="flex-row gap-[10px] px-[16px] py-[14px]">
              <TrashIcon />
              <Text className="text-red-dark font-mulish-medium text-[16px] leading-[18px]">
                Excluir imóvel
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      {/* Modal de Confirmação de Exclusão */}
      <Modal
        visible={deleteConfirmVisible}
        transparent
        animationType="fade"
        onRequestClose={cancelDelete}>
        <View className="flex-1 items-center justify-center bg-black/50">
          <View className="mx-[24px] h-[222px] w-[343px]  rounded-2xl bg-white p-[24px]">
            {/* Título */}
            <Text className="font-inter-medium text-[18px] leading-[22px] text-dark">
              Deseja excluir este imóvel?
            </Text>

            {/* Mensagem */}
            <Text className="mt-[24px] font-mulish text-[16px] leading-[18px] text-dark-5">
              Ao excluir, todos as informações sobre o imóvel serão removidos.
            </Text>

            {/* Botões */}
            <View className="mt-[24px] flex-row gap-[12px]">
              {/* Cancelar */}
              <TouchableOpacity
                onPress={cancelDelete}
                className="flex-1 items-center justify-center rounded-lg  px-[24px] py-[12px]">
                <Text className="font-mulish-semibold text-[16px] leading-[18px] text-cor-primaria">
                  Cancelar
                </Text>
              </TouchableOpacity>

              {/* Confirmar */}
              <TouchableOpacity
                onPress={confirmDelete}
                className="flex-1 items-center justify-center rounded-lg bg-[#F23030] px-[28px] py-[13px]">
                <Text className="font-mulish-semibold text-[16px] text-white">Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
