import { useRouter } from 'expo-router';
import { Image, Text, TextInput,TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { Container } from '~/components/Container';

export default function Verificacao() {
  const setaEsquerda = require('~/assets/arrow-left.png');

  const router = useRouter();
  function handleBack() {
    router.push('/(auth)/corretor/concluido' as any);
  }

  return (
    <View className="m-0 flex-1 bg-[#F6F6F6] p-0">
      <Container>
        <View className="w-full flex-1 items-start justify-center">
          <View className="mt-10 flex-row items-center justify-between gap-12">
            <TouchableOpacity onPress={() => router.back()}>
              <Image
                source={setaEsquerda}
                style={{ width: 24, height: 24 }}
                className="text-left"
              />
            </TouchableOpacity>

            <Text className="text-center text-xl font-bold">Verificação do Corretor</Text>
          </View>

          {/* Círculo com check centralizado */}
          <View className="mt-10 w-full items-center">
            <View
              className="relative items-center justify-center"
              style={{ width: 96, height: 96 }}>
              {/* Círculo verde */}
              <Svg width={96} height={96} viewBox="0 0 96 96" fill="none">
                <Path
                  d="M56.1518 87.9267C78.1053 83.5495 92.3537 62.2042 87.9765 40.2507C83.5994 18.2972 62.2541 4.04877 40.3006 8.42596C18.3471 12.8031 4.09864 34.1484 8.47583 56.1019C12.853 78.0554 34.1983 92.3039 56.1518 87.9267Z"
                  fill="#ACEFC8"
                />
              </Svg>

              {/* Ícone check centralizado */}
              <Svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginLeft: -12,
                  marginTop: -12,
                }}>
                <Path
                  d="M22.725 5.0251C22.3875 4.6876 21.8625 4.6876 21.525 5.0251L8.77497 17.4001L2.47497 11.2126C2.13747 10.8751 1.61247 10.9126 1.27497 11.2126C0.937475 11.5501 0.974974 12.0751 1.27497 12.4126L7.91247 18.8626C8.13747 19.0876 8.43747 19.2001 8.77497 19.2001C9.11247 19.2001 9.37498 19.0876 9.63748 18.8626L22.725 6.1501C23.0625 5.8876 23.0625 5.3626 22.725 5.0251Z"
                  fill="#111928"
                />
              </Svg>
            </View>
          </View>

          <View className="flex w-full items-center justify-center gap-4 pt-[64px]">
            {/*Mensagem de verificação*/}
            <Text className="text-center font-mulish-bold text-[16px] text-[#111928]">
              Enviamos um código para o email cadastrado!
            </Text>
            <View className="mt-4 text-center font-mulish-semibold text-base text-[#111928]">
              <Text className="text-[16px] text-[#111928]">Verifique a sua caixa de entrada.</Text>
              <Text className="mt-1 font-mulish-light text-sm text-[#637381]">
                Insira no campo abaixo o código de verificação que enviamos para o seu email.
              </Text>
            </View>

            <View className="mt-4 flex w-full flex-row justify-between gap-2">
              {[...Array(6)].map((_, idx) => (
                <TextInput
                  key={idx}
                  inputMode="numeric"
                  maxLength={1}
                  className="h-[52px] w-11 flex-1 rounded border border-gray-300 px-3 text-center text-xl text-black"
                  placeholder=""
                />
              ))}
            </View>

            <View className="mt-0 flex w-full items-start justify-center gap-2">
              {/*Texto de expiração do código*/}
              <Text className="font-mulish-medium text-xs text-cor-primaria">
                código expira em 5 minutos
              </Text>
              <Text className="mt-1 font-mulish-light text-xs text-[#3E3C3E]">
                Caso não encontre o email na sua caixa de entrada, verifique a pasta de spam.
              </Text>
            </View>
          </View>

          <View className="mt-32 flex w-full justify-end">
            {/*Botão de enviar*/}
            <TouchableOpacity
              className="btn-azul mt-4 w-full rounded p-3 font-mulish-medium text-base text-white"
              onPress={handleBack}>
              <Text className="text-center font-mulish-medium text-base text-white">Enviar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Container>
    </View>
  );
}
