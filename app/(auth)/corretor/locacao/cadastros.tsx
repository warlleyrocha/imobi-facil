import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useLocacao } from '~/lib/locacao/store';

type Aba = 'proprietarios' | 'inquilinos' | 'imoveis';

const ABAS: { chave: Aba; rotulo: string }[] = [
  { chave: 'proprietarios', rotulo: 'Proprietários' },
  { chave: 'inquilinos', rotulo: 'Inquilinos' },
  { chave: 'imoveis', rotulo: 'Imóveis' },
];

export default function Cadastros() {
  const router = useRouter();
  const { proprietarios, inquilinos, imoveis } = useLocacao();
  const [aba, setAba] = useState<Aba>('proprietarios');

  const itens = useMemo(() => {
    if (aba === 'proprietarios') {
      return proprietarios.map((item) => ({
        id: item.id,
        titulo: item.nome,
        subtitulo: [item.cpf, item.telefone].filter(Boolean).join(' · '),
        detalhe: item.pix ? `PIX ${item.pix}` : '',
      }));
    }
    if (aba === 'inquilinos') {
      return inquilinos.map((item) => ({
        id: item.id,
        titulo: item.nome,
        subtitulo: [item.cpf, item.telefone].filter(Boolean).join(' · '),
        detalhe: item.email ?? '',
      }));
    }
    return imoveis.map((item) => ({
      id: item.id,
      titulo: item.titulo,
      subtitulo: [item.endereco, item.cidade, item.uf].filter(Boolean).join(', '),
      detalhe: [item.tipo, item.status].filter(Boolean).join(' · '),
    }));
  }, [aba, imoveis, inquilinos, proprietarios]);

  return (
    <SafeAreaView className="flex-1 bg-[#F4F4F5]">
      <View className="flex-row items-center justify-between px-5 pb-3 pt-2">
        <TouchableOpacity
          onPress={() => router.back()}
          className="h-9 w-9 items-center justify-center">
          <Ionicons name="chevron-back" size={22} color="#111928" />
        </TouchableOpacity>
        <Text className="font-inter-bold text-[17px] text-[#111928]">Cadastros</Text>
        <View className="h-9 w-9" />
      </View>

      <View className="mx-5 mb-3 flex-row rounded-xl bg-white p-1">
        {ABAS.map((item) => {
          const ativo = item.chave === aba;
          return (
            <TouchableOpacity
              key={item.chave}
              onPress={() => setAba(item.chave)}
              className={`flex-1 items-center rounded-lg py-2 ${ativo ? 'bg-[#111928]' : ''}`}>
              <Text
                className={`font-inter-medium text-[11px] ${ativo ? 'text-white' : 'text-[#6B7280]'}`}>
                {item.rotulo}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <FlatList
        data={itens}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}
        renderItem={({ item }) => (
          <View className="mb-2 rounded-xl bg-white p-4">
            <Text className="font-inter-semibold text-[13px] text-[#111928]">{item.titulo}</Text>
            {item.subtitulo ? (
              <Text className="font-inter-light text-[12px] text-[#6B7280]">{item.subtitulo}</Text>
            ) : null}
            {item.detalhe ? (
              <Text className="mt-1 font-inter-light text-[11px] text-[#9CA3AF]">
                {item.detalhe}
              </Text>
            ) : null}
          </View>
        )}
        ListEmptyComponent={
          <Text className="font-inter-light text-[13px] text-[#6B7280]">
            Nada cadastrado ainda.
          </Text>
        }
      />
    </SafeAreaView>
  );
}
