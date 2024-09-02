import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Container, Paper, IconButton, Stack } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import OpenAI from "openai";
import speech, { useSpeechRecognition } from "react-speech-recognition";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  dangerouslyAllowBrowser: true,
});

const systemPrompt = "You are a helpful assistant specialized in car dealership interactions";

function Assistant() {
  const { listening, transcript } = useSpeechRecognition();
  const [thinking, setThinking] = useState(false);
  const [aiText, setAiText] = useState("");
  const [messages, setMessages] = useState([]);

  async function callGpt3API(message) {
    try {
      setThinking(true);
      const completion = await openai.chat.completions.create({
        model: "openai/gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
      });

      const response = completion.choices[0].message.content;
      const speechSynthesis = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(response);
      speechSynthesis.speak(utterance);

      setMessages([...messages, { role: "user", content: message }, { role: "assistant", content: response }]);
      setAiText(response);
    } catch (error) {
      console.error("Error in callGpt3API:", error);
      setAiText("Sorry, I encountered an error while processing your request.");
    } finally {
      setThinking(false);
    }
  }

  useEffect(() => {
    if (!listening && transcript) {
      callGpt3API(transcript);
    }
  }, [listening, transcript]);

  return (
    <Container width="sm" sx={{ textAlign: 'center', mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Stack
          direction="column"
          spacing={2}
          sx={{
            height: "400px",
            overflowY: "auto",
            backgroundColor: "#f5f5f5",
            borderRadius: 2,
            p: 2,
            mb: 3,
          }}
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              alignSelf={message.role === "user" ? "flex-end" : "flex-start"}
              bgcolor={message.role === "user" ? "primary.main" : "secondary.main"}
              color="white"
              p={2}
              borderRadius={2}
              maxWidth="75%"
            >
              <Typography variant="body2">{message.content}</Typography>
            </Box>
          ))}
        </Stack>

        {listening ? (
          <Typography variant="body1">Listening... Speak now!</Typography>
        ) : (
          <Typography variant="body1">Click the button to ask anything.</Typography>
        )}

        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
          <IconButton
            color="primary"
            onClick={() => {
              speech.startListening();
            }}
          >
            <MicIcon fontSize="large" />
          </IconButton>

          {thinking && <CircularProgress />}
        </Stack>
      </Paper>
    </Container>
  );
}

export default Assistant;
