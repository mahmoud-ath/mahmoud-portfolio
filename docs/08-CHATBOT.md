# Chatbot System

## Architecture
Hybrid approach combining **rule-based intent matching** + **document search fallback**.

```
User message → intentMatcher.ts → matched? → return intent response
                                → no match → documentSearch.ts → return relevant snippet
                                                                 → no match → graceful fallback
```

## Files (`src/components/chatbot/`)
| File | Purpose |
|---|---|
| `ChatbotContainer.tsx` | Main wrapper & orchestrator |
| `ChatBubble.tsx` | Floating bubble (bottom-right, pulse animation) |
| `ChatWindow.tsx` | Chat interface with gradient header |
| `ChatMessage.tsx` | Message display component |
| `QuickActions.tsx` | Quick action buttons |
| `useChatbot.ts` | Custom hook for chat logic |
| `types.ts` | TypeScript interfaces |
| `data/intents.json` | 10 intent definitions |
| `data/documentContent.ts` | 7 knowledge base sections |
| `utils/intentMatcher.ts` | Keyword-based intent detection |
| `utils/documentSearch.ts` | Document search with similarity scoring |
| `utils/messageProcessor.ts` | Message processing pipeline |

## 10 Pre-configured Intents
greeting, about, skills, projects, experience, contact, cv-download, help, location, farewell

## 7 Knowledge Base Sections
CMH Data System, SmartMaint, Road Accidents, Tech Horizon, Energy Prediction, Skills Overview, Education & Certifications

## UI Features
- Floating bubble (bottom-right) with pulse animation
- Smooth open/close transitions
- Unread message badge
- Single-line input (after UX cleanup)
- Lucide icons instead of emojis (after UX cleanup)
