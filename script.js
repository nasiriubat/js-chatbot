document.getElementById('send-btn').addEventListener('click', function(){
    // IMplementation Steps
    // Step:1 Get the input from the input field

    const inputElement = document.getElementById('chat-input')
    const message = inputElement.value.trim();


    // Step:2 Display the Messages from the User Input

    if(message){
        displayMessage(message, 'user');
        // Step:3 Fetch the GPT assistance reponse and show the reponse in the chatbx
        fetchChatResponse(message);
        inputElement.value = '';
    }

})


function displayMessage (message, sender){
    const chatBox = document.getElementById('chat-box')
    
    const msgDiv = document.createElement('div')
    msgDiv.className = `message ${sender}`
    msgDiv.innerText =  `${sender.toUpperCase()} : ${message}`;

    chatBox.appendChild(msgDiv);

}

async function fetchChatResponse (message){
    const apiKey = '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';

    try{
        const url = 'https://api.openai.com/v1/chat/completions';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model : 'gpt-3.5-turbo',
                max_tokens: 100,
                temperature: 0.5,
                messages : [
                    {
                        role : 'user',
                        content : message
                    }

                ] 
            })
        });

        const data = await response.json();
        console.log(data)
        const replyFromBot =data.choices[0].message.content.trim();
        displayMessage(replyFromBot, 'bot')


    }catch (error){
        console.log('Error', error);
    }

}