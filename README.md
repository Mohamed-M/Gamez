<p align="center">
  <img src="./app/logo.png" alt="Gamez Logo" width="150">
</p> 

# Gamez AI

An AI Next.js application for discovering video games, managing a personal gaming backlog, and tracking gaming progress. The app integrates the RAWG Video Games Database API to retrieve game information and features an AI-powered chat assistant to help users with general gaming-related questions.

### Key Features

- **Game Discovery:** Search and browse video games using the RAWG API.
- **Game Backlog:** Add, update, and remove games from a personal collection.
- **Progress Tracking:** Organize games by status, including Wishlist, Pending, and Finished.
- **Game Information:** Display game details, including ratings, release dates, cover images, and ESRB ratings.
- **AI-Powered Chat:** Interactive gaming assistant with streaming responses for gaming-related questions.
- **Persistent Storage:** Maintain backlog data using browser local storage.
- **Responsive UI:** Interface designed for different screen sizes.
- **Loading & Error States:** Handle API requests, loading indicators, and unsuccessful searches.

## Get started

1. Install dependencies

   ```bash
   yarn
   ```

2. Start the app

   ```bash
   yarn run dec
   ```
   
3. API
- Add your `OPENAI_API_KEY` and `RAWG_KEY_API` API keys in _.env.example_ and rename it _.env.local_ 


### Technology Stack

- Next.js (App Router)
- React
- TypeScript
- Vercel AI SDK (`useChat`)
- OpenAI API (`gpt-4o`)
- RAWG Video Games Database API
- Next.js Route Handlers
- CSS Modules