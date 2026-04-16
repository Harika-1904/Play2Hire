#!/bin/bash
# play2hire Deployment Script for Ubuntu EC2

echo "Starting Deployment Setup for play2hire..."

# 1. Update and setup Node.js, git, npm, pm2, and nginx
echo "Installing Dependencies (Node.js, Git, Nginx)..."
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git nginx
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2

# 2. Get the Code (If this script is not already in the cloned repo)
# Assuming you cloned to ~/play2hire and are running it from inside
cd ~/play2hire || { echo "Directory ~/play2hire not found. Please clone the repo first."; exit 1; }

# 3. Setup Backend
echo "Setting up Backend..."
cd backend
npm install
npm run build || true # Just in case
# Ensure PM2 is stopped if it's already running to prevent EADDRINUSE
pm2 stop play2hire-backend || true
pm2 delete play2hire-backend || true

# Check if .env exists, if not, prompt
if [ ! -f .env ]; then
    echo "Creating a placeholder .env file. Please ensure MONGO_URI is set later."
    echo "PORT=5000" > .env
    echo "MONGO_URI=your_mongodb_cluster_string_here" >> .env
fi

pm2 start server.js --name "play2hire-backend"
pm2 save
pm2 startup
cd ..

# 4. Setup Frontend (Note: Folder is 'frontend', not 'event-zone')
echo "Setting up Frontend..."
cd frontend
# Clean install to avoid react-scripts/vite issues
rm -rf node_modules package-lock.json
npm install
npm run build
cd ..

# 5. Configure Nginx
echo "Configuring Nginx..."
sudo rm -f /etc/nginx/sites-enabled/default

cat <<EOF | sudo tee /etc/nginx/sites-available/play2hire
server {
    listen 80;
    server_name _; # Responds to any public IP

    # Serve React Frontend
    location / {
        root /home/ubuntu/play2hire/frontend/dist;
        index index.html;
        try_files \$uri /index.html;
    }

    # Reverse proxy API requests to backend
    location /api/ {
        proxy_pass http://localhost:5000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

sudo ln -s /etc/nginx/sites-available/play2hire /etc/nginx/sites-enabled/ || true
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl enable nginx

echo "Deployment complete! Your app should now be accessible on your EC2 instance's IP Address over port 80."
echo "Remember to check your AWS Security Group to ensure ports 22, 80, and 443 are open."
