import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MESES, mesAtual, moeda, useLocacao } from '~/lib/locacao/store';
import type { MesSigla } from '~/lib/locacao/types';

function Cartao({ titulo, valor, destaque }: { titulo: string; valor: string; destaque?: string }) {
  return (
    <View className="mb-3 w-[48%] rounded-xl bg-white p-4 shadow-sm">
      <Text className="font-inter-light text-[11px] uppercase tracking-wide text-[#6B7280]">
        {titulo}
      </Text>
      <Text className="mt-1 font-inter-bold text-[18px] text-[#111928]">{valor}</Text>
      {destaque ? (
        <Text className="mt-1 font-inter-light text-[11px] text-[#6B7280]">{destaque}</Text>
      ) : null}
    </View>
  );
}

export default function PainelLocacao() {
  const router = useRouter();
  const { contratos, carregando, resumoDoMes, pagamentos, nomeInquilino, descricaoImovel } =
    useLocacao();
  const [mes, setMes] = useState<MesSigla>(mesAtual());
  const resumo = useMemo(() => resumoDoMes(mes), [resumoDoMes, mes]);

  const pendencias = useMemo(
    () =>
      pagamentos
        .filter((pagamento) => pagamento.mes === mes && pagamento.status !== 'Pago')
        .slice(0, 8),
    [pagamentos, mes]
  );

  return (
    <SafeAreaView className="flex-1 bg-[#F4F4F5]">
      <View className="flex-row items-center justify-between px-5 pb-3 pt-2">
        <TouchableOpacity
          onPress={() => router.back()}
          className="h-9 w-9 items-center justify-center">
          <Ionicons name="chevron-back" size={22} color="#111928" />
        </TouchableOpacity>
        <Text className="font-inter-bold text-[17px] text-[#111928]">Locação</Text>
        <TouchableOpacity
          onPress={() => router.push('/corretor/locacao/cadastros')}
          className="h-9 w-9 items-center justify-center">
          <Ionicons name="people-outline" size={20} color="#111928" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 32 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
          {MESES.map((sigla) => {
            const ativo = sigla === mes;
            return (
              <TouchableOpacity
                key={sigla}
                onPress={() => setMes(sigla)}
                className={`mr-2 rounded-full px-4 py-2 ${ativo ? 'bg-[#111928]' : 'bg-white'}`}>
                <Text
                  className={`font-inter-medium text-[12px] ${ativo ? 'text-white' : 'text-[#111928]'}`}>
                  {sigla}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View className="flex-row flex-wrap justify-between">
          <Cartao titulo="Previsto no mês" valor={moeda(resumo.previsto)} />
          <Cartao
            titulo="Recebido"
            valor={moeda(resumo.recebido)}
            destaque={`${resumo.contratosAtivos} contratos ativos`}
          />
          <Cartao
            titulo="Em aberto"
            valor={moeda(resumo.pendente)}
            destaque={`${resumo.inadimplentes} cobrança(s)`}
          />
          <Cartao
            titulo="Repasse a pagar"
            valor={moeda(resumo.repassePendente)}
            destaque={`já repassado ${moeda(resumo.repassePago)}`}
          />
        </View>

        <TouchableOpacity
          onPress={() => router.push('/corretor/locacao/contratos')}
          className="mt-2 flex-row items-center justify-between rounded-xl bg-[#111928] px-4 py-4">
          <Text className="font-inter-semibold text-[14px] text-white">
            Ver contratos ({contratos.length})
          </Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
        </TouchableOpacity>

        <Text className="mb-2 mt-6 font-inter-bold text-[14px] text-[#111928]">
          Em aberto em {mes}
        </Text>

        {carregando ? (
          <Text className="font-inter-light text-[13px] text-[#6B7280]">Carregando…</Text>
        ) : pendencias.length === 0 ? (
          <View className="rounded-xl bg-white p-4">
            <Text className="font-inter-light text-[13px] text-[#6B7280]">
              Nada em aberto nesse mês. Tudo pago.
            </Text>
          </View>
        ) : (
          pendencias.map((pagamento) => (
            <TouchableOpacity
              key={`${pagamento.contratoId}-${pagamento.mes}`}
              onPress={() => router.push(`/corretor/locacao/contrato/${pagamento.contratoId}`)}
              className="mb-2 rounded-xl bg-white p-4">
              <Text className="font-inter-semibold text-[13px] text-[#111928]">
                {nomeInquilino(contratoInquilino(pagamento.contratoId))}
              </Text>
              <Text className="font-inter-light text-[12px] text-[#6B7280]">
                {descricaoImovel(contratoImovel(pagamento.contratoId))}
              </Text>
              <View className="mt-2 flex-row items-center justify-between">
                <Text className="font-inter-medium text-[13px] text-[#111928]">
                  {moeda(pagamento.valor)}
                </Text>
                <Text className="font-inter-light text-[11px] text-[#DC2626]">
                  {pagamento.status}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );

  function contratoInquilino(contratoId: string) {
    return contratos.find((contrato) => contrato.id === contratoId)?.inquilinoId ?? null;
  }

  function contratoImovel(contratoId: string) {
    return contratos.find((contrato) => contrato.id === contratoId)?.imovelId ?? null;
  }
}
