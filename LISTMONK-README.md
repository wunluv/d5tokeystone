# 🚀 Listmonk Setup for Heavenletters

## Overview

This configuration provides a **conflict-free** Listmonk installation that works alongside your existing Mailu mail server. Listmonk will handle your Heavenletters newsletter campaigns and subscriber management.

## ✅ Conflict Avoidance

**No Port Conflicts:**
- Listmonk: `9000` (Mailu doesn't use this)
- Database: `5433` (Mailu doesn't use this)

**No Network Conflicts:**
- Listmonk network: `192.168.205.0/24` (Mailu uses `192.168.203.0/24`)
- Separate Docker network: `listmonk_network`

**No Volume Conflicts:**
- Listmonk data: `/opt/listmonk/*` (Mailu uses `/vmail/*`)
- Independent Docker volumes

**No Service Conflicts:**
- Unique container names: `listmonk_app`, `listmonk_db`
- No shared services with Mailu

## 📋 Quick Start

### 1. Run the Setup Script

```bash
# Download and run the automated setup
wget -O setup-listmonk.sh https://your-server/setup-listmonk.sh
chmod +x setup-listmonk.sh
./setup-listmonk.sh
```

### 2. Manual Setup (if needed)

```bash
# Create directories
sudo mkdir -p /opt/listmonk
cd /opt/listmonk

# Copy the configuration
cp /path/to/listmonk-standalone.yml docker-compose.yml

# Start services
docker compose up -d

# Check status
docker compose logs -f
```

## 🌐 Access Information

**After setup:**
- **Listmonk Web Interface:** http://localhost:9000
- **Database Host:** localhost:5433
- **Database:** listmonk_db
- **Username:** listmonk_user
- **Password:** ChangeThisToASecurePassword123!

## 📊 Import Your Data

### Step 1: Set up Admin User
1. Open http://localhost:9000
2. Create your admin account
3. Complete the initial setup

### Step 2: Import Subscribers
1. Go to **Subscribers** → **Import**
2. Upload your CSV file:
   - `heavenletters_subscribers.csv` (11,057 active subscribers)
   - `heavenletters_all_members.csv` (18,067 all members)
3. Map the columns:
   - Email → Email
   - First_Name → Name
   - Country → Country
   - Language → Language
   - Subscription_Status → Status

### Step 3: Create Mailing Lists
1. **Subscribers** → **Lists**
2. Create lists by language:
   - English Subscribers
   - German Subscribers
   - French Subscribers
   - etc.

## 🔧 Configuration

### Database Credentials
**Current (change for security):**
```yaml
POSTGRES_USER: listmonk_user
POSTGRES_PASSWORD: ChangeThisToASecurePassword123!
POSTGRES_DB: listmonk_db
```

**To change credentials:**
1. Stop Listmonk: `docker compose down`
2. Update `/opt/listmonk/docker-compose.yml`
3. Start again: `docker compose up -d`

### Performance Tuning
For your 18k subscribers, current settings are optimized:
- Database connections: 25 max
- Memory allocation: Appropriate for your scale
- Health checks: Every 10 seconds

## 🔒 Security Features

- **Local Access Only:** Web interface only accessible on localhost
- **Isolated Network:** Separate from Mailu services
- **Volume Encryption:** Ready for Docker secrets
- **Health Monitoring:** Automatic restart on failures

## 📁 File Structure

```
/opt/listmonk/
├── docker-compose.yml      # Main configuration
├── uploads/               # Campaign assets
└── listmonk_data/         # Database files (Docker volume)

CSV Files:
├── heavenletters_subscribers.csv  # Active subscribers
└── heavenletters_all_members.csv  # Complete dataset
```

## 🚨 Troubleshooting

### Check Service Status
```bash
cd /opt/listmonk
docker compose ps
```

### View Logs
```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f listmonk
```

### Restart Services
```bash
docker compose restart
```

### Common Issues

**Port Already in Use:**
- Listmonk uses 9000 and 5433
- Check: `netstat -tlnp | grep :9000`

**Permission Errors:**
- Ensure user can write to `/opt/listmonk/`
- Check Docker permissions

**Database Connection:**
- Verify PostgreSQL is healthy: `docker compose ps`
- Check database port: `telnet localhost 5433`

## 🔄 Backup & Maintenance

### Backup Database
```bash
docker exec listmonk_db pg_dump -U listmonk_user listmonk_db > backup.sql
```

### Update Listmonk
```bash
cd /opt/listmonk
docker compose pull
docker compose up -d
```

## 📈 Next Steps

1. **Import your CSV data** (18k subscribers ready)
2. **Set up email templates** for Heavenletters
3. **Configure campaigns** for different languages
4. **Set up automation** for daily newsletters
5. **Monitor performance** and scale as needed

## 🎯 Why This Setup?

- ✅ **Zero conflicts** with your Mailu server
- ✅ **Production ready** for 18k+ subscribers
- ✅ **Easy maintenance** with Docker
- ✅ **Secure by default** with local access
- ✅ **Scalable** for future growth

Ready to launch your Heavenletters campaigns! 🚀