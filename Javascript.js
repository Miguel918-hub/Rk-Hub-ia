// --- Funções do Chat ---

// Função para se comunicar com uma API de IA avançada (exemplo fictício)
async function getAdvancedAIResponse(userInput) {
    try {
        // O ideal é que esta chamada seja feita a partir de um backend seguro
        // para não expor a sua API Key.
        const apiKey = 'SUA_CHAVE_DE_API_SECRETA'; 
        const apiUrl = 'https://api.exemplo-de-ia-avancada.com/v1/chat/completions';

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "modelo-de-texto-e-codigo-avancado", // Especifica o modelo a ser usado
                prompt: `Você é a Rk Hub | IA Oficial, um assistente especializado em Roblox Lua. O usuário pediu: "${userInput}". Se for um pedido de código, gere o código Lua. Se for um pedido de imagem, responda com "GERANDO_IMAGEM: [descrição]". Se for uma conversa, responda de forma útil.`,
                max_tokens: 500 // Limite do tamanho da resposta
            })
        });

        if (!response.ok) {
            throw new Error(`Erro na API: ${response.statusText}`);
        }

        const data = await response.json();
        return data.choices[0].text; // Retorna a resposta gerada pela IA

    } catch (error) {
        console.error("Erro ao contatar a API de IA:", error);
        return "Desculpe, estou com problemas para me conectar ao meu cérebro digital. Tente novamente mais tarde.";
    }
}

// Função para exibir uma imagem gerada
const displayImage = (imageUrl) => {
    const messageWrapper = document.createElement('div');
    messageWrapper.classList.add('message', 'received');
    const imageElement = document.createElement('img');
    imageElement.src = imageUrl;
    imageElement.style.maxWidth = '100%';
    imageElement.style.borderRadius = '15px';
    messageWrapper.appendChild(imageElement);
    chatMessages.appendChild(messageWrapper);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}


const handleSendMessage = async () => {
    const userText = messageInput.value.trim();
    if (!userText) return;

    displayMessage(userText, 'sent');
    messageInput.value = '';

    // Mostra um indicador de que a IA está "pensando"
    displayMessage("Digitando...", 'received-typing'); 

    // Obtém a resposta da nova IA avançada
    const botResponse = await getAdvancedAIResponse(userText);

    // Remove o indicador "Digitando..."
    const typingIndicator = document.querySelector('.received-typing');
    if(typingIndicator) typingIndicator.remove();
    
    // Verifica se a resposta é para gerar uma imagem
    if (botResponse.startsWith('GERANDO_IMAGEM:')) {
        const description = botResponse.replace('GERANDO_IMAGEM:', '').trim();
        displayMessage(`Entendido! Gerando uma imagem de: ${description}`, 'received');
        
        // --- Chamada para uma API de Geração de Imagem (conceitual) ---
        // const imageUrl = await generateImageWithApi(description);
        // displayImage(imageUrl);

    } else {
         // Formata a resposta se for um código
        const formattedResponse = botResponse.replace(/```lua\n/g, '<pre><code>').replace(/```/g, '</code></pre>');
        displayMessage(formattedResponse, 'received');
    }
};
