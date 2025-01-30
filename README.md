# Interactive Quiz Application

A modern, engaging quiz application built with Next.js and TypeScript, featuring a beautiful dark theme with glassmorphism effects and gamification elements.
The project is deployed at vercel, here is the live project link: https://testline-assingment-9841zh6tz-yatharth-mishras-projects.vercel.app/

## Features

- 🎯 Interactive quiz interface with multiple-choice questions
- 🎨 Modern UI with glassmorphism effects and gradient accents
- ⚡ Real-time feedback on answers
- 📊 Progress tracking and scoring system
- 🔥 Streak counter for consecutive correct answers
- ⏱️ Time tracking per question
- 📱 Fully responsive design
- 🎮 Gamification elements for enhanced engagement

## Tech Stack

- [Next.js 14](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Yatharth2609/Testline-Assingment.git
cd timelines
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

```
src/
├── app/                  # Next.js app directory
│   ├── api/             # API routes
│   └── page.tsx         # Main page component
├── components/          # React components
│   ├── Quiz.tsx         # Main quiz component
│   ├── QuizContainer.tsx # Quiz container with state management
│   ├── QuizQuestion.tsx # Individual question component
│   └── StartQuiz.tsx    # Quiz start screen
├── context/            # React context
│   └── QuizContext.tsx # Quiz state management
└── types/              # TypeScript type definitions
    └── quiz.ts         # Quiz-related types
```

## Features in Detail

### Quiz Flow
1. Welcome screen with quiz information
2. Multiple-choice questions with immediate feedback
3. Explanation for each answer
4. Progress tracking with visual indicators
5. Final results screen with detailed performance analysis

### Gamification Elements
- Streak counter for consecutive correct answers
- Time tracking per question
- Achievement display
- Progress visualization
- Performance statistics

### UI/UX Features
- Dark theme with glassmorphism effects
- Gradient accents for visual appeal
- Smooth animations and transitions
- Responsive design for all devices
- Clear visual feedback for user actions

## API Integration

The application fetches quiz data from an external API endpoint. The data is transformed to match the application's type structure through a Next.js API route.

## Deployment

The application can be deployed using [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme), the platform from the creators of Next.js.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Next.js team for the excellent framework
- Tailwind CSS for the utility-first CSS framework
- Framer Motion for the animation capabilities
