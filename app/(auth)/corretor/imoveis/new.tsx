import { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useRouter } from 'expo-router';
import { RadioGroup } from '~/components/RadioButton/RadioGroup';
import AddImage from '@/assets/icons-svg/add-images.svg'
import UploadIcon from '@/assets/icons-svg/upload-photos.svg'

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
    <View className="flex-1 bg-[#F6F6F6]">
      <ScrollView className="px-[16px] pt-[55px]" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 64 }} >
        {/*Header */}
        <View className="relative flex-row items-center justify-center pb-[33px]">
          <TouchableOpacity onPress={() => router.back()} className="absolute left-0 top-1">
            <Image source={setaEsquerda} className="h-6 w-6" />
          </TouchableOpacity>

          <Text className="text-[20px] font-mulish-bold text-dark">Novo Imóvel</Text>
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
          <View className="gap-[10px] pb-[12px] pt-[22px]">
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

        {/*Location infos */}
        <View>
          {/*Title section */}
          <Text className="pb-[6px] font-inter-medium text-[18px] text-[#374151]">
            Localização
          </Text>
          {/*Separator */}
          <View className="h-px w-full bg-cor-secundaria" />

          {/*CEP */}
          <View className="gap-[10px] pb-[12px] pt-[22px]">
            <Text className="font-mulish-medium text-[16px] text-dark-5">CEP*</Text>
            <TextInput
              placeholder="Digite o CEP"
              placeholderTextColor="#9CA3AF"
              style={{ color: '#1F2A37', fontSize: 16 }}
              className="rounded-[8px] border-[1px] border-[#DFE4EA] bg-[#FAFAFA] py-[12px] pl-[20px] pr-[16px]"
            />
          </View>

          {/*Rua e Numero */}
          <View className="gap-[10px] pt-[12px]">
            {/* Linha de labels e inputs alinhados */}
            <View className="flex-row gap-[20px]">
              {/* Coluna 1 - Rua */}
              <View className="flex-[3]">
                <Text className="pb-[10px] font-mulish-medium text-[16px] text-dark-5">Rua*</Text>
                <TextInput
                  placeholder="Rua, avenida..."
                  placeholderTextColor="#9CA3AF"
                  style={{
                    color: '#1F2A37',
                    fontSize: 16,
                  }}
                  className="h-[52px] rounded-[8px] border border-stroke bg-white py-[12px] pl-[20px] pr-[16px]"
                />
              </View>

              {/* Coluna 2 - Número */}
              <View className="flex-[2]">
                <Text className="pb-[10px] font-mulish-medium text-[16px] text-dark-5">
                  Número*
                </Text>
                <TextInput
                  placeholder="000"
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

          {/*Bairro */}
          <View className="gap-[10px] pb-[12px] pt-[22px]">
            <Text className="font-mulish-medium text-[16px] text-dark-5">Bairro*</Text>
            <TextInput
              placeholder="Nome do bairro"
              placeholderTextColor="#9CA3AF"
              style={{ color: '#1F2A37', fontSize: 16 }}
              className="rounded-[8px] border-[1px] border-[#DFE4EA] bg-[#FAFAFA] py-[12px] pl-[20px] pr-[16px]"
            />
          </View>

          {/*Complemento */}
          <View className="gap-[10px] pb-[12px] pt-[22px]">
            <Text className="font-mulish-medium text-[16px] text-dark-5">Complemento</Text>
            <TextInput
              placeholder="Complemento"
              placeholderTextColor="#9CA3AF"
              style={{ color: '#1F2A37', fontSize: 16 }}
              className="rounded-[8px] border-[1px] border-[#DFE4EA] bg-[#FAFAFA] py-[12px] pl-[20px] pr-[16px]"
            />
          </View>
          
          {/*Cidade e UF */}
          <View className="gap-[10px] pt-[12px]">
            {/* Linha de labels e inputs alinhados */}
            <View className="flex-row gap-[20px]">
              {/* Coluna 1 - Rua */}
              <View className="flex-[3]">
                <Text className="pb-[10px] font-mulish-medium text-[16px] text-dark-5">Cidade*</Text>
                <TextInput
                  placeholder="Cidade"
                  placeholderTextColor="#9CA3AF"
                  style={{
                    color: '#1F2A37',
                    fontSize: 16,
                  }}
                  className="h-[52px] rounded-[8px] border border-stroke bg-white py-[12px] pl-[20px] pr-[16px]"
                />
              </View>

              {/* Coluna 2 - Número */}
              <View className="flex-[2]">
                <Text className="pb-[10px] font-mulish-medium text-[16px] text-dark-5">
                  Estado*
                </Text>
                <TextInput
                  placeholder="UF"
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
        </View>

        {/*Midias do imovel */}
        <View className='pt-[32px]'>
          {/*Title section */}
          <Text className="pb-[6px] font-inter-medium text-[18px] text-[#374151]">
            Midias do Imóvel
          </Text>
          {/*Separator */}
          <View className="h-px w-full bg-cor-secundaria" />

          <Text className='font-mulish-medium text-dark-5 text-[16px] pt-[24px]'>Envie de 3 a 10 arquivos (fotos ou videos).</Text>

          {/* Ícones lado a lado */}
          <View className="flex-row gap-[12px] pt-[12px] items-center justify-center">
            {Array.from({ length: 3 }).map((_, index) => (
              <AddImage key={index} />
            ))}
          </View>

          <View className="w-full px-[8px] items-end pt-[10px] pb-[12px]">
            <Text className="font-mulish text-[14px] text-texto-c-primario">0/10</Text>
          </View>

          {/*Button adicionar */}
          <View className='justify-center items-center pb-[24px]'>
            <TouchableOpacity className='py-[12px] gap-[8px] px-[24px] flex-row items-center justify-center w-[148px] h-[44px] border border-cor-primaria bg-cor-primaria-10 rounded-[24px]'>
            <UploadIcon />
            <Text className='font-mulish-medium text-[16px] text-cor-primaria'>Adicionar</Text>
          </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
            className="w-full h-[44px] flex-row items-center justify-center gap-[8px] rounded-lg bg-cor-primaria px-[24px] py-[12px]"
            onPress={() => router.push('/(auth)/corretor/imoveis/new')}>
            
            <Text className="font-mulish-medium text-[16px] text-white">Cadastrar imóvel</Text>
          </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
