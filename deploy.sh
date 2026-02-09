#!/bin/bash

# Deployment script for Kids Story App
VM_IP="103.225.112.95"
VM_USER="root"
REMOTE_DIR="/root/kids-app"

echo "🚀 Kids Story App - Deployment Script"
echo "======================================"
echo ""

# Create remote directory and copy files
echo "📦 Copying files to VM..."
ssh ${VM_USER}@${VM_IP} "mkdir -p ${REMOTE_DIR}"

# Copy necessary files (excluding node_modules)
rsync -avz --progress \
    --exclude 'node_modules' \
    --exclude 'dist' \
    --exclude '.git' \
    --exclude 'release' \
    --exclude 'electron' \
    ./ ${VM_USER}@${VM_IP}:${REMOTE_DIR}/

echo ""
echo "🔨 Building and starting container on VM..."

# SSH and run docker commands
ssh ${VM_USER}@${VM_IP} << 'ENDSSH'
cd /root/kids-app

# Create network if doesn't exist
docker network create family-brain-network 2>/dev/null || true

# Stop existing container
docker-compose down 2>/dev/null || true

# Build and start
docker-compose up -d --build

# Show status
echo ""
echo "📊 Container Status:"
docker ps | grep kids-story

echo ""
echo "✅ Deployment complete!"
ENDSSH

echo ""
echo "🌐 Your app should be accessible at:"
echo "   http://${VM_IP}:3001"
echo ""
