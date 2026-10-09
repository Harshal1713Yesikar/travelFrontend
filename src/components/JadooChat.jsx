import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./JadooChat.css";

const JadooChat = () => {
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const [messages, setMessages] = useState([
        {
            role: "assistant",
            content:
                "Hi! 👋 Main Jadoo AI hoon. Flights, hotels, destinations aur trip planning mein main aapki help kar sakta hoon.",
            action: null,
        },
    ]);

    const sendMessage = async () => {
        if (!input.trim() || loading) return;

        const userMessage = {
            role: "user",
            content: input.trim(),
        };

        const updatedMessages = [...messages, userMessage];

        setMessages(updatedMessages);
        setInput("");
        setLoading(true);

        try {
            const response = await fetch("http://localhost:3001/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    messages: updatedMessages.map(({ role, content }) => ({
                        role,
                        content,
                    })),
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "AI response failed");
            }

            const aiMessage = {
                role: "assistant",
                content: data.reply,
                action: data.action || null,
            };

            setMessages([...updatedMessages, aiMessage]);
        } catch (error) {
            console.error("Chat Error:", error);

            setMessages([
                ...updatedMessages,
                {
                    role: "assistant",
                    content:
                        "Sorry 😔 abhi AI se response nahi aa paya. Please try again.",
                    action: null,
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleAction = (action) => {
        if (!action) return;

        if (action.type === "hotel_search") {
            navigate(
                `/booking?destination=${encodeURIComponent(
                    action.destination
                )}`
            );

            setIsOpen(false);
            return;
        }

        if (action.type === "flight_search") {
            navigate(
                `/Flight?from=${encodeURIComponent(
                    action.from
                )}&to=${encodeURIComponent(action.to)}`
            );

            setIsOpen(false);
            return;
        }

        if (action.type === "destination_search") {
            navigate(
                `/hotelList?destination=${encodeURIComponent(
                    action.destination
                )}`
            );

            setIsOpen(false);
            return;
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            {!isOpen && (

                <button
                    className="jadoo-chat-button"
                    onClick={() => setIsOpen(true)}
                >
                    <img
                        src="https://img.icons8.com/?size=100&id=eoxMN35Z6JKg&format=png&color=000000"
                        alt="AI"
                    />
                </button>
            )}

            {isOpen && (
                <div className="jadoo-chat-box">

                    <div className="jadoo-chat-header">
                        <div>
                            <div className="jadoo-chat-title">
                                Jadoo AI ✈️
                            </div>

                          
                        </div>

                        <button
                            className="jadoo-chat-close"
                            onClick={() => setIsOpen(false)}
                        >
                            ×
                        </button>
                    </div>

                    <div className="jadoo-chat-messages">

                        {messages.map((message, index) => (
                            <div key={index}>

                                <div
                                    className={`jadoo-message ${message.role === "user"
                                        ? "jadoo-user-message"
                                        : "jadoo-ai-message"
                                        }`}
                                >
                                    {message.content}
                                </div>

                                {message.action?.type === "hotel_search" && (
                                    <div className="jadoo-action-card">

                                        <div className="jadoo-action-icon">
                                            🏨
                                        </div>

                                        <div className="jadoo-action-content">
                                            <strong>
                                                Search Hotels
                                            </strong>

                                            <span>
                                                {message.action.destination}
                                            </span>
                                        </div>

                                        <button
                                            onClick={() =>
                                                handleAction(message.action)
                                            }
                                        >
                                            Search →
                                        </button>

                                    </div>
                                )}

                                {message.action?.type === "flight_search" && (
                                    <div className="jadoo-action-card">

                                        <div className="jadoo-action-icon">
                                            ✈️
                                        </div>

                                        <div className="jadoo-action-content">
                                            <strong>
                                                Search Flights
                                            </strong>

                                            <span>
                                                {message.action.from} →{" "}
                                                {message.action.to}
                                            </span>
                                        </div>

                                        <button
                                            onClick={() =>
                                                handleAction(message.action)
                                            }
                                        >
                                            Search →
                                        </button>

                                    </div>
                                )}

                                {message.action?.type === "flight_search" && (
                                    <div className="jadoo-action-card">
                                        <div className="jadoo-action-icon">
                                            ✈️
                                        </div>

                                        <div className="jadoo-action-content">
                                            <strong>
                                                Search Flights
                                            </strong>

                                            <span>
                                                {message.action.from} →{" "}
                                                {message.action.to}
                                            </span>
                                        </div>

                                        <button
                                            onClick={() =>
                                                handleAction(message.action)
                                            }
                                        >
                                            Search →
                                        </button>
                                    </div>
                                )}

                                {message.action?.type === "destination_search" && (
                                    <div className="jadoo-action-card">
                                        <div className="jadoo-action-icon">
                                            📍
                                        </div>

                                        <div className="jadoo-action-content">
                                            <strong>
                                                Explore Destination
                                            </strong>

                                            <span>
                                                {message.action.destination}
                                            </span>
                                        </div>

                                        <button
                                            onClick={() =>
                                                handleAction(message.action)
                                            }
                                        >
                                            Explore →
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}

                        {loading && (
                            <div className="jadoo-message jadoo-ai-message">
                                Thinking... 🤔
                            </div>
                        )}

                    </div>



                    <div className="jadoo-chat-input-area">

                        <input
                            type="text"
                            placeholder="Ask about hotels, flights..."
                            value={input}
                            onChange={(e) =>
                                setInput(e.target.value)
                            }
                            onKeyDown={handleKeyDown}
                            disabled={loading}
                        />

                        <button
                            onClick={sendMessage}
                            disabled={loading || !input.trim()}
                        >
                            ➤
                        </button>

                    </div>
                </div>
            )}
        </>
    );
};

export default JadooChat;