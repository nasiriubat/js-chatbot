document.getElementById('send-btn').addEventListener('click', function(){
  

    const inputElement = document.getElementById('chat-input')
    const message = inputElement.value.trim();

    if(message){
        displayMessage(message, 'user');
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
    const apiKey = '';

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
        const replyFromBot =data.choices[0].message.content.trim();
        displayMessage(replyFromBot, 'bot')


    }catch (error){
        console.log('Error', error);
    }

}
