import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { router } from 'expo-router';

interface FormData {
  nome: string;
  email: string;
  codigoPais: string;
  telefone: string;
  senha: string;
  aceitaTermos: boolean;
}

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<FormData>({
    defaultValues: {
      nome: '',
      email: '',
      codigoPais: '+55',
      telefone: '',
      senha: '',
      aceitaTermos: false,
    },
    mode: 'onChange',
  });

  const watchedFields = watch();
  const isFormValid = isValid && acceptedTerms;

  const onSubmit = (data: FormData) => {
    Alert.alert(
      'Sucesso!',
      `Cadastro realizado:\nNome: ${data.nome}\nEmail: ${data.email}\nTelefone: ${data.codigoPais}${data.telefone}`
    );
  };

  const handleBackPress = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/'); // ou router.replace('/login')
    }
  };

  return (
    <View className="flex-1 bg-white">
      <Header onBackPress={handleBackPress} title="Cadastro" />
      <View className="w-full flex-1 justify-between gap-3 rounded-3xl bg-white px-4 py-6">
        <View className="flex-1">
          {/* Nome */}
          <View className="mb-4">
            <Controller
              control={control}
              name="nome"
              rules={{
                required: 'Nome é obrigatório',
                minLength: {
                  value: 2,
                  message: 'Nome deve ter pelo menos 2 caracteres',
                },
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder="Nome completo"
                  value={value}
                  onChangeText={onChange}
                  className={`h-12 rounded-lg border px-3 ${
                    errors.nome ? 'border-red-500' : 'border-gray-400'
                  }`}
                />
              )}
            />
            {errors.nome && (
              <Text className="mt-1 text-sm text-red-500">{errors.nome.message}</Text>
            )}
          </View>

          {/* Email */}
          <View className="mb-4">
            <Controller
              control={control}
              name="email"
              rules={{
                required: 'Email é obrigatório',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email inválido',
                },
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder="Email"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className={`h-12 rounded-lg border px-3 ${
                    errors.email ? 'border-red-500' : 'border-gray-400'
                  }`}
                />
              )}
            />
            {errors.email && (
              <Text className="mt-1 text-sm text-red-500">{errors.email.message}</Text>
            )}
          </View>

          {/* Telefone */}
          <View className="mb-4">
            <Text className="mb-2 text-gray-700">Telefone</Text>
            <View className="flex-row gap-2">
              <Controller
                control={control}
                name="codigoPais"
                rules={{ required: 'Código é obrigatório' }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    placeholder="+55"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="phone-pad"
                    maxLength={4}
                    className={`h-12 w-16 rounded-lg border px-3 text-center ${
                      errors.codigoPais ? 'border-red-500' : 'border-gray-400'
                    }`}
                  />
                )}
              />
              <Controller
                control={control}
                name="telefone"
                rules={{
                  required: 'Telefone é obrigatório',
                  minLength: {
                    value: 10,
                    message: 'Telefone deve ter pelo menos 10 dígitos',
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    placeholder="(11) 99999-9999"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="phone-pad"
                    className={`h-12 flex-1 rounded-lg border px-3 ${
                      errors.telefone ? 'border-red-500' : 'border-gray-400'
                    }`}
                  />
                )}
              />
            </View>
            {(errors.codigoPais || errors.telefone) && (
              <Text className="mt-1 text-sm text-red-500">
                {errors.codigoPais?.message || errors.telefone?.message}
              </Text>
            )}
          </View>

          {/* Senha */}
          <View className="mb-4">
            <Controller
              control={control}
              name="senha"
              rules={{
                required: 'Senha é obrigatória',
                minLength: {
                  value: 6,
                  message: 'Senha deve ter pelo menos 6 caracteres',
                },
              }}
              render={({ field: { onChange, value } }) => (
                <View className="relative">
                  <TextInput
                    placeholder="Senha"
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry={!showPassword}
                    className={`h-12 rounded-lg border px-3 pr-12 ${
                      errors.senha ? 'border-red-500' : 'border-gray-400'
                    }`}
                  />
                  <TouchableOpacity
                    className="absolute right-3 top-3"
                    onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="gray" />
                  </TouchableOpacity>
                </View>
              )}
            />
            {errors.senha && (
              <Text className="mt-1 text-sm text-red-500">{errors.senha.message}</Text>
            )}
          </View>

          {/* Requisitos da senha */}
          <View className="mt-3 space-y-1">
            <Text className="mb-2 text-sm text-gray-600">Requisitos da senha:</Text>

            <View className="flex-row items-center gap-2">
              <Ionicons
                name={
                  watchedFields.senha && watchedFields.senha.length >= 6
                    ? 'checkmark-circle'
                    : 'close-circle'
                }
                size={16}
                color={
                  watchedFields.senha && watchedFields.senha.length >= 6 ? '#16a34a' : '#dc2626'
                }
              />
              <Text
                className={`text-sm ${
                  watchedFields.senha && watchedFields.senha.length >= 6
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}>
                Mínimo 6 caracteres
              </Text>
            </View>

            <View className="flex-row items-center gap-2">
              <Ionicons
                name={
                  watchedFields.senha && /[A-Z]/.test(watchedFields.senha)
                    ? 'checkmark-circle'
                    : 'close-circle'
                }
                size={16}
                color={
                  watchedFields.senha && /[A-Z]/.test(watchedFields.senha) ? '#16a34a' : '#dc2626'
                }
              />
              <Text
                className={`text-sm ${
                  watchedFields.senha && /[A-Z]/.test(watchedFields.senha)
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}>
                Pelo menos 1 letra maiúscula
              </Text>
            </View>

            <View className="flex-row items-center gap-2">
              <Ionicons
                name={
                  watchedFields.senha && /[!@#$%^&*(),.?":{}|<>]/.test(watchedFields.senha)
                    ? 'checkmark-circle'
                    : 'close-circle'
                }
                size={16}
                color={
                  watchedFields.senha && /[!@#$%^&*(),.?":{}|<>]/.test(watchedFields.senha)
                    ? '#16a34a'
                    : '#dc2626'
                }
              />
              <Text
                className={`text-sm ${
                  watchedFields.senha && /[!@#$%^&*(),.?":{}|<>]/.test(watchedFields.senha)
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}>
                Pelo menos 1 caractere especial
              </Text>
            </View>
          </View>
          {/* Checkbox de Termos */}
          <View className="mb-6">
            <TouchableOpacity
              className="flex-row items-center gap-3"
              onPress={() => setAcceptedTerms(!acceptedTerms)}>
              <View
                className={`h-5 w-5 items-center justify-center rounded border-2 ${
                  acceptedTerms ? 'border-orange-600 bg-orange-600' : 'border-gray-400'
                }`}>
                {acceptedTerms && <Ionicons name="checkmark" size={14} color="white" />}
              </View>
              <Text className="flex-1 text-gray-700">
                Aceito os <Text className="text-orange-600 underline">termos de uso</Text> e{' '}
                <Text className="text-orange-600 underline">política de privacidade</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Botão */}
        <TouchableOpacity
          className={`items-center rounded-xl px-6 py-4 ${
            isFormValid ? 'bg-orange-600 active:bg-orange-700' : 'bg-gray-300'
          }`}
          onPress={handleSubmit(onSubmit)}
          disabled={!isFormValid}
          activeOpacity={isFormValid ? 0.8 : 1}>
          <Text className={`text-lg font-bold ${isFormValid ? 'text-white' : 'text-gray-500'}`}>
            Criar Conta
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
