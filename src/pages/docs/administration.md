---
title: Administration
layout: "../../layouts/DocsLayout.astro"
---

# Administration

This guide covers how to manage your Infinity Metrics installation. Choose the section that matches your deployment method.

## CLI Installation Management

If you installed Infinity Metrics using the automated installer, you have access to the `infinity-metrics` CLI tool.

### CLI Tool Overview

The automated installation installs Infinity Metrics to `/opt/infinity-metrics` and adds the `infinity-metrics` command to your system PATH, making it available from anywhere.

### Key Files and Directories

```
/opt/infinity-metrics/
├── Caddyfile                           # Web server configuration
├── logs/
│   ├── caddy.log                       # Web server logs
│   ├── infinity-metrics.log            # Application logs
│   └── updater.log                     # Auto-updater logs
└── storage/
    ├── backups/                        # Daily database backups
    │   └── backup_YYYYMMDD_HHMMSS.db
    └── infinity-metrics-production.db  # Main database
```

### Administrative Commands

#### Available CLI Commands

View all available commands:

```bash
infinity-metrics --help
```

Administrative commands:

```bash
# Change admin password
sudo infinity-metrics change-admin-password

# Force manual update (updates normally run automatically at 3:00 AM)
sudo infinity-metrics update

# Reload configuration and restart services
sudo infinity-metrics reload

# Restore from backup
sudo infinity-metrics restore

# Check version
infinity-metrics version
```


#### View Logs

View real-time logs:

```bash
# Application logs
sudo tail -f /opt/infinity-metrics/logs/infinity-metrics.log

# Web server logs  
sudo tail -f /opt/infinity-metrics/logs/caddy.log

# Auto-updater logs
sudo tail -f /opt/infinity-metrics/logs/updater.log
```

#### Database Management

Access the database:

```bash
sudo sqlite3 /opt/infinity-metrics/storage/infinity-metrics-production.db
```

View automatic backups (created nightly at 3:00 AM):

```bash
ls -la /opt/infinity-metrics/storage/backups/
```

Restore from backup:

```bash
sudo infinity-metrics stop
sudo cp /opt/infinity-metrics/storage/backups/backup_YYYYMMDD_HHMMSS.db /opt/infinity-metrics/storage/infinity-metrics-production.db
sudo infinity-metrics start
```

#### Automatic Maintenance

The system automatically performs the following maintenance tasks every night at 3:00 AM:

- **Updates**: Checks for and installs Infinity Metrics updates
- **Backups**: Creates daily database backups (retained for 30 days)
- **Log rotation**: Archives old log files

## Docker Installation Management

If you deployed Infinity Metrics using Docker, you can manage your installation using standard Docker commands for container operations, log viewing, and database access.

## Server Requirements

Infinity Metrics is designed to run efficiently with minimal server resources. You can get started with very modest specifications.

### Minimum Requirements

- **CPU**: 1 vCPU/Core
- **RAM**: 512MB (sufficient to get started)
- **Storage**: 10GB SSD

### Network Requirements

**Inbound**:

- Ports 80 (HTTP) and 443 (HTTPS) must be open for Let's Encrypt certificate setup, verification, and normal operations

**Outbound**:

- General internet access required for Let's Encrypt certificate renewal and OpenAI API communication

**SSL Certificate**:

- Automatically provisioned during installation with Let's Encrypt (for automated installer) or configured manually
