# Next Snake

This is a classic Snake game built using Next.js for the frontend and Firebase for backend services like authentication and high-score storage. The game features a responsive design, user authentication, difficulty levels, sound effects, a leaderboard to track high scores, and uses snake case for all text!

## Features

- **User Authentication**: Sign in with Google to save your high scores.
- **Responsive Design**: Play the game on both desktop -using the arrow keys- and mobile devices -using buttons on the screen-.
- **Difficulty Levels**: Choose from 5 difficulty levels to adjust the snake's speed.
- **Sound Effects**: Enjoy sound effects for eating, game over, and game start (can be muted).
- **Leaderboard**: Compete with other players and see the top 10 high scores.
- **Pause/Resume**: Pause the game and resume whenever you want.
- **Mobile Controls**: On-screen controls for mobile devices.

## Technologies Used

- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Firebase (Authentication, Firestore)
- **State Management**: React hooks (useState, useEffect, useCallback, etc.), URL query parameters.
- **Audio**: HTML5 Audio for sound effects
- **Routing**: Next.js routing for navigation

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/snake-game-nextjs-firebase.git
   cd snake-game-nextjs-firebase
   ```

2. **Install dependencies**:

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up Firebase**:

   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable **Google Authentication** and **Firestore** in the project settings
   - Add your Firebase configuration in a `.env.local` file in the root directory of the project

   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   ```

4. **Run the development server**:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open the app**:
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

## How to Play

1. **Start the Game**: Press the `start` button to start the game.
2. **Control the Snake**:
   - Use the arrow keys (`↑`, `↓`, `←`, `→`) or (`W`, `A`, `S`, `D`) to move the snake.
   - On mobile, use the on-screen buttons
3. **Pause/Resume**: Click the `pause` button to pause the game and `resume` to continue.
4. **Reset**: Click the `reset` button to reset the game (Your current score will not be saved).
5. **Adjust Difficulty**: Use the slider to change the difficulty level (1 = slowest, 5 = fastest).
6. **Mute Sounds**: Toggle the `mute` checkbox to enable or disable sound effects.
7. **View Highscores**: Visit the `/highscores` page to view the top 10 scores.

## Firebase Integration

- **Authentication**: Users can sign in with Google to save their high scores.
- **Firestore**: High scores are stored in a Firestore collection called `highscores`. Each score document contains the player's name, score, and timestamp.

## Project Structure

```bash
├── actions/        # Server actions
├── app/            # Pages for routing
├── components/     # Reusable UI components
├── constants/      # Constants
├── hooks/          # Custom React Hooks
├── lib/            # Utility functions
├── public/         # Static assets
├── types/          # TypeScript declarations
└── package.json    # Project dependencies and scripts
```

## Contributing

Contributions are welcome! If you find a bug or have a suggestion, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

Enjoy playing the Snake Game! 🐍
