# Manas Raksha (मानस रक्षा)

<div align="center">

![Manas Raksha](https://img.shields.io/badge/Manas%20Raksha-Mind%20Protection-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Demo-green?style=for-the-badge)
![License](https://img.shields.io/badge/License-Proprietary-red?style=for-the-badge)

### AI-Assisted Mental Health Monitoring & Victim Support System

**Integrated with Crime and Criminal Tracking Network & Systems (CCTNS)**

[🌐 Live Demo](https://manas-raksha.vercel.app/) | [📖 Documentation](#-overview) | [🚀 Getting Started](#-getting-started)

</div>

---

## 📋 About

**Manas Raksha** (meaning "Mind Protection" in Sanskrit) is a comprehensive, victim-centric case management and mental health monitoring platform designed to support survivors of violence through their entire journey—from complaint registration to rehabilitation and post-case follow-up.

Built for law enforcement agencies, caseworkers, and support organizations, this platform bridges the critical gap between police systems and victim support services, ensuring that no survivor falls through the cracks during their case lifecycle.

### 🎯 Mission

To provide a secure, integrated, and intelligent platform that empowers law enforcement and support workers to deliver timely, compassionate, and effective assistance to victims of crime while maintaining strict compliance with data protection and privacy regulations.

### ✨ Core Capabilities

**Manas Raksha** combines real-time case tracking, AI-powered risk assessment, and seamless integration with India's Crime and Criminal Tracking Network & Systems (CCTNS) to provide:

- 🔐 **Secure CCTNS Integration** - Token-based authentication with existing police infrastructure
- 📊 **Real-time Dashboards** - District-level overview with comprehensive case statistics
- 🗂️ **End-to-End Case Management** - Track cases through 8 distinct lifecycle stages
- 👥 **Victim-Centric Monitoring** - Consent-based tracking respecting privacy and dignity
- 🤖 **AI Risk Assessment** - Predictive analytics to identify high-risk cases requiring immediate intervention
- 📝 **Comprehensive Action Logging** - Chronological record of all interventions and follow-ups
- 🗺️ **Geographic Visualization** - District heatmaps showing case distribution and risk levels
- 📱 **Multi-Channel Communication** - SMS, WhatsApp, and voice support respecting victim preferences
- 🔒 **Privacy & Compliance First** - Built with data protection and legal compliance at its core

## 🎯 Overview

Manas Raksha (मानस रक्षा) means "Mind Protection" in Sanskrit. This platform bridges the gap between law enforcement systems and victim support services, ensuring that no survivor falls through the cracks during their case lifecycle.

### Key Features

- **🔐 Secure Authentication & Authorization**: Role-based access control with CCTNS integration
- **📊 Real-time Dashboard**: District-level overview with case statistics and monitoring metrics
- **🗂️ Case Management**: Track cases through all stages from complaint to post-case follow-up
- **👥 Victim Registration & Tracking**: Comprehensive victim profiles with consent-based monitoring
- **🤖 AI-Powered Risk Assessment**: Predictive analytics for identifying high-risk cases requiring immediate intervention
- **📝 Action Logging**: Chronological record of all caseworker interventions and follow-ups
- **🗺️ District Heatmap**: Geographic visualization of case distribution and risk levels
- **🔗 CCTNS Integration**: Secure token-based authentication flow with external police systems
- **📱 Communication Channels**: Multi-channel support (SMS, WhatsApp, Voice) respecting victim preferences

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v20+ (managed via mise-en-place)
- **pnpm**: v9+ (managed via mise-en-place)
- A modern web browser (Chrome, Firefox, Safari, or Edge)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <https://github.com/roshan-1205/Manas-Raksha.git>
   cd "Manas Raksha"
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Start the development server**:
   ```bash
   pnpm dev
   ```

   The application will be available at `https://localhost:8443` (or the port specified in `$PORT`).

### Available Scripts

- **`pnpm dev`**: Start the Vite development server with hot module replacement
- **`pnpm build`**: Build the production-ready application
- **`pnpm preview`**: Preview the production build locally
- **`pnpm format`**: Format code using oxfmt

## 📁 Project Structure

```
Manas Raksha/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── Header.tsx       # Application header with navigation
│   │   ├── Sidebar.tsx      # Main navigation sidebar
│   │   ├── StatusCard.tsx   # Dashboard metric cards
│   │   ├── RiskBadge.tsx    # Risk level indicators
│   │   ├── CaseLifecycle.tsx        # Case stage visualization
│   │   ├── DistrictHeatmap.tsx      # Geographic case distribution
│   │   ├── AIInsightsPanel.tsx      # AI-powered risk analysis
│   │   ├── CommunicationChannels.tsx # Victim communication preferences
│   │   ├── EscalationDialog.tsx     # Case escalation interface
│   │   └── SecurityFooter.tsx       # Security and compliance footer
│   ├── pages/              # Application pages/views
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── CasesPage.tsx
│   │   ├── VictimRegistrationPage.tsx
│   │   ├── VictimsPage.tsx
│   │   ├── ActionLogPage.tsx
│   │   ├── CCTNSPage.tsx
│   │   ├── CCTNSPortalPage.tsx
│   │   ├── TokenVerificationPage.tsx
│   │   └── SettingsPage.tsx
│   ├── data/
│   │   └── mockData.ts     # Mock data for demonstration
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # React application entry point
│   └── index.css           # Global styles and Tailwind CSS imports
├── .figma/                 # Figma Make configuration
├── index.html              # HTML entry point
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Project dependencies
└── README.md               # This file
```

## 🏗️ Tech Stack

### Core Technologies

- **React 19**: Modern UI framework with the latest features
- **TypeScript 5.7**: Type-safe JavaScript for improved developer experience
- **Vite 8**: Next-generation frontend build tool with lightning-fast HMR

### Styling & UI

- **Tailwind CSS v4**: Utility-first CSS framework via `@tailwindcss/vite` plugin
- **Lucide React**: Beautiful, consistent icon set

### Development Tools

- **oxfmt**: Fast code formatter
- **mise-en-place**: Toolchain version management (Node.js, pnpm)
- **Figma Make**: Integrated development and preview environment

## 🎨 Design System

### Color Scheme

The application uses a professional, accessible color palette optimized for data-heavy interfaces:

- **Primary**: Blue tones for navigation and primary actions
- **Success**: Green for positive states and completed actions
- **Warning**: Amber for moderate risk and pending items
- **Danger**: Red for high risk and critical alerts
- **Neutral**: Slate grays for text and backgrounds

### Typography

System font stack prioritizing readability and cross-platform consistency.

### Accessibility

- WCAG 2.1 AA compliant color contrast ratios
- Keyboard navigation support
- Screen reader friendly semantic HTML
- Focus indicators on interactive elements

## 🔒 Security & Compliance

### Data Protection

- **Role-Based Access Control (RBAC)**: Officers, caseworkers, and administrators have distinct permission levels
- **Secure Token Authentication**: CCTNS integration uses time-limited, signed tokens
- **Consent-Based Monitoring**: All victim tracking requires explicit documented consent
- **Data Minimization**: Only essential victim information is collected and displayed

### Compliance Footer

Every page includes a security footer displaying:
- Data retention policies
- Audit trail notifications
- Compliance certifications (IT Act, POCSO, Data Protection Framework)
- Emergency contact information

## 📊 Case Lifecycle Stages

The platform tracks cases through eight distinct stages:

1. **Complaint Registration**: Initial FIR filing and case creation
2. **Investigation**: Evidence gathering and suspect identification
3. **Trial**: Court proceedings and legal representation
4. **Compensation / Relief**: Financial assistance and immediate relief
5. **Rehabilitation**: Long-term support and reintegration services
6. **Protection / Relocation**: Physical safety measures when required
7. **Case Closure**: Legal conclusion and final documentation
8. **Post-case Follow-up**: Ongoing wellbeing monitoring

## 🤖 AI-Powered Risk Assessment

The platform includes a demonstration of AI-driven risk prediction based on:

- **Check-in frequency trends**: Detecting withdrawal or disengagement
- **Case complexity**: Multi-factor offenses or ongoing threats
- **Support network strength**: Family and community involvement
- **Protective order compliance**: Monitoring adherence to court orders
- **Communication responsiveness**: Victim engagement with caseworkers

Risk levels are categorized as **High**, **Moderate**, or **Low**, with confidence indicators to guide caseworker prioritization.

## 🔗 CCTNS Integration Demo

The application includes a demonstration flow for secure integration with external police systems:

1. **CCTNS Portal Login**: Simulated police portal authentication
2. **Token Generation**: Secure time-limited access token creation
3. **Token Verification**: Validation and role extraction
4. **Seamless Access**: Automatic routing to appropriate dashboard

This demonstrates how Manas Raksha can integrate with existing law enforcement infrastructure while maintaining security and audit trails.

## 🌍 Multi-District Support

Currently configured for Maharashtra state with support for:

- Nagpur
- Amravati
- Nashik
- Aurangabad
- Pune
- Solapur
- Kolhapur
- Latur

The architecture supports easy expansion to additional districts and states.

## 🛠️ Development

### Code Style

The project uses **oxfmt** for consistent code formatting. Run `pnpm format` before committing changes.

### Important Notes

- **Use double quotes** for strings containing apostrophes to prevent build errors
- **Export components as default exports** for consistency
- **Ensure JSX tags are properly closed** and braces are balanced
- **Follow TypeScript strict mode** for type safety

### Hot Module Replacement

The Vite development server provides instant feedback through HMR. Changes to source files are reflected immediately in the browser without full page reloads.

## 📝 Data Model

### Case Object

```typescript
interface Case {
  id: string;                  // Unique case identifier
  victimId: string;            // Anonymized victim reference
  victimName: string;          // Partial name for UI display
  district: string;            // Geographic jurisdiction
  policeStation: string;       // Reporting station
  stage: CaseStage;           // Current lifecycle stage
  riskLevel: RiskLevel;       // High | Moderate | Low
  lastCheckIn: string;        // ISO date of last contact
  assignedCaseworker: string; // Responsible officer
  followUpStatus: string;     // Pending | Completed | Overdue
  protectionStatus: string;   // Active | Pending | Not Required
  actionRequired: boolean;    // Immediate attention flag
  // ... additional fields
}
```

### Action Log Entry

```typescript
interface ActionLog {
  id: string;
  dateTime: string;
  caseId: string;
  caseworker: string;
  actionType: string;
  description: string;
  status: 'Completed' | 'Pending' | 'In Progress';
  followUpDate: string;
}
```

## 🚦 Roadmap

Future enhancements planned:

- [ ] Real backend API integration (replacing mock data)
- [ ] Document management system for evidence and case files
- [ ] SMS/WhatsApp API integration for automated notifications
- [ ] Multi-language support (Hindi, Marathi, regional languages)
- [ ] Mobile-responsive optimizations
- [ ] Advanced analytics and reporting dashboard
- [ ] Integration with additional state-level systems
- [ ] Offline mode for field caseworkers

## 👥 User Roles

### Police Officer
- View district-wide case statistics
- Access investigation details
- Coordinate with caseworkers
- Update case stages

### Caseworker
- Register new victims
- Log intervention actions
- Schedule and track follow-ups
- Monitor risk assessments
- Escalate critical cases

### Administrator
- System configuration
- User management
- Access control
- Audit log review

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes with clear messages
4. Format your code (`pnpm format`)
5. Push to your branch
6. Open a Pull Request

## 📄 License

This project is proprietary software designed for law enforcement and victim support organizations. Unauthorized distribution or use is prohibited.

## 📞 Support

For technical support or feature requests, please contact the development team.

## ⚠️ Important Disclaimers

- **Demo Application**: This is a demonstration platform using mock data
- **Not Production Ready**: Requires backend integration, security hardening, and compliance review before deployment
- **Privacy First**: Real implementations must comply with all applicable data protection laws
- **No Real Victim Data**: Never use this demo with actual victim information

---

**Built with ❤️ for victim support and community safety**
