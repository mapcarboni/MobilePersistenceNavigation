import React, { useState, useEffect } from "react"; // Importa os hooks do React para gerenciar o estado e efeitos
// hooks são funções que permitem adicionar funcionalidades a componentes funcionais sem a necessidade de escrever uma classe.
// useState: usado para criar e gerenciar estados em componentes funcionais.
// useEffect: usado para executar efeitos colaterais, como buscar dados ou manipular o DOM, em componentes funcionais.
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native"; // Componentes do React Native para criar a interface
import * as SecureStore from "expo-secure-store"; // Importa o módulo para salvar e carregar dados de forma persistente
// SecureStore é uma API do Expo que permite salvar e carregar dados de forma segura e persistente em um dispositivo.
// Persistência de dados na web: é a capacidade de manter os dados mesmo após o fechamento do navegador e usamos o localStorage para isso.

export default function HomeScreen({ navigation }) {
    const [texto, setTexto] = useState(""); // Estado para armazenar o texto digitado pelo usuário
    const [textoPersistido, setTextoPersistido] = useState(""); // Estado para armazenar o texto que foi salvo de forma persistente
    const [textoSalvoSemPersistencia, setTextoSalvoSemPersistencia] = useState(""); // Estado para mostrar o texto não persistido

    // Carrega o texto salvo na persistência ao iniciar a tela
    useEffect(() => {
        const carregarTextoPersistido = async () => {
            // async/await: usado para lidar com operações assíncronas de forma mais simples.
            const textoSalvo = await SecureStore.getItemAsync("meuTexto"); // Carrega o texto salvo
            if (textoSalvo) {
                setTextoPersistido(textoSalvo); // Atualiza o estado com o texto carregado
            }
        };
        carregarTextoPersistido(); // Executa a função ao carregar a tela
    }, []); // O array vazio faz a execução acontecer apenas uma vez

    // Função para salvar o texto na persistência
    const salvarTexto = async () => {
        if (!texto.trim()) {
            // Verifica se o texto não está vazio
            alert("Por favor, insira algo."); // Se estiver vazio, mostra um alerta
            return;
        }
        await SecureStore.setItemAsync("meuTexto", texto); // Salva o texto na persistência
        setTextoPersistido(texto); // Atualiza o estado com o texto salvo
        setTextoSalvoSemPersistencia(texto); // Atualiza o estado com o texto atual
        setTexto(""); // Limpa o campo de entrada
    };

    // Função para limpar o texto salvo da persistência
    const limparTexto = async () => {
        await SecureStore.deleteItemAsync("meuTexto"); // Deleta o texto da persistência
        setTextoPersistido(""); // Limpa o estado do texto persistido
        setTextoSalvoSemPersistencia(""); // Limpa o estado do texto não persistido
        alert("Texto apagado da persistência!"); // Exibe uma mensagem de confirmação
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Persistência e Navegação</Text>
            <TextInput
                style={styles.input} // Aplica estilo ao campo de texto
                placeholder="Digite algo" // Texto de exemplo no campo de entrada
                value={texto} // Valor do campo de texto
                onChangeText={setTexto} // Atualiza o estado sempre que o texto muda
            />
            <Text style={styles.textoNaoPersistido}>Sem persistência: {textoSalvoSemPersistencia || "Nenhum texto salvo"}</Text>
            <Text style={styles.textoPersistido}>Texto persistido: {textoPersistido || "Nenhum texto salvo"}</Text>

            <TouchableOpacity style={styles.botao} onPress={salvarTexto}>
                <Text style={styles.textoBotao}>Salvar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botao} onPress={limparTexto}>
                <Text style={styles.textoBotao}>Limpar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate("Detalhes", { textoNaoPersistido: textoSalvoSemPersistencia })}>
                <Text style={styles.textoBotao}>Detalhes</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // Faz o container ocupar toda a tela
        paddingVertical: 100, // Adiciona espaçamento vertical
        paddingHorizontal: 25, // Adiciona espaçamento horizontal
        gap: 20, // Adiciona espaçamento entre os componentes
    },
    titulo: {
        fontSize: 32, // Tamanho da fonte do título
        textAlign: "center", // Centraliza o título
    },
    input: {
        borderWidth: 1, // Largura da borda do campo de entrada
        borderColor: "gray", // Cor da borda
        borderRadius: 8, // Bordas arredondadas
        padding: 10, // Adiciona espaçamento interno
        fontSize: 20, // Tamanho da fonte dentro do campo
    },
    textoNaoPersistido: {
        fontSize: 20, // Tamanho da fonte do texto não persistido
        color: "red", // Cor do texto
    },
    textoPersistido: {
        fontSize: 20, // Tamanho da fonte do texto persistido
        color: "green", // Cor do texto persistido
    },
    botao: {
        backgroundColor: "blue", // Cor de fundo do botão
        padding: 10, // Adiciona espaçamento interno
        borderRadius: 8, // Bordas arredondadas no botão
        alignItems: "center", // Centraliza o texto dentro do botão
    },
    textoBotao: {
        color: "white", // Cor do texto do botão
        fontSize: 20, // Tamanho da fonte do texto do botão
    },
});
