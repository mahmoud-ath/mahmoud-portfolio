# Chatbot System (Archived)

> ⚠️ **This feature has been archived.** The chatbot is preserved in `src/archive/chatbot/` for reference but is no longer active in the portfolio.

## Former Architecture
Hybrid approach combining **rule-based intent matching** + **document search fallback**.

```
User message → intentMatcher.ts → matched? → return intent response
                                → no match → documentSearch.ts → return relevant snippet
                                                                 → no match → graceful fallback
```

## Archived Files (`src/archive/chatbot/`)
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
| `components/IconResponse.tsx` | Icon-rich message rendering |
| `utils/iconMapping.ts` | Icon name → Lucide component mapping |

## 10 Pre-configured Intents
greeting, about, skills, projects, experience, contact, cv-download, help, location, farewell

## 7 Knowledge Base Sections
CMH Data System, SmartMaint, Road Accidents, Tech Horizon, Energy Prediction, Skills Overview, Education & Certifications

## Why Archived
The chatbot used a simple keyword-matching approach (`string.includes()`) which was not representative of the ML/AI expertise showcased in the portfolio. It's preserved for reference while a more sophisticated solution is planned.
