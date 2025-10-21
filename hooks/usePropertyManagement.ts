import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';

import { FormDataWithId } from '@/types/formProperty';

interface UsePropertyManagementOptions {
  onDeleteSuccess?: () => void;
}

export function usePropertyManagement(options: UsePropertyManagementOptions = {}) {
  const router = useRouter();
  const { onDeleteSuccess } = options;

  // Estados de propriedades
  const [propertyList, setPropertyList] = useState<FormDataWithId[]>([]);

  // Estado de busca propriedades
  const [searchQuery, setSearchQuery] = useState('');

  // Estados do menu suspenso
  const [menuVisible, setMenuVisible] = useState<string | null>(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  // Estados de exclusão
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null);

  // Carregar imóveis do AsyncStorage
  const loadProperties = async () => {
    try {
      const savedData = await AsyncStorage.getItem('formPropertyData');
      if (savedData) {
        let parsedList: FormDataWithId[] = JSON.parse(savedData);
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

  useEffect(() => {
    loadProperties();
  }, []);

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
      setDeleteConfirmVisible(false);
      setPropertyToDelete(null);

      // Callback opcional após exclusão
      if (onDeleteSuccess) {
        onDeleteSuccess();
      }
    } catch (error) {
      console.error('Erro ao deletar imóvel:', error);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmVisible(false);
    setPropertyToDelete(null);
  };

  const handleEditProperty = (propertyId: string) => {
    console.log('Editar imóvel:', propertyId);
    router.push({
      pathname: '/(auth)/corretor/(tabs)/imoveis/formProperty',
      params: { id: propertyId },
    });
  };

  const handleAddToFolder = (propertyId: string) => {
    console.log('Adicionar à pasta:', propertyId);
    // Implementar lógica de adicionar à pasta
  };

  // Lista filtrada com useMemo para otimização
  const filteredPropertyList = useMemo(() => {
    if (!searchQuery.trim()) {
      return propertyList;
    }

    const query = searchQuery.toLowerCase().trim();

    return propertyList.filter((property) => {
      // Busca pelo ID ou Título (case insensitive)
      const matchesId = property.id.toLowerCase().includes(query);
      const matchesTitle = property.titulo?.toLowerCase().includes(query);

      return matchesId || matchesTitle;
    });
  }, [propertyList, searchQuery]);

  return {
    // Estados
    propertyList,
    setPropertyList,
    menuVisible,
    setMenuVisible,
    menuPosition,
    setMenuPosition,
    deleteConfirmVisible,
    propertyToDelete,
    filteredPropertyList, // Nova lista filtrada
    searchQuery, // Novo estado de busca
    setSearchQuery, // Nova função de busca

    // Funções
    loadProperties,
    handleEditProperty,
    handleAddToFolder,
    handleDeleteClick,
    confirmDelete,
    cancelDelete,
  };
}
