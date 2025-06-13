# Angular 19 SSR Application

This Angular 19 application is built with Server-Side Rendering (SSR) support and uses standalone components. It includes multiple environment configurations and a structured routing system.

## Features

- **Angular 19** with latest features
- **Server-Side Rendering (SSR)** enabled
- **Standalone Components** architecture
- **Multiple Environments** (d1, s1, p1)
- **Structured Routing System**

## Environment Configurations

The application supports three custom environments plus the default development and production environments:

### Environment Details

| Environment | Production | API URL | Logging | Description |
|-------------|------------|---------|---------|-------------|
| `development` | false | `http://localhost:3000/api` | true | Local development |
| `d1` | false | `https://d1-api.example.com/api` | true | Development environment 1 |
| `s1` | false | `https://s1-api.example.com/api` | false | Staging environment 1 |
| `p1` | true | `https://p1-api.example.com/api` | false | Production environment 1 |
| `production` | true | Default production config | false | Default production |

## Routing System

The application includes the following routes:

- `/dev` - Development dashboard with environment information
- `/lab/date` - Date laboratory for exploring Angular date pipes and functionality
- `/lab/pipe` - Pipe laboratory for exploring Angular built-in and custom pipes

## Development Scripts

### Starting the Development Server

```bash
# Default development environment
npm start

# Start with specific environments
npm run start:d1    # Development environment 1
npm run start:s1    # Staging environment 1
npm run start:p1    # Production environment 1 (use with caution)
```

### Building the Application

```bash
# Default production build
npm run build

# Build with specific environments
npm run build:d1    # Build for d1 environment
npm run build:s1    # Build for s1 environment
npm run build:p1    # Build for p1 environment
```

### Running Tests

```bash
npm run test
```

### SSR Development

```bash
# Build for SSR
npm run build

# Serve the SSR application
npm run serve:ssr:angular-app
```

## Component Structure

### Dev Component (`/dev`)
- Displays current environment configuration
- Shows development tools and system information
- Interactive buttons for testing API, clearing storage, and theme toggling

### Date Component (`/lab/date`)
- Demonstrates Angular date pipes
- Interactive date calculator
- Various date formatting examples
- Real-time date transformations

### Pipe Component (`/lab/pipe`)
- Showcases built-in Angular pipes (uppercase, lowercase, currency, etc.)
- Interactive text transformation
- JSON and slice pipe demonstrations
- Live pipe examples with user input

## Environment File Structure

```
src/environments/
├── environment.ts          # Default environment
├── environment.d1.ts       # Development environment 1
├── environment.s1.ts       # Staging environment 1
└── environment.p1.ts       # Production environment 1
```

## Angular.json Configuration

The `angular.json` file is configured with:
- Build configurations for all environments
- Serve configurations for each environment
- File replacement strategies for environment-specific builds
- Optimization settings per environment

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm start
   # or for specific environment
   npm run start:d1
   ```

3. **Navigate to the application:**
   Open your browser to `http://localhost:4200`

4. **Explore the routes:**
   - Visit `/dev` for environment dashboard
   - Visit `/lab/date` for date functionality
   - Visit `/lab/pipe` for pipe demonstrations

## Technology Stack

- **Angular 19** - Latest Angular framework
- **TypeScript** - Type-safe development
- **Angular SSR** - Server-side rendering
- **Standalone Components** - Modern Angular architecture
- **Angular Router** - Declarative routing
- **Angular Forms** - Reactive and template-driven forms
- **Angular Common** - Built-in pipes and directives

## Browser Support

This application supports all modern browsers that are supported by Angular 19.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test across different environments
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Project Summary

### ✅ Completed Requirements

- **Angular 19**: Successfully created with Angular 19.2.x
- **Server-Side Rendering (SSR)**:
  - SSR enabled from project creation
  - Server configuration in `src/server.ts`
  - Prerendering of static routes working
  - SSR build and serve scripts configured
- **Standalone Components**: All components generated as standalone, no traditional NgModules used, modern Angular architecture implemented
- **Environment Configuration (d1, s1, p1)**:
  - Three custom environments created: `d1`, `s1`, `p1`
  - `angular.json` configured with build and serve configurations
  - Environment-specific API URLs and settings
  - File replacement strategies implemented
- **Router System**:
  - Routes implemented as requested: `/dev`, `/lab/date`, `/lab/pipe`
  - Navigation menu with active link highlighting
  - Default route redirects to `/dev`

### 🎯 Additional Features Implemented

- **Dev Component**: Environment info, dev tools, theme toggle
- **Date Component**: Date pipes demo, interactive date calculator
- **Pipe Component**: Built-in pipes showcase, interactive text transformation
- Custom npm scripts for each environment
- Comprehensive documentation
- Responsive design with mobile support
- Dark theme support
- Global styles and utility classes

### 🚀 Ready to Use

1. Start development: `npm start` or `npm run start:d1`
2. Build for any environment: `npm run build:s1`, etc.
3. Explore the three main routes
4. Test environment-specific configurations
5. Deploy the SSR-enabled application
