function normalizeText(input) {
    let text = input.toLowerCase().trim();

    text = text
        .replace(/([a-z])\1{2,}/g, "$1$1")
        .replace(/\s+/g, " ")
        .replace(/[^\w\s!?...:;<>^'()-]/g, "");

    const slangMap = {
        "heyy": "hey",
        "helloo": "hello",
        "helo": "hello",
        "hii": "hi",
        "byee": "bye",
        "byeee": "bye",
        "thxx": "thanks",
        "thxxx": "thanks",
        "idkk": "idk",
        "lmaoo": "lmao",
        "lolll": "lol",
        "omgg": "omg",
        "yess": "yes",
        "noo": "no"
    };

    Object.keys(slangMap).forEach(key => {
        text = text.replace(new RegExp(`\\b${key}\\b`, "g"), slangMap[key]);
    });

    return text;
}

function detectEmotion() {
    const rawText = document.getElementById("userText").value;
    const text = normalizeText(rawText);
    const result = document.getElementById("result");

    if (text === "") {
        result.innerHTML = "Please type something first.";
        return;
    }

    let score = 0;
    let label = "Hard to tell 🤷";

    const greetings = ["hi", "hello", "hey", "yo", "gm", "gn", "sup", "hiya"];
    const goodbyes = ["bye", "cya", "see ya", "later", "brb", "wb", "goodbye"];
    const thanksWords = ["thanks", "thank you", "thx", "ty", "appreciate it", "yw"];
    const cuteWords = ["owo", "uwu", "0w0", "^w^", ":3", ">w<"];
    const laughWords = ["haha", "hahaha", "hehe", "lol", "lmao", "rofl", "lmfao", "xd"];
    const happyWords = ["happy", "joy", "great", "awesome", "love", "excellent", "good", "excited", "nice", "cool", "amazing", "fantastic", "brilliant", "wonderful", "perfect", "smile", "glad", "proud", "relaxed", "hype", "lit", "goated", "based", "sweet"];
    const sadWords = ["sad", "cry", "depressed", "upset", "hurt", "lonely", "bad", "terrible", "awful", "tired", "stress", "broken", "empty", "miserable", "hopeless", "down"];
    const angryWords = ["angry", "mad", "hate", "annoyed", "frustrated", "irritated", "furious", "rage", "pissed", "stupid", "dumb"];
    const fearWords = ["scared", "afraid", "worried", "nervous", "anxious", "panic", "terrified", "uneasy"];
    const surpriseWords = ["wow", "omg", "what?!", "what??", "no way", "really?!", "shocked", "unbelievable"];
    const disgustWords = ["ew", "gross", "nasty", "yuck", "bleh", "disgusting", "icky", "ugh"];
    const trustWords = ["trust", "safe", "reliable", "solid", "sure", "dependable", "faith", "confident"];
    const anticipationWords = ["can't wait", "soon", "waiting for", "looking forward", "excited for", "anticipating"];
    const confusedWords = ["idk", "huh", "what", "???", "uhh", "umm", "meh", "confused", "unsure", "maybe"];

    const positivePhrases = ["very happy", "feeling good", "so excited", "really great", "i love this", "doing amazing", "feels wonderful", "so nice"];
    const negativePhrases = ["not good", "very bad", "feeling sad", "so angry", "really upset", "i hate this", "feels terrible", "too stressed", "i am tired"];

    const positiveEmojis = ["😊", "😁", "😄", "😍", "❤️", "<3", "✨", "😎", ":)", ":D", "^_^"];
    const negativeEmojis = ["😢", "😭", "😠", "😡", "💔", "😞", "😔", ":(", ":'(", "T_T"];
    const surpriseEmojis = ["😲", "😱", "🤯", "‼", "⁉"];

    const addIfIncludes = (list, points) => {
        list.forEach(item => {
            if (text.includes(item)) score += points;
        });
    };

    addIfIncludes(greetings, 1.5);
    addIfIncludes(goodbyes, 1);
    addIfIncludes(thanksWords, 1);
    addIfIncludes(cuteWords, 2);
    addIfIncludes(laughWords, 2);
    addIfIncludes(happyWords, 1);
    addIfIncludes(sadWords, -1);
    addIfIncludes(angryWords, -1.5);
    addIfIncludes(fearWords, -1);
    addIfIncludes(surpriseWords, 1.2);
    addIfIncludes(disgustWords, -1.2);
    addIfIncludes(trustWords, 1);
    addIfIncludes(anticipationWords, 1);
    addIfIncludes(confusedWords, -0.6);

    positivePhrases.forEach(phrase => {
        if (text.includes(phrase)) score += 2;
    });

    negativePhrases.forEach(phrase => {
        if (text.includes(phrase)) score -= 2;
    });

    positiveEmojis.forEach(sym => {
        if (rawText.includes(sym)) score += 2;
    });

    negativeEmojis.forEach(sym => {
        if (rawText.includes(sym)) score -= 2;
    });

    surpriseEmojis.forEach(sym => {
        if (rawText.includes(sym)) score += 1.2;
    });

    const exclamations = (rawText.match(/!/g) || []).length;
    const questions = (rawText.match(/\?/g) || []).length;
    const dots = (rawText.match(/\./g) || []).length;

    score += Math.min(exclamations, 5) * 0.4;
    score -= Math.min(questions, 5) * 0.2;
    score -= Math.min(dots, 6) * 0.15;

    if (rawText.includes("!!!")) score += 1;
    if (rawText.includes("??")) score += 0.2;
    if (rawText.includes("...")) score -= 0.8;

    const hasPositive = happyWords.some(w => text.includes(w)) || positivePhrases.some(p => text.includes(p));
    const hasNegative = sadWords.some(w => text.includes(w)) || angryWords.some(w => text.includes(w)) || fearWords.some(w => text.includes(w)) || negativePhrases.some(p => text.includes(p));

    if (greetings.some(w => text.includes(w))) label = "Greeting 👋";
    if (goodbyes.some(w => text.includes(w))) label = "Goodbye 👋";
    if (thanksWords.some(w => text.includes(w))) label = "Polite / Thanks 🙏";
    if (cuteWords.some(w => text.includes(w))) label = "Cute / Owo 🥺";
    if (laughWords.some(w => text.includes(w))) label = "Laughing 😂";
    if (surpriseWords.some(w => text.includes(w)) || surpriseEmojis.some(w => rawText.includes(w))) label = "Surprised 😲";
    if (disgustWords.some(w => text.includes(w))) label = "Disgusted 🤢";
    if (trustWords.some(w => text.includes(w))) label = "Trusting 🤝";
    if (anticipationWords.some(w => text.includes(w))) label = "Anticipating ⏳";
    if (confusedWords.some(w => text.includes(w)) || rawText.includes("...")) label = "Unsure / Confused 🤔";

    if (hasPositive && hasNegative) {
        label = "Mixed vibes 😵";
    }

    if (score >= 6) {
        label = "Very Happy 😄";
    } else if (score >= 3) {
        label = "Happy 😊";
    } else if (score <= -6) {
        label = "Very Sad 😭";
    } else if (score <= -3) {
        label = "Sad 😢";
    } else if (score > -3 && score < 3 && label === "Hard to tell 🤷") {
        label = "Hard to tell 🤷";
    }

    result.innerHTML = "Detected Mood: " + label + "<br>Score: " + score.toFixed(1);
}

function clearText() {
    document.getElementById("userText").value = "";
    document.getElementById("result").innerHTML = "Detected Mood: —";
}

function pasteSample() {
    const samples = [
        "heeelllooo!!!",
        "idk... maybe later",
        "hahaha that was amazing",
        "owo hi there",
        "bye cya later",
        "what?! no way!!",
        "ew that is gross",
        "I trust you, thanks!"
    ];
    document.getElementById("userText").value = samples[Math.floor(Math.random() * samples.length)];
}

function setText(value) {
    document.getElementById("userText").value = value;
}

function copyResult() {
    const text = document.getElementById("result").innerText;
    navigator.clipboard.writeText(text);
}

function speakResult() {
    const text = document.getElementById("result").innerText;
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
}

function loadDiscordMode() {
    document.getElementById("userText").value = "heeelllooo!!! owo what's up lol";
}

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = null;

if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
        document.getElementById("result").innerHTML = "Listening... speak now 🎤";
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        document.getElementById("userText").value = transcript;
        detectEmotion();
    };

    recognition.onerror = () => {
        document.getElementById("result").innerHTML = "Voice input error. Try again.";
    };
}

function startListening() {
    if (!recognition) {
        document.getElementById("result").innerHTML = "Speech recognition not supported in this browser.";
        return;
    }
    recognition.start();
}