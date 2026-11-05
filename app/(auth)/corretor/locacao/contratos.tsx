import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { mesAtual, moeda, useLocacao } from '~/lib/locacao/store';

export default function Contratos() {
  const router = useRouter();
  const { contratos, pagamentos, nomeInquilino, descricaoImovel, carregando } = useLocacao();
  const [busca, setBusca] = useState('');
  const mes = mesAtual();

  const lista = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return contratos
      .map((contrato) => {
        const pagamento = pagamentos.find(
          (item) => item.contratoId === contrato.id && item.mes === mes
        );
        return {
          contrato,
          inquilino: nomeInquilino(contrato.inquilinoId),
          imovel: descricaoImovel(contrato.imovelId),
          statusMes: pagamento?.status ?? 'Sem cobrança',
        };
      })
      .filter(({ inquilino, imovel, contrato }) => {
        if (!termo) return true;
        return (
          inquilino.toLowerCase().includes(termo) ||
          imovel.toLowerCase().includes(termo) ||
          contrato.id.toLowerCase().includes(termo)
        );
      })
      .sort((a, b) => a.inquilino.localeCompare(b.inquilino));
  }, [busca, contratos, descricaoImovel, mes, nomeInquilino, pagamentos]);

  return (
    <SafeAreaView className="flex-1 bg-[#F4F4F5]">
      <View className="flex-row items-center justify-between px-5 pb-3 pt-2">
        <TouchableOpacity
          onPress={() => router.back()}
          className="h-9 w-9 items-center justify-center">
          <Ionicons name="chevron-back" size={22} color="#111928" />
        </TouchableOpacity>
        <Text className="font-inter-bold text-[17px] text-[#111928]">Contratos</Text>
        <View className="h-9 w-9" />
      </View>

      <View className="mx-5 mb-3 flex-row items-center rounded-xl bg-white px-3">
        <Ionicons name="search" size={16} color="#6B7280" />
        <TextInput
          value={busca}
          onChangeText={setBusca}
          placeholder="Buscar por inquilino ou imóvel"
          placeholderTextColor="#9CA3AF"
          className="ml-2 flex-1 py-3 font-inter-light text-[13px] text-[#111928]"
        />
      </View>

      <FlatList
        data={lista}
        keyExtractor={(item) => item.contrato.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}
        ListEmptyComponent={
          <Text className="font-inter-light text-[13px] text-[#6B7280]">
            {carregando ? 'Carregando…' : 'Nenhum contrato encontrado.'}
          </Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/corretor/locacao/contrato/${item.contrato.id}`)}
            className="mb-2 rounded-xl bg-white p-4">
            <View className="flex-row items-start justify-between">
              <View className="flex-1 pr-3">
                <Text className="font-inter-semibold text-[13px] text-[#111928]">
                  {item.inquilino}
                </Text>
                <Text className="font-inter-light text-[12px] text-[#6B7280]">{item.imovel}</Text>
                <Text className="mt-1 font-inter-light text-[11px] text-[#9CA3AF]">
                  {item.contrato.id} · vence dia {item.contrato.vencimento}
                </Text>
              </View>
              <View className="items-end">
                <Text className="font-inter-bold text-[14px] text-[#111928]">
                  {moeda(item.contrato.valor)}
                </Text>
                <Text
                  className={`mt-1 font-inter-medium text-[11px] ${
                    item.statusMes === 'Pago' ? 'text-[#16A34A]' : 'text-[#DC2626]'
                  }`}>
                  {item.statusMes}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
