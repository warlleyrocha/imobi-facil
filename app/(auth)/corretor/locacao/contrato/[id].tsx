import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MESES, moeda, useLocacao } from '~/lib/locacao/store';

function Linha({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <View className="flex-row items-center justify-between border-b border-[#F1F1F2] py-2">
      <Text className="font-inter-light text-[12px] text-[#6B7280]">{rotulo}</Text>
      <Text className="font-inter-medium text-[12px] text-[#111928]">{valor}</Text>
    </View>
  );
}

export default function ContratoDetalhe() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const {
    contratoPorId,
    pagamentosDoContrato,
    alternarPagamento,
    nomeProprietario,
    nomeInquilino,
    descricaoImovel,
    proprietarios,
    inquilinos,
  } = useLocacao();

  const contrato = contratoPorId(String(id ?? ''));
  const pagamentos = pagamentosDoContrato(String(id ?? ''));

  if (!contrato) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-[#F4F4F5]">
        <Text className="font-inter-light text-[13px] text-[#6B7280]">
          Contrato não encontrado.
        </Text>
        <TouchableOpacity onPress={() => router.back()} className="mt-3">
          <Text className="font-inter-semibold text-[13px] text-[#111928]">Voltar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const proprietario = proprietarios.find((item) => item.id === contrato.proprietarioId);
  const inquilino = inquilinos.find((item) => item.id === contrato.inquilinoId);
  const totalPago = pagamentos
    .filter((pagamento) => pagamento.status === 'Pago')
    .reduce((total, pagamento) => total + pagamento.valor, 0);

  return (
    <SafeAreaView className="flex-1 bg-[#F4F4F5]">
      <View className="flex-row items-center justify-between px-5 pb-3 pt-2">
        <TouchableOpacity
          onPress={() => router.back()}
          className="h-9 w-9 items-center justify-center">
          <Ionicons name="chevron-back" size={22} color="#111928" />
        </TouchableOpacity>
        <Text className="font-inter-bold text-[17px] text-[#111928]">{contrato.id}</Text>
        <View className="h-9 w-9" />
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 32 }}>
        <View className="rounded-xl bg-white p-4">
          <Text className="font-inter-bold text-[15px] text-[#111928]">
            {nomeInquilino(contrato.inquilinoId)}
          </Text>
          <Text className="font-inter-light text-[12px] text-[#6B7280]">
            {descricaoImovel(contrato.imovelId)}
          </Text>
          <View className="mt-3">
            <Linha rotulo="Proprietário" valor={nomeProprietario(contrato.proprietarioId)} />
            <Linha rotulo="CPF do inquilino" valor={inquilino?.cpf ?? '—'} />
            <Linha rotulo="Telefone" valor={inquilino?.telefone ?? '—'} />
            <Linha rotulo="PIX do proprietário" valor={proprietario?.pix ?? '—'} />
            <Linha rotulo="Aluguel" valor={moeda(contrato.valor)} />
            <Linha rotulo="Condomínio" valor={moeda(contrato.condominio)} />
            <Linha rotulo="IPTU" valor={moeda(contrato.iptu)} />
            <Linha rotulo="Compesa" valor={moeda(contrato.compesa)} />
            <Linha rotulo="Taxa de administração" valor={moeda(contrato.taxaAdm)} />
            <Linha rotulo="Repasse ao proprietário" valor={moeda(contrato.repasse)} />
            <Linha rotulo="Vencimento" valor={`todo dia ${contrato.vencimento}`} />
            <Linha rotulo="Vigência" valor={`${contrato.inicio || '—'} a ${contrato.fim || '—'}`} />
          </View>
        </View>

        <Text className="mb-2 mt-5 font-inter-bold text-[14px] text-[#111928]">
          Mensalidades ({moeda(totalPago)} recebido no ano)
        </Text>
        <Text className="mb-3 font-inter-light text-[11px] text-[#6B7280]">
          Toque no mês para marcar como pago ou voltar para pendente.
        </Text>

        <View className="flex-row flex-wrap justify-between">
          {MESES.map((mes) => {
            const pagamento = pagamentos.find((item) => item.mes === mes);
            const pago = pagamento?.status === 'Pago';
            return (
              <TouchableOpacity
                key={mes}
                disabled={!pagamento}
                onPress={() => alternarPagamento(contrato.id, mes)}
                className={`mb-2 w-[23%] items-center rounded-lg px-1 py-3 ${
                  pago ? 'bg-[#DCFCE7]' : pagamento ? 'bg-white' : 'bg-[#EDEDEE]'
                }`}>
                <Text className="font-inter-medium text-[11px] text-[#111928]">{mes}</Text>
                <Text
                  className={`mt-1 font-inter-light text-[9px] ${
                    pago ? 'text-[#16A34A]' : 'text-[#9CA3AF]'
                  }`}>
                  {pagamento ? (pago ? 'pago' : 'aberto') : '—'}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
