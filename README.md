# careerReboot AI 🚀

**Empowering women to restart their careers with AI-driven guidance, skill development, and community support.**

careerReboot AI is a comprehensive career comeback platform designed specifically for women returning to work after career breaks. It combines personalized skill gap analysis, AI-driven career insights, interactive learning resources, and community networking to help women confidently re-enter the workforce.

## 🎯 Problem We Solve

Women returning to work face unique challenges:
- **Skill Gaps**: Industry has evolved; their skills may be outdated
- **Confidence Issues**: Imposter syndrome and self-doubt after time away
- **Lack of Guidance**: No personalized roadmap for their specific situation
- **Limited Mentorship**: Few resources specifically for career returners
- **Isolation**: No community of people with similar experiences

## ✨ Key Features

- **AI Career Insights** - Skill gap analysis, readiness scoring, and personalized recommendations
- **Personalized Learning Roadmap** - 3-month customized learning plan with progress tracking
- **Career Path Recommendations** - Multiple paths with match scores and skill breakdowns
- **Learning Resources Hub** - Curated resources, workshops, and skill-based filtering
- **Mentor Messaging** - Direct messaging with experienced mentors and AI guidance
- **Advanced Search** - Multi-category search across jobs, resources, and mentors
- **Progress Tracking** - Visual indicators, milestones, and task completion
- **Export Features** - Download roadmaps and career analysis as PDF
- **Community Network** - Connect with other career returners and share experiences
- **Guest Mode** - Explore all features without signup

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Build Tool**: Vite
- **State Management**: React Query
- **Animations**: Framer Motion
- **Routing**: React Router
- **Testing**: Vitest + Playwright
- **Linting**: ESLint

## 📋 Prerequisites

- Node.js 16+
- npm (recommended)

## 🚀 Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/careerReboot-ai.git
cd career-comeback-ai-main

# Install dependencies
npm run install:all
```

### Development

```bash
# Start frontend only
npm run dev:frontend

# Start backend only
npm run dev:backend

# Start both together
npm run dev:full
```

The app will be available at `http://localhost:8080` (or whatever URL Vite prints).

### Build

```bash
# Build for production
npm run build
```

### Linting

```bash
# Check code quality
npm run lint
```

## 📖 Usage

### Guest Mode
1. Visit the home page
2. Click "Try Demo" to explore with a demo profile
3. Access all features without creating an account

### Sign Up
1. Click "Sign Up" in the navbar
2. Enter email, name, and password
3. Complete your profile with career information
4. Start your personalized journey

### Create Your Learning Plan
1. Go to "Career Analysis" dashboard
2. View recommended career paths
3. Click "Explore Path" on your desired role
4. Complete your 3-month learning roadmap
5. Track progress as you complete tasks

### Connect with Mentors
1. Navigate to "Messages"
2. Click "New Message"
3. Select a mentor from the list
4. Start your conversation
5. Receive AI-powered guidance

### Export Your Progress
1. On Dashboard or Learning Roadmap
2. Click "Export" button
3. Choose format (PDF, JSON, CSV)
4. Download your report

## 🔐 Demo Credentials

```
Email: demo@example.com
Password: Demo123456
```

## 📁 Project Structure

```
frontend/                           # React frontend (careerReboot experience)
├── src/
│   ├── components/                 # Reusable UI components
│   ├── pages/                      # Page components
│   └── lib/                        # Utilities and helpers
├── vite.config.ts
└── package.json

backend/                            # SecureApply backend (phased implementation)
├── src/
│   ├── modules/
│   │   ├── auth/                   # OTP + unique phone registration
│   │   ├── company-verification/   # Phishing scoring + trust gate
│   │   ├── resume/                 # Resume upload + encryption key lifecycle
│   │   └── matching/               # Role fit and verified-company matching
│   └── main.ts
└── package.json

ml-services/
├── phishing/                       # Trust scoring service for company verification
└── resume-intelligence/            # Resume analysis and recommendation service

shared/
├── types/                          # Shared DTOs/interfaces
└── constants/                      # Shared thresholds and constants

docs/
├── architecture/
│   └── secure-apply-flow.md        # End-to-end workflow
└── phases/
	 └── implementation-phases.md    # Phase-wise execution plan

Phishing/
└── dataset/                        # Existing phishing datasets for experimentation
```

## 🔐 SecureApply Integration Blueprint

careerReboot AI is now organized to support a SecureApply-first architecture:

1. Company Trust System
	- Verify companies through phishing score logic
	- Trust gate: only companies with score `>= 85` are marked verified

2. User Identity System
	- Register users through phone OTP
	- Block duplicate accounts for the same phone number

3. Resume Security + Intelligence System
	- Upload resumes securely
	- Encrypt resumes and generate user-owned access keys
	- Analyze resumes to recommend roles, verified companies, and skill improvements

4. Career Experience Layer
	- Reuse existing dashboard, roadmap, mentorship, and community features
	- Surface trusted-company recommendations and secure apply actions in UI

For detailed sequence and implementation phases, see:

- `docs/architecture/secure-apply-flow.md`
- `docs/phases/implementation-phases.md`

## 🔄 Data Persistence

All user data is stored in browser localStorage:
- User profiles
- Learning progress
- Saved resources
- Conversations
- Export history

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Documentation

- [App Workflow](./APP_WORKFLOW.md) - Complete user journey
- [AI Features](./AI_FEATURES.md) - AI implementation details
- [Guest Mode Guide](./GUEST_MODE_GUIDE.md) - Guest mode features

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Support

For support, email support@careerrebootai.com or open an issue on GitHub.

## 🙏 Acknowledgments

- Built with React and modern web technologies
- UI components from shadcn/ui
- Icons from Lucide React
- Animations with Framer Motion

---
## 🚀 Live Deployment

- **Live Website:** [Open VishwasX](https://vishwas-x-o3kl.vercel.app/)
- **Backend API:** [Open Backend](https://vishwasx-backend-894r.onrender.com)
- **API Documentation:** [Open API Docs](https://vishwasx-backend-894r.onrender.com/docs)

## 💻 Source Code

- **GitHub Repository:** [View Source Code](https://github.com/mounika-mullapudi/VishwasX)
## 💻 Source Code

- **GitHub Repository:** https://github.com/mounika-mullapudi/VishwasX

**Made with ❤️ for women returning to work**
