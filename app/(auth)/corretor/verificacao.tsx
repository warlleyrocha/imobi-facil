import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { Container } from '~/components/Container';

export default function verificacao() {
  const setaEsquerda = require('~/assets/arrow-left.png');

  return (
    <View className="m-0 p-0">
      <Container>
        <View className="w-full flex-1 items-start justify-center">
          <View className="mt-10 flex-row items-center justify-between gap-12">
            <Image source={setaEsquerda} style={{ width: 24, height: 24 }} className="text-left" />
            <Text className="text-center text-xl font-bold">Verificação do Corretor</Text>
          </View>

          {/* <View className="relative"> // ícone de verificação
            <View className="inset-0 items-center justify-center">
              <View className="rounded-full bg-[#ACEFC8;] p-3 shadow-lg">
                <CustomVerifiedIcon width={54} height={54} />
              </View>
            </View>              // ajustar mt da view abaixo para alinhar com o ícone de verificação
          </View> */}

          <View className="mt-[200px] flex w-full items-center justify-center gap-4"> {/*Mensagem de verificação*/}
            <Text className="text-[16px] font-mulish-bold text-[#111928] text-center">
              Enviamos um código para o email cadastrado!
            </Text>
            <View className="text-center text-base font-mulish-semibold text-[#111928] mt-4">
              <Text className='text-[16px] text-[#111928]'>Verifique a sua caixa de entrada.</Text>
              <Text className='text-sm text-[#637381] font-mulish-light mt-1'>Insira no campo abaixo o  código de verificação que enviamos para o seu email.</Text>
            </View>

            <View className="w-full mt-4 flex flex-row justify-center gap-2"> {/*Inputs para o código de verificação*/}
              {[...Array(6)].map((_, idx) => (
              <input
                key={idx}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className="w-12 h-[52px] rounded border border-gray-300 text-center text-black text-xl"
                placeholder=""
              />
              ))}
            </View>
            
            <View className="mt-0 flex w-full items-start justify-center gap-2"> {/*Texto de expiração do código*/}
              <Text className='text-cor-primaria text-xs font-mulish-medium'>código expira em 5 minutos</Text>
              <Text className='text-[#3E3C3E] text-xs font-mulish-light mt-1'>Caso não encontre o email na sua caixa de entrada, verifique a pasta de spam.</Text>
            </View>
          </View>

          <View className="mt-32 flex w-full justify-end"> {/*Botão de enviar*/}
            <button
              type="submit"
              className="btn-azul mt-4 w-full rounded p-3 font-mulish-medium text-base text-white">
              Enviar
            </button>
          </View>
        </View>
      </Container>
    </View>
  );
}
