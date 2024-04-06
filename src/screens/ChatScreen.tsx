import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, StyleSheet, ActivityIndicator } from 'react-native';
import { GeminiKey } from '../constants';
// Import Gemini AI library
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = GeminiKey;
const MODEL_NAME = "gemini-1.0-pro";

const genAI = new GoogleGenerativeAI(API_KEY);

const ChatScreen = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const scrollViewRef = useRef<ScrollView>(null);

    const handleSend = async () => {
        try {
            // Push the input message to prevMessages first
            setMessages(prevMessages => [...prevMessages, input]);

            // Start loading
            setLoading(true);

            // Call the generative model to get the response
            const model = genAI.getGenerativeModel({ model: MODEL_NAME });
            const result = await model.generateContent(`You are an Indian lawyer, respond to the question by giving legal advice, writing article numbers and suggesting similar case laws:${input} Instructions for AI:
- Assess the clarity of the scenario(check if there is any relevent scenario or issue provided where a person would require legal awarness or advice).
- If the clarity is low, respond with a statement that the scenario is unclear and ask for more information.
- If the scenario is clear, provide legal advice, relevant laws, verdicts, and clickable links to similar cases.`);

            // Get the response text
            const response = await result.response;
            const text = await response.text();

            // Push the generated text response to prevMessages
            setMessages(prevMessages => [...prevMessages, text]);

            // Clear the input field
            setInput('');
        } catch (error) {
            // Handle error
            console.error("Error:", error);
        } finally {
            // Stop loading
            setLoading(false);
        }
    };


    const handleClearChat = () => {
        setMessages([]);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Chat Screen</Text>
                <TouchableOpacity onPress={handleClearChat}>
                    <Text style={styles.clearButtonText}>Clear Chat</Text>
                </TouchableOpacity>
            </View>
            <ScrollView
                ref={scrollViewRef}
                contentContainerStyle={styles.scrollViewContent}
                keyboardShouldPersistTaps="handled"
            >
                {messages.map((message, index) => (
                    <Text key={index} style={index % 2 === 0 ? styles.sentMessage : styles.receivedMessage}>{message}</Text>
                ))}
            </ScrollView>
            {loading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#db545c" />
                    <Text style={styles.loadingText}>Getting your rights...</Text>
                </View>
            )}
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                keyboardVerticalOffset={Platform.select({ ios: 0, android: 0 })}
            >
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={input}
                        onChangeText={setInput}
                        placeholder="Type your message..."
                        onSubmitEditing={handleSend}
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                        <Text style={styles.sendButtonText}>Send</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#246BFD',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    headerText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    clearButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    sentMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#246BFD',

        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
        borderBottomRightRadius: 0,
        color: '#FFFFFF',
        marginRight: 10,
    },
    receivedMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#181A20',
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
        borderBottomLeftRadius: 0,
        color: '#FFFFFF',
        marginRight: 60,
        marginLeft: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    input: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        color: '#000000',
    },
    sendButton: {
        backgroundColor: '#246BFD',
        paddingVertical: 10,
        borderRadius: 50,
        marginLeft: 10,
        width: 50,


    },
    sendButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    loadingContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#246BFD',
    },
});


export default ChatScreen;
