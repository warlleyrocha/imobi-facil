import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import {
  Image,
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Polyline } from 'react-native-svg';

import { SignUpFormState } from '@/types/corretorTypes';
import { corretorFormFields, isFormValid } from '@/utils/corretorFields';
import { maskCPF, maskDate, normalizeText } from '@/utils/masks';
import { FormInput } from '~/components/forms/FormInput';

export default function Corretor() {
  const router = useRouter();
  const setaEsquerda = require('~/assets/arrow-left.png');

  const { control, handleSubmit } = useForm<SignUpFormState>({
    defaultValues: {
      firstname: 'Carlos',
      lastname: 'Souza',
      birthdate: '16/08/1990',
      cpf: '111.111.111-11',
      creci: '123456',
    },
  });

  const watchedValues = useWatch<SignUpFormState>({ control });

  const formIsValid = isFormValid(watchedValues);

  const [isChecked, setIsChecked] = useState(true);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const onSubmit = async (data: SignUpFormState) => {
    console.log('Dados:', data);
    try {
      router.push('/(auth)/signup/verifyCode' as any);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoBack = () => {
    router.replace('/(auth)/select-profile' as any);
  };

  const openTerms = () => {
    Linking.openURL('https://seusite.com/termos');
  };

  const openPolicies = () => {
    Linking.openURL('https://seusite.com/politicas');
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-[#F6F6F6]"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between',
          paddingBottom: 12,
        }}>
        <View>
          {/* Header */}
          <View className="mt-[80px] w-full flex-row items-center justify-between px-5">
            <TouchableOpacity onPress={handleGoBack} style={{ padding: 8 }} activeOpacity={0.7}>
              <Image source={setaEsquerda} className="h-6 w-6" />
            </TouchableOpacity>

            <Text className="-ml-6 flex-1 text-center font-inter-bold text-[20px] leading-[22px]">
              Cadastro do Corretor
            </Text>
          </View>

          {/* Form Fields */}
          <View className="mt-[24px] px-5">
            {corretorFormFields.map((field) => (
              <Controller
                key={field.name}
                control={control}
                name={field.name}
                rules={{ required: `${field.label} é obrigatório` }}
                render={({ field: { onChange, value } }) => (
                  <FormInput
                    label={field.label}
                    required
                    placeholder={field.placeholder}
                    value={value}
                    onChangeText={(text) => {
                      if (field.name === 'cpf') onChange(maskCPF(text));
                      else if (field.name === 'birthdate') onChange(maskDate(text));
                      else onChange(normalizeText(text));
                    }}
                    keyboardType={field.keyboardType}
                  />
                )}
              />
            ))}
          </View>
        </View>

        {/* Terms and Submit */}
        <View className="mb-10 mt-8 px-5">
          <View className="mb-4 flex-row items-center pr-2">
            <TouchableOpacity onPress={handleCheckboxChange} className="mr-2 flex-row items-start">
              <View
                className={`h-6 w-6 items-center justify-center rounded border-2 border-blue-300 ${
                  isChecked ? 'bg-blue-500' : 'bg-white'
                }`}>
                {isChecked && (
                  <Svg width={16} height={16} viewBox="0 1 16 16">
                    <Polyline
                      points="3,9 7,13 13,5"
                      fill="none"
                      stroke="#fff"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                )}
              </View>
            </TouchableOpacity>

            <Text className="flex-1 font-mulish text-[14px] leading-[16px] text-gray-500">
              Concordo com os{' '}
              <Text className="text-[#1C3FB7] underline" onPress={openTerms}>
                Termos
              </Text>{' '}
              e{' '}
              <Text className="text-[#1C3FB7] underline" onPress={openPolicies}>
                Políticas
              </Text>
              .
            </Text>
          </View>

          <TouchableOpacity
            disabled={!(formIsValid && isChecked)}
            className={`h-[44px] w-full items-center justify-center rounded-lg px-[28px] py-[13px] ${
              formIsValid && isChecked ? 'bg-cor-primaria' : 'bg-gray-3'
            }`}
            onPress={handleSubmit(onSubmit)}>
            <Text
              className={`font-mulish text-[16px] ${
                formIsValid && isChecked ? 'text-white' : 'text-dark-5'
              }`}>
              Cadastrar
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
