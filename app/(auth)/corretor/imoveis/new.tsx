import { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useRouter } from 'expo-router';
import { RadioGroup } from '~/components/RadioButton/RadioGroup';

const setaEsquerda = require('~/assets/arrow-left.png');

export default function FormProperty() {
  const router = useRouter();

  const options = [
    { label: 'Apartamento', value: 'Apartamento' },
    { label: 'Casa', value: 'Casa' },
    { label: 'Terreno', value: 'Terreno' },
    { label: 'Studio', value: 'Studio' },
    { label: 'Comercial', value: 'Comercial' },
  ];
  const [finalidade, setFinalidade] = useState<string | null>(null);
  const [option, setOption] = useState(null);

  return (
    <View className="flex-1 bg-[#F6F6F6] pt-[34px]">
      <ScrollView className="m-6 flex flex-1">
        {/*Header */}
        <View className="relative flex-row items-center justify-center pb-[33px]">
          <TouchableOpacity onPress={() => router.back()} className="absolute left-0 top-0">
            <Image source={setaEsquerda} className="h-6 w-6" />
          </TouchableOpacity>

          <Text className="text-[20px] font-bold">Novo Imóvel</Text>
        </View>

        {/*Basic infos */}
        <View>
          {/*Title section */}
          <Text className="pb-[6px] font-inter-medium text-[18px] text-[#374151]">
            Informações Básicas
          </Text>
          {/*Separator */}
          <View className="h-px w-full bg-cor-secundaria" />

          {/*Tilte property */}
          <View className="gap-[10px] pb-[12px] pt-[24px]">
            <Text className="font-mulish-medium text-[16px] text-dark-5">Título do Imóvel*</Text>
            <TextInput
              placeholder="Ex: Casa com 3 quartos"
              placeholderTextColor="#9CA3AF"
              style={{ color: '#1F2A37', fontSize: 16 }}
              className="rounded-[8px] border-[1px] border-[#DFE4EA] bg-[#FAFAFA] py-[12px] pl-[20px] pr-[16px]"
            />
          </View>

          {/*Propose */}
          <View className="gap-[10px] pb-[12px]">
            <Text className="font-mulish-medium text-[16px] text-dark-5">Finalidade*</Text>
            <RadioGroup
              options={[
                { label: 'Venda', value: 'venda' },
                { label: 'Aluguel', value: 'aluguel' },
              ]}
              selectedValue={finalidade}
              onSelect={setFinalidade}
              layout="row"
            />
          </View>

          {/* Type of property*/}
          <View>
            <Text className="pb-[10px] font-mulish-medium text-[16px] text-dark-5">
              Tipo de Imóvel*
            </Text>
            <Dropdown
              style={{
                height: 50,
                borderColor: '#DFE4EA',
                borderWidth: 1,
                borderRadius: 8,
                paddingHorizontal: 20,
                backgroundColor: '#FAFAFA',
                paddingVertical: 12,
              }}
              data={options}
              labelField="label"
              valueField="value"
              placeholder="Selecione o tipo"
              value={option}
              onChange={(item) => setOption(item.value)}
            />
          </View>

          {/*Price and area */}
          <View className="gap-[10px] pt-[12px]">
            {/* Linha de labels e inputs alinhados */}
            <View className="flex-row gap-[20px]">
              {/* Coluna 1 - Preço */}
              <View className="flex-1">
                <Text className="pb-[10px] font-mulish-medium text-[16px] text-dark-5">Preço*</Text>
                <TextInput
                  placeholder="0.00"
                  placeholderTextColor="#9CA3AF"
                  style={{
                    color: '#1F2A37',
                    fontSize: 16,
                  }}
                  className="h-[52px] rounded-[8px] border border-stroke bg-white py-[12px] pl-[20px] pr-[16px]"
                />
              </View>

              {/* Coluna 2 - Área útil */}
              <View className="flex-1">
                <Text className="pb-[10px] font-mulish-medium text-[16px] text-dark-5">
                  Área útil*
                </Text>
                <TextInput
                  placeholder="000m²"
                  placeholderTextColor="#9CA3AF"
                  style={{
                    color: '#1F2A37',
                    fontSize: 16,
                  }}
                  className="h-[52px] rounded-[8px] border border-stroke bg-white py-[12px] pl-[20px] pr-[16px]"
                />
              </View>
            </View>
          </View>

          {/*Description */}
          <View className="pt-[12px]">
            <Text className="pb-[10px] font-mulish-medium text-[16px] text-dark-5">Descrição</Text>

            <TextInput
              className="h-[120px] rounded-[6px] border border-stroke bg-white p-[20px]"
              placeholder="Ex: Casa ampla com quintal, pronta para morar."
              placeholderTextColor="#9CA3AF"
              style={{
                color: '#1F2A37',
                fontSize: 16,
              }}
              multiline={true}
              textAlignVertical="top"
              maxLength={50}
            />

            <View className="w-full items-end pt-[10px]">
              <Text className="font-mulish text-[14px] text-texto-c-primario">0/50</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
