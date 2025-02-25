import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store";

// Componente que recebe um texto como prop e exibe na tela
// Props esperadas: titulo, texto e cor
// Props é um objeto que contém informações passadas de um componente pai para um componente filho
// Props são somente leitura e não podem ser alteradas
const TextoExibido = ({ titulo, texto, cor }) => (
    <Text style={[styles.texto, { color: cor }]}>
        {titulo}: {texto || "Nenhum texto salvo"}
    </Text>
);

export default function DetalhesScreen({ route }) {
    // Recebe a prop da navegação
    const { textoNaoPersistido } = route.params || {};
    // Estado para armazenar o texto persistido
    const [textoPersistido, setTextoPersistido] = useState("");

    // useEffect para carregar o texto persistido ao montar o componente
    useEffect(() => {
        const carregarTextoPersistido = async () => {
            // Obtém o texto salvo do SecureStore
            const textoSalvo = await SecureStore.getItemAsync("meuTexto");
            if (textoSalvo) {
                // Atualiza o estado com o texto salvo
                setTextoPersistido(textoSalvo);
            }
        };
        carregarTextoPersistido();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Detalhes</Text>
            <TextoExibido titulo="Sem persistência" texto={textoNaoPersistido} cor="red" />
             <TextoExibido titulo="Persistência" texto={textoPersistido} cor="green" />
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1, // Faz o container ocupar todo o espaço disponível
        gap: 50, // Espaçamento entre os elementos filhos
        paddingVertical: 100, // Espaçamento vertical interno
        paddingHorizontal: 25, // Espaçamento horizontal interno
    },

    titulo: {
        fontSize: 32, // Tamanho da fonte
        textAlign: "center", // Alinhamento do texto ao centro
        textDecorationLine: "underline", // Sublinhado no texto
    },

    texto: {
        fontSize: 20, // Tamanho da fonte
        textAlign: "center", // Alinhamento do texto ao centro
    },
});
