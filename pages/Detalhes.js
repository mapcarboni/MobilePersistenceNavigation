import React, { useState, useEffect } from "react"; // Importa os hooks do React para gerenciar estado e efeitos colaterais
import { View, Text, StyleSheet } from "react-native"; // Componentes do React Native para criação de interfaces
import * as SecureStore from "expo-secure-store"; // Módulo para salvar e carregar dados de forma segura e persistente

// Tela de detalhes que mostra os textos
export default function DetalhesScreen() {
    const [textoNaoPersistido, setTextoNaoPersistido] = useState(""); // Estado para o texto não persistido
    const [textoPersistido, setTextoPersistido] = useState(""); // Estado para armazenar o texto que foi persistido
    // useState: usado para criar e gerenciar estados em componentes funcionais.

    // Carrega o texto persistido ao entrar na tela
    useEffect(() => {
        // useEffect: usado para executar efeitos colaterais, como buscar dados ou manipular o DOM, em componentes funcionais.
        const carregarTextoPersistido = async () => {
            // Busca o texto salvo na persistência de forma assíncrona
            const textoSalvo = await SecureStore.getItemAsync("meuTexto"); // Acessa o texto salvo
            if (textoSalvo) {
                setTextoPersistido(textoSalvo); // Atualiza o estado com o texto carregado
            }
        };
        carregarTextoPersistido(); // Executa a função para carregar o texto quando a tela for aberta
    }, []); // O array vazio faz com que a execução aconteça apenas uma vez ao montar o componente

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Detalhes</Text>
            <Text style={styles.texto}>Persistência: {textoPersistido || "Nenhum texto salvo"}</Text>
            <Text style={styles.texto}>Sem persistência: {textoNaoPersistido || "Nenhum texto digitado"}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // Faz o container ocupar toda a tela
        gap: 50, // Adiciona espaçamento entre os componentes
        paddingVertical: 100, // Adiciona espaçamento vertical
        paddingHorizontal: 25, // Adiciona espaçamento horizontal
    },
    titulo: {
        fontSize: 32, // Tamanho da fonte do título
        textAlign: "center", // Centraliza o título
        textDecorationLine: "underline", // Adiciona sublinhado ao título
    },
    texto: {
        fontSize: 20, // Tamanho da fonte do texto
        textAlign: "center", // Centraliza o texto
    },
});
