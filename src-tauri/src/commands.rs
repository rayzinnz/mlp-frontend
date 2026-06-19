#[tauri::command]
pub fn process_chat_message(message: String) -> String {
    // This is where you'll eventually integrate your gRPC client.
    // For now, we return a formatted markdown response to test the UI.
    format!(
        "I received your message: **{}**\n\nThis is a response from the Rust backend. I can return **Markdown** like lists:\n- Item 1\n- Item 2\n\nAnd even `code blocks`!",
        message
    )
}
