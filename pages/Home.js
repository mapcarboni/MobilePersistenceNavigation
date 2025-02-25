import React, { useState, useEffect } from "react"; // Importa React e hooks useState e useEffect
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store"; // Importa SecureStore para armazenamento seguro

// Componente que recebe um texto como prop e exibe na tela
// Props esperadas: titulo, texto e cor
// Props é um objeto que contém informações passadas de um componente pai para um componente filho
// Props são somente leitura e não podem ser alteradas
const TextoExibido = ({ titulo, texto, cor }) => (
    <Text style={[styles.texto, { color: cor }]}>
        {titulo}: {texto || "Nenhum texto salvo"}
    </Text>
);

export default function HomeScreen({ navigation }) {
    const [texto, setTexto] = useState(""); // Estado para armazenar o texto digitado
    const [textoPersistido, setTextoPersistido] = useState(""); // Estado para armazenar o texto persistido
    const [textoSalvoSemPersistencia, setTextoSalvoSemPersistencia] = useState(""); // Estado para armazenar o texto salvo sem persistência

    // useEffect é um hook que executa uma função após a renderização do componente
    // Recebe uma função de callback e um array de dependências
    // callback é a função que será executada após a renderização
    useEffect(() => {
        const carregarTextoPersistido = async () => {
            const textoSalvo = await SecureStore.getItemAsync("meuTexto"); // Carrega o texto persistido do SecureStore
            if (textoSalvo) {
                setTextoPersistido(textoSalvo); // Atualiza o estado com o texto persistido
            }
        };
        carregarTextoPersistido(); // Chama a função para carregar o texto persistido quando o componente é montado
    }, []);

    const salvarTexto = async () => {
        if (!texto.trim()) {
            alert("Por favor, insira algo.");
            return;
        }
        await SecureStore.setItemAsync("meuTexto", texto); // Salva o texto no SecureStore
        setTextoPersistido(texto); // Atualiza o estado com o texto persistido
        setTextoSalvoSemPersistencia(texto); // Atualiza o estado com o texto salvo sem persistência
        setTexto(""); // Limpa o campo de texto
    };

    const limparTexto = async () => {
        await SecureStore.deleteItemAsync("meuTexto"); // Remove o texto do SecureStore
        setTextoPersistido(""); // Limpa o estado do texto persistido
        setTextoSalvoSemPersistencia(""); // Limpa o estado do texto salvo sem persistência
        alert("Texto apagado da persistência!"); // Alerta que o texto foi apagado
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Persistência e Navegação</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite algo"
                value={texto}
                onChangeText={setTexto}
            />

            <TextoExibido titulo="Sem persistência" texto={textoSalvoSemPersistencia} cor="red" />
            <TextoExibido titulo="Texto persistido" texto={textoPersistido} cor="green" />

            <TouchableOpacity style={styles.botao} onPress={salvarTexto}>
                <Text style={styles.textoBotao}>Salvar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botao} onPress={limparTexto}>
                <Text style={styles.textoBotao}>Limpar</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.botao}
                onPress={() => navigation.navigate("Detalhes", { textoNaoPersistido: textoSalvoSemPersistencia })}
            >
                <Text style={styles.textoBotao}>Detalhes</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // Faz o container ocupar todo o espaço disponível
        paddingVertical: 100, // Espaçamento vertical
        paddingHorizontal: 25, // Espaçamento horizontal
        gap: 20, // Espaçamento entre os elementos
    },
    titulo: {
        fontSize: 32, // Tamanho da fonte do título
        textAlign: "center", // Alinhamento do texto ao centro
    },
    input: {
        borderWidth: 1, // Largura da borda do input
        borderColor: "gray", // Cor da borda do input
        borderRadius: 8, // Arredondamento das bordas do input
        padding: 10, // Espaçamento interno do input
        fontSize: 20, // Tamanho da fonte do input
    },
    texto: {
        fontSize: 20, // Tamanho da fonte do texto
        textAlign: "center", // Alinhamento do texto ao centro
    },
    botao: {
        backgroundColor: "blue", // Cor de fundo do botão
        padding: 10, // Espaçamento interno do botão
        borderRadius: 8, // Arredondamento das bordas do botão
        alignItems: "center", // Alinhamento dos itens ao centro
    },
    textoBotao: {
        color: "white", // Cor do texto do botão
        fontSize: 20, // Tamanho da fonte do texto do botão
    },
});
