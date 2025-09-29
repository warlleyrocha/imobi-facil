import { useRouter } from 'expo-router'; // ✅ Hook correto
import { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Polyline } from 'react-native-svg';
import { Container } from '~/components/Container';

export default function Corretor() {
  const router = useRouter(); // ✅ Use o hook

  interface SignUpFormState {
    firstname: string;
    lastname: string;
    birthdate: string | number;
    cpf: string | number;
    creci: string;
  }

  const setaEsquerda = require('~/assets/arrow-left.png');

  const [formData, setFormData] = useState<SignUpFormState>({
    firstname: '',
    lastname: '',
    birthdate: '',
    cpf: '',
    creci: '',
  });

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = async () => {
    console.log('Dados:', formData);
    try {
      router.push('/(auth)/corretor/verificacao' as any);
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ Função melhorada para voltar
  const handleGoBack = () => {
    console.log('Tentando voltar...'); // Debug
    if (router.canGoBack()) {
      console.log('Pode voltar - usando router.back()');
      router.back();
    } else {
      console.log('Não pode voltar - redirecionando para select-profile');
      router.push('/(auth)/select-profile' as any);
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
      <Container>
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView
            className="flex-1"
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            <View className="mt-10 w-full flex-row items-center justify-between px-5">
              {/* ✅ TouchableOpacity melhorado */}
              <TouchableOpacity
                onPress={handleGoBack}
                style={{ padding: 8 }} // Área de toque maior
                activeOpacity={0.7}>
                <Image source={setaEsquerda} className="h-6 w-6" />
              </TouchableOpacity>

              <Text className="-ml-6 flex-1 text-center font-inter-bold text-xl">
                Cadastro do Corretor
              </Text>
            </View>

            <View className="w-full flex-1 px-5">
              <View className="mt-8 w-full">
                <View>
                  <Text className="mb-2 block font-mulish text-sm font-medium text-gray-700">
                    Nome*
                  </Text>

                  <TextInput
                    value={formData.firstname}
                    onChangeText={(value) =>
                      setFormData((prevData) => ({ ...prevData, firstname: value }))
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 font-mulish text-black"
                    placeholder="Digite o seu Nome"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>

                <View className="mt-4">
                  <Text className="mb-2 block font-mulish text-sm font-medium text-gray-700">
                    Sobrenome*
                  </Text>

                  <TextInput
                    value={formData.lastname}
                    onChangeText={(value) =>
                      setFormData((prevData) => ({ ...prevData, lastname: value }))
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white p-3 font-mulish text-black"
                    placeholder="Digite o seu Sobrenome"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>

                <View className="mt-4">
                  <Text className="mb-2 block font-mulish text-sm font-medium text-gray-700">
                    Data de Nascimento*
                  </Text>
                  <TextInput
                    value={String(formData.birthdate)}
                    onChangeText={(value) =>
                      setFormData((prevData) => ({ ...prevData, birthdate: value }))
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white p-3 font-mulish text-black"
                    placeholder="DD/MM/AAAA"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="numeric"
                  />
                </View>

                <View className="mt-4">
                  <Text className="mb-2 block font-mulish text-sm font-medium text-gray-700">
                    CPF*
                  </Text>
                  <TextInput
                    value={String(formData.cpf)}
                    onChangeText={(value) =>
                      setFormData((prevData) => ({ ...prevData, cpf: value }))
                    }
                    keyboardType="numeric"
                    className="w-full rounded-lg border border-gray-300 bg-white p-3 font-mulish text-black"
                    placeholder="000.000.000-00"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>

                <View className="mt-4">
                  <Text className="mb-2 block font-mulish text-sm font-medium text-gray-700">
                    CRECI/Estado*
                  </Text>
                  <TextInput
                    value={formData.creci}
                    onChangeText={(value) =>
                      setFormData((prevData) => ({ ...prevData, creci: value }))
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white p-3 font-mulish text-black"
                    placeholder="Digite o seu CRECI"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              </View>

              <View className="mt-8 flex-1 justify-end pb-6">
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
                    <Text className="font-mulish text-sm leading-5 text-gray-500">
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
                  className="h-[44px] w-full items-center justify-center rounded-lg bg-cor-primaria px-[28px] py-[13px]"
                  onPress={handleSubmit}>
                  <Text className="font-mulish text-base text-white">Cadastrar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Container>
    </View>
  );
}
