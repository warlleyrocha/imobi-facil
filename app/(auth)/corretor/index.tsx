import { useState } from "react";
import React from "react";
import { View, Text, Image } from "react-native";
import { Container } from "~/components/Container";
import axios from "axios";

export default function Corretor() {
  const setaEsquerda = require("~/assets/arrow-left.png");

  interface SignUpFormState  {
  firstname: string;
  lastname: string;
  birthdate: string | number; // Pode ser string ou number dependendo do formato
  // Se for string, pode ser uma data no formato ISO ou outro formato de data
  // Se for number, pode ser um timestamp ou outro formato numérico
  // Aqui, estou usando string | number para permitir ambos os formatos
  cpf: string | number; // CPF pode ser string ou number dependendo do formato
  // Se for string, pode ser um CPF formatado com pontos e traços
  // Se for number, pode ser um CPF numérico sem formatação
  creci: string
}

 const [formData, setFormData] = useState<SignUpFormState> ({ // Estado inicial do formulário
    firstname: '',
    lastname: '',
    birthdate: '',
    cpf: '',
    creci: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData(prevData => ({...prevData, [name]: value})) // Atualiza o estado do formulário com o novo valor
  }

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => { // Previne o comportamento padrão do formulário
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/apiv1/signup', formData);
      console.log(response); // Exibe a resposta da requisição no console
    }catch (error) {
      console.error(error); // Exibe o erro no console
    }
  }
  
  return (
    <View className="p-0 m-0">
      <Container>
        <View className="items-start flex-1 justify-center w-full">
          <View className="flex-row items-center gap-12 justify-between mt-10">
            <Image source={setaEsquerda} style={{ width: 24, height: 24 }} className="text-left" />
            <Text className="text-xl font-bold text-center">Cadastro do Corretor</Text>
          </View>
          <View>
            <form className="mt-8 w-full full-width" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 form-title">Nome*</label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  required 
                  maxLength={50}
                  className="w-full p-2 border border-gray-300 rounded form-text form-input:focus"
                  placeholder="Digite o seu Nome"
                />
              </div>

              <div>
                <label className="block mt-4 mb-2 text-sm font-medium text-gray-700 form-title">Sobrenome*</label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  required 
                  maxLength={50}
                  className="w-full p-2 border border-gray-300 rounded form-text form-input:focus"
                  placeholder="Digite o seu Nome Completo"
                />
              </div>

              <div>
                <label className="block mt-4 mb-2 text-sm font-medium text-gray-700 form-title">Data de Nascimento*</label>
                <input
                  type="date"
                  name="birthdate"
                  value={formData.birthdate}
                  onChange={handleChange}
                  required 
                  className="w-full p-2 border border-gray-300 rounded form-text form-input:focus"
                  placeholder="DD/MM/AAAA"
                />
              </div>
              <div>
                <label className="block mt-4 mb-2 text-sm font-medium text-gray-700 form-title">CPF*</label>
                <input
                  type="text"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleChange}
                  required 
                  maxLength={11}
                  className=" w-full p-2 border border-gray-300 rounded form-text form-input:focus"
                  placeholder="000.000.000-00"
                />
              </div>

              <div>
                <label className="block mt-4 mb-2 text-sm font-medium text-gray-700 form-title">CRECI/Estado*</label>
                <input
                  type="text"
                  name="creci"
                  value={formData.creci}
                  onChange={handleChange}
                  required 
                  maxLength={20}
                  className="w-full p-2 border border-gray-300 rounded form-text form-input:focus"
                  placeholder="Digite o seu CRECI"
                />
              </div>
            </form>
          </View>
        </View>
      </Container>
    </View>
  );
}