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

import { FormInput } from '@/components/Form/FormInput';
import { SignUpFormState } from '@/types/corretorTypes';
import { corretorFormFields, isFormValid } from '@/utils/corretorFields';

export default function Corretor() {
  const router = useRouter();
  const setaEsquerda = require('~/assets/arrow-left.png');

  const { control, handleSubmit } = useForm<SignUpFormState>({
    defaultValues: {
      firstname: 'WARLL',
      lastname: 'rodrigues',
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
      router.replace('/(auth)/corretor/signup/verifyCode' as any);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoBack = () => {
    console.log('Tentando voltar...');
    if (router.canGoBack()) {
      console.log('Pode voltar - usando router.back()');
      router.back();
    } else {
      console.log('Não pode voltar - redirecionando para select-profile');
      router.replace('/(auth)/select-profile' as any);
    }
  };

  const openTerms = () => {
    Linking.openURL('https://seusite.com/termos');
  };

  const openPolicies = () => {
    Linking.openURL('https://seusite.com/politicas');
  };

  return (
    <View className="m-0 flex-1 bg-[#F6F6F6] p-0">
      <View className="flex-1">
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView
            className="flex-1"
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
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
            <View className="w-full flex-1 px-5">
              <View className="mt-6 w-full">
                {corretorFormFields.map((field) => (
                  <Controller
                    key={field.name}
                    control={control}
                    name={field.name}
                    rules={{ required: `${field.label} é obrigatório` }}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <FormInput
                        label={field.label}
                        placeholder={field.placeholder}
                        value={value}
                        onChangeText={onChange}
                        keyboardType={field.keyboardType}
                      />
                    )}
                  />
                ))}
              </View>

              {/* Terms and Submit */}
              <View className="flex-1 justify-end pb-9">
                <View className="mb-4 flex-row items-center pr-2">
                  <TouchableOpacity
                    onPress={handleCheckboxChange}
                    className="mr-2 mt-0.5 flex-row items-start">
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

                  <View className="flex-1">
                    <Text className="font-mulish text-[14px] leading-[16px] text-gray-500">
                      Concordo com os{' '}
                      <Text className="font-mulish text-[#1C3FB7] underline" onPress={openTerms}>
                        Termos
                      </Text>{' '}
                      e{' '}
                      <Text className="font-mulish text-[#1C3FB7] underline" onPress={openPolicies}>
                        Políticas
                      </Text>
                      .
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  disabled={!(formIsValid && isChecked)} // 🔥 desativa quando form inválido OU checkbox desmarcada
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
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}
