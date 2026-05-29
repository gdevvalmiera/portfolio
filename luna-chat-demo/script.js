const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const chatBox = document.getElementById('chatBox');

sendBtn.addEventListener('click', function () {
    sendMessage();
});

userInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const userText = userInput.value;

    if (userText === '') {
        return;
    }

    addMessage(userText, 'user-message');

    userInput.value = '';

    const typingMessage = addMessage('Luna raksta...', 'bot-message');

    setTimeout(function () {
        typingMessage.textContent = 'Es pagaidām esmu tikai demo, bet es jau mācos atbildēt 😄';
    }, 1000);
}

function addMessage(text, className) {
    const message = document.createElement('div');

    message.classList.add('message');
    message.classList.add(className);

    message.textContent = text;

    chatBox.appendChild(message);

    chatBox.scrollTop = chatBox.scrollHeight;
    return message;
}