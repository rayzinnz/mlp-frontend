import { invoke } from "@tauri-apps/api/core";
import { marked } from "marked";

const chatWindow = document.getElementById("chat-window") as HTMLElement;
const chatInput = document.getElementById("chat-input") as HTMLTextAreaElement;
const sendBtn = document.getElementById("send-btn") as HTMLButtonElement;

function appendMessage(role: "user" | "assistant", text: string) {
  const msgDiv = document.createElement("div");
  msgDiv.className = `message ${role}`;

  const bubble = document.createElement("div");
  bubble.className = "bubble";

  if (role === "assistant") {
    bubble.innerHTML = marked.parse(text);
  } else {
    bubble.textContent = text;
  }

  msgDiv.appendChild(bubble);
  chatWindow.appendChild(msgDiv);

  // Auto-scroll to bottom
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

async function handleSend() {
  const text = chatInput.value.trim();
  if (!text) return;

  // User message
  appendMessage("user", text);
  chatInput.value = "";
  chatInput.style.height = "auto";

  try {
    // Call Rust backend
    const response = await invoke<string>("process_chat_message", { message: text });
    appendMessage("assistant", response);
  } catch (error) {
    console.error("Error invoking Rust command:", error);
    appendMessage("assistant", "**Error:** Failed to get a response from the backend.");
  }
}

// Handle Enter key (Shift+Enter for new line)
chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    handleSend();
  }
});

sendBtn.addEventListener("click", handleSend);

// Auto-expand textarea
chatInput.addEventListener("input", () => {
  chatInput.style.height = "auto";
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});
