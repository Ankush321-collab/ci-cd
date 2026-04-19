AWS_DEPLOYED FRONTEND=http://18.61.163.8:8080/
AWS_DEPLOYED BACKEND=http://18.61.163.8:5000/
# CI/CD Pipeline Project

[![Build Status](https://github.com/Ankush321-collab/ci-cd/workflows/CI/CD%20Pipeline/badge.svg)](https://github.com/Ankush321-collab/ci-cd/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/Ankush321-collab/ci-cd/releases)

A modern full-stack application with automated CI/CD pipeline demonstrating best practices for continuous integration and deployment to AWS infrastructure.

## 📋 Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Usage Instructions](#usage-instructions)
- [CI/CD Pipeline](#cicd-pipeline)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Architecture](#architecture)
- [Contributing](#contributing)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)
- [License](#license)
- [Contact](#contact)

## 🎯 Overview

This project demonstrates a complete CI/CD workflow featuring:
- **Frontend**: React application served on port 8080
- **Backend**: Node.js/Express API server on port 5000
- **CI/CD**: GitHub Actions for automated testing and deployment
- **Infrastructure**: AWS EC2 deployment with automated provisioning

The pipeline automatically builds, tests, and deploys the application on every push to the main branch.

## ✅ Prerequisites

Before you begin, ensure you have the following installed:

### Required Software
- **Node.js** (v18.x or higher)
- **npm** (v9.x or higher) or **yarn** (v1.22.x or higher)
- **Git** (v2.30 or higher)
- **Docker** (v20.x or higher) - optional, for containerized development

### For AWS Deployment
- **AWS CLI** (v2.x)
- **SSH client** (OpenSSH)
- **AWS Account** with EC2 access

### Verify Installation
```bash
node --version    # Should show v18.x or higher
npm --version     # Should show v9.x or higher
```

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
```

### 2. Environment Configuration
Create environment files for both frontend and backend:

```bash
# Create backend .env

# Create frontend .env
```

Edit the `.env` files with your configuration (see [Environment Variables](#environment-variables) section).

### 3. Install Dependencies

#### Backend Setup
```bash
```

#### Frontend Setup
```bash
```

### 4. Database Setup (if applicable)
```bash
# Run database migrations
# Seed initial data (optional)
```

## 💻 Usage Instructions

### Running Locally

#### Start Backend Server
```bash
# Server will start on http://localhost:5000
```

#### Start Frontend Development Server
```bash
# Application will open on http://localhost:8080
```

### Available Scripts

#### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with hot reload
- `npm test` - Run test suite
- `npm run lint` - Run ESLint

#### Frontend
- `npm start` - Start development server
- `npm run build` - Create production build
- `npm test` - Run test suite
- `npm run lint` - Run ESLint

### Accessing the Application
- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/health

## 🔄 CI/CD Pipeline

Our continuous integration and deployment pipeline is configured using **GitHub Actions**.

### Workflow Triggers
- **Push** to `main` branch
- **Pull Request** to `main` branch
- **Manual trigger** via GitHub Actions tab

### Pipeline Stages

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Checkout  │ -> │    Build    │ -> │    Test     │ -> │   Deploy    │
│    Code     │    │   & Lint    │    │   & Scan    │    │   to AWS    │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

1. **Build Stage**
   - Install dependencies
   - Run linting checks
   - Build frontend assets

2. **Test Stage**
   - Run unit tests
   - Run integration tests
   - Security vulnerability scanning

3. **Deploy Stage** (main branch only)
   - Build Docker images (if applicable)
   - Deploy to AWS EC2
   - Run health checks
   - Notify on deployment status

### Configuration Files
- **GitHub Actions**: `.github/workflows/ci-cd.yml`
- **Docker**: `Dockerfile` and `docker-compose.yml`
- **AWS**: `scripts/deploy.sh`

## 🌐 Deployment

### AWS Infrastructure

The application is deployed on AWS EC2 instances with the following endpoints:

| Service | URL | Status |
|---------|-----|--------|
| Frontend | [http://18.61.163.8:8080/](http://18.61.163.8:8080/) | Development |
| Backend API | [http://18.61.163.8:5000/](http://18.61.163.8:5000/) | Development |
| Health Check | [http://18.61.163.8:5000/health](http://18.61.163.8:5000/health) | Active |

> **⚠️ Security Note**: These are development/staging URLs. The IP addresses are exposed for demonstration purposes. For production use, configure HTTPS, security groups, and consider using a domain name with Route 53.

### Deployment Architecture
- **Frontend**: Served via Nginx on EC2
- **Backend**: Node.js process managed by PM2
- **Database**: AWS RDS (if configured) or local MongoDB/PostgreSQL
- **CI/CD**: GitHub Actions → AWS EC2 via SSH

## 📚 API Documentation

### Base URL
```
```

### Endpoints

#### Health Check
```http
```
**Response:**
```json
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00Z",
  "version": "1.0.0"
```

#### Get All Items
```http
```
**Response:**
```json
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Sample Item",
      "createdAt": "2024-01-15T10:00:00Z"
    }
  ]
```

#### Create Item
```http
  "name": "New Item",
  "description": "Item description"
```
### Authentication
Currently, the API uses open endpoints for demonstration. For production:
- Implement JWT token authentication
- Add API key validation
- Configure CORS policies

## 🏗️ Architecture

```
┌─────────────┐         ┌──────────────┐         ┌─────────────────┐
│   GitHub    │         │   GitHub     │         │   AWS EC2       │
│   Repo      │ ──────> │   Actions    │ ──────> │   Instance      │
│             │  Push   │   (CI/CD)    │  Deploy │   (Docker)      │
└─────────────┘         └──────────────┘         └─────────────────┘
                                                            │
                              ┌─────────────────────────────┼─────────────┐
                              │                             │             │
                              ▼                             ▼             ▼
                        ┌──────────┐                ┌──────────┐   ┌──────────┐
                        │  Nginx   │                │  Node.js │   │  DB      │
                        │  (Web)   │                │  (API)   │   │  (Data)  │
                        │  :8080   │                │  :5000   │   │  :5432   │
                        └──────────┘                └──────────┘   └──────────┘
```

### Data Flow
1. Developer pushes code to GitHub
2. GitHub Actions triggers build and test
3. On success, deploys to AWS EC2 via SSH
4. Docker containers restart with new images
5. Nginx serves frontend, Node.js serves API

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Branch Naming Convention
- `feature/description` - New features
- `bugfix/description` - Bug fixes
- `hotfix/description` - Critical fixes
- `docs/description` - Documentation updates

### Commit Message Standards
Follow conventional commits:
```
```

### Pull Request Process
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
6. Ensure CI checks pass
7. Request review from maintainers
8. Merge only after approval

## 🔐 Environment Variables

### Backend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment mode | `development` |
| `DB_HOST` | Database host | `localhost` |
| `DB_PORT` | Database port | `5432` |
| `DB_NAME` | Database name | `cicd_db` |
| `DB_USER` | Database user | `admin` |
| `DB_PASSWORD` | Database password | `secret` |
| `JWT_SECRET` | JWT signing key | `your-secret-key` |
| `CORS_ORIGIN` | Allowed CORS origin | `http://localhost:8080` |

### Frontend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API URL | `http://localhost:5000` |
| `REACT_APP_ENV` | Environment name | `development` |
| `PORT` | Development server port | `8080` |

### Production Environment
For AWS deployment, set these in the EC2 instance or use AWS Systems Manager Parameter Store.

## 🛠️ Troubleshooting

### Common Issues

#### CORS Errors
**Problem**: Frontend cannot connect to backend
**Solution**: 
- Ensure `CORS_ORIGIN` in backend `.env` matches your frontend URL
- Check that backend is running before frontend
- Verify ports are not blocked by firewall

#### AWS Connection Issues
**Problem**: Cannot access deployed application
**Solution**:
- Check AWS Security Group rules (ports 8080 and 5000 must be open)
- Verify EC2 instance is running
- Check application logs: `ssh ec2-user@18.61.163.8 "pm2 logs"`
- Ensure services are running: `pm2 status`

#### Build Failures
**Problem**: GitHub Actions build fails
**Solution**:
- Check Node.js version compatibility
- Run `npm ci` locally to verify lock file
- Check for linting errors: `npm run lint`
- Ensure all tests pass locally: `npm test`

#### Port Already in Use
**Problem**: `EADDRINUSE: Address already in use`
**Solution**:
```bash
# Find process using port
```

### Getting Help
- Check [GitHub Issues](https://github.com/Ankush321-collab/ci-cd/issues)
- Review [GitHub Actions Logs](https://github.com/Ankush321-collab/ci-cd/actions)
- Contact maintainers (see [Contact](#contact))

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
Copyright (c) 2024 Ankush321-collab
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 📞 Contact

**Maintainer**: Ankush321-collab

- **GitHub**: [@Ankush321-collab](https://github.com/Ankush321-collab)
- **Project Link**: [https://github.com/Ankush321-collab/ci-cd](https://github.com/Ankush321-collab/ci-cd)
- **Issues**: [https://github.com/Ankush321-collab/ci-cd/issues](https://github.com/Ankush321-collab/ci-cd/issues)

---

<p align="center">
  <sub>Built with ❤️ using React, Node.js, and GitHub Actions</sub>
</p>
