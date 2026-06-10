Project idea
Your project is a browser-based mood detector that accepts typed or spoken text and tries to identify the likely emotion behind it. Instead of using a heavy machine-learning model, it uses a custom scoring system with word lists, chat slang, punctuation, and symbol patterns to mimic how people express feelings in Discord-style conversations.

How it works
The app first normalizes the input by converting it to lowercase and compressing stretched words like heeelllooo so they match known greetings. Then it compares the text against groups of positive, negative, surprised, confused, funny, cute, and chat-style terms, and it also checks emojis and punctuation marks like !, ?, and ... because those change the tone of a message.

Why this project is useful
This kind of system is useful because many real messages are short, informal, and full of slang, so simple word matching alone is not enough. A rule-based detector is also easier to debug and explain in class because you can show exactly why the app chose “Happy,” “Sad,” “Surprised,” or “Mixed vibes.”

Main features
Text input for emotion detection.

Voice input using the browser’s speech recognition.

Speech output using browser text-to-speech.

Discord-style slang and emoji handling.

Special labels like greeting, goodbye, cute, confused, and mixed vibes.

A normalization step for stretched words.

Why local server matters
You should run it using a local server so the browser treats it like a normal web app instead of a file:// page. That makes the project more reliable for JavaScript features and avoids security issues with local file access.

Short theory paragraph
“Emotion detection is the process of analyzing text to identify the user’s emotional tone. In this project, a rule-based web application was developed to detect moods such as happy, sad, angry, surprised, confused, and mixed vibes by checking words, slang, emojis, punctuation, and stretched spellings. The app also supports voice input and speech output for a more interactive user experience.”
