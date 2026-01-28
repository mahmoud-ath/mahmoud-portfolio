#!/bin/bash

# Dynamic Project Management System - Setup Script
# This script helps initialize the system and verify everything works

echo "================================"
echo "Portfolio Project Management Setup"
echo "================================"
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
echo "Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ Node.js is not installed${NC}"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi
echo -e "${GREEN}✓ Node.js found: $(node --version)${NC}"

# Check if npm is installed
echo "Checking npm installation..."
if ! command -v npm &> /dev/null; then
    echo -e "${RED}✗ npm is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✓ npm found: $(npm --version)${NC}"
echo ""

# Check dependencies
echo "Checking project dependencies..."
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo -e "${RED}✗ Failed to install dependencies${NC}"
        exit 1
    fi
fi
echo -e "${GREEN}✓ Dependencies ready${NC}"
echo ""

# Check if projects.json exists
echo "Checking data files..."
if [ ! -f "public/data/projects.json" ]; then
    echo -e "${YELLOW}! projects.json not found, creating from template...${NC}"
    mkdir -p public/data
    echo "[]" > public/data/projects.json
    echo -e "${GREEN}✓ Created empty projects.json${NC}"
else
    echo -e "${GREEN}✓ projects.json found${NC}"
fi
echo ""

# Summary
echo "================================"
echo -e "${GREEN}Setup Complete!${NC}"
echo "================================"
echo ""
echo "Next steps:"
echo "1. Install concurrently for easier development:"
echo "   npm install --save-dev concurrently"
echo ""
echo "2. Or run both servers manually:"
echo "   Terminal 1: npm run dev"
echo "   Terminal 2: node server.js"
echo ""
echo "3. Access the admin dashboard:"
echo "   http://localhost:3000/#/admin"
echo ""
echo "4. Login with password: Admin123!"
echo ""
echo "For more information, see ADMIN_GUIDE.md"
echo ""
