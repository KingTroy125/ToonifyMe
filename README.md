# ToonifyMe 🎨

ToonifyMe is a web application that transforms your photos into cartoon-style avatars. Using AI technology, it can convert your regular photos into various popular cartoon styles like The Simpsons, Family Guy, South Park, and Disney.

![ToonifyMe Preview](placeholder.svg)

## 🚀 Features

- **Photo Transformation**: Upload your photos and convert them into various cartoon styles
- **Multiple Cartoon Styles**: Choose from popular styles including:
  - The Simpsons
  - Family Guy
  - South Park
  - Disney
- **User Authentication**: Secure login and signup functionality
- **Customization Options**: Enhance details and preserve colors with optional settings
- **Before & After Showcase**: View examples of transformations in different styles
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Technologies Used

- **Frontend**: React, TypeScript, Vite
- **Styling**: TailwindCSS, shadcn/ui components
- **State Management**: React Query
- **Routing**: React Router
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**: Radix UI primitives
- **API Integration**: REST API (simulated for demo)

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## 🔧 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ToonifyMe.git
   cd ToonifyMe
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to: `http://localhost:5173`

## 📦 Building for Production

To build the application for production:

```bash
npm run build
# or
yarn build
```

To preview the production build locally:

```bash
npm run preview
# or
yarn preview
```

## 📝 Project Structure

```
src/
├── components/      # UI components
├── hooks/           # Custom React hooks
├── lib/             # Utility functions and API integration
└── pages/           # Application pages
```

## 🔒 Authentication

The application includes a protected route system that requires users to log in before accessing certain features:

- `/login` - User login page
- `/signup` - User registration page
- `/style-selection` - Protected page for image transformation (requires authentication)

## 🌐 API Integration

The application is designed to connect to a backend API for image processing. Currently, it includes a simulated API response for demonstration purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

If you have any questions, please reach out to: your-email@example.com