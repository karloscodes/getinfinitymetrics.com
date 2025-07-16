---
title: Administration
layout: "../../layouts/DocsLayout.astro"
---

# Administration

## Administrative Operations

Manage your Infinity Metrics installation with the following administrative commands.

### Password Reset

To reset or change the admin password, run the following command with sudo privileges:

```bash
sudo infinity-metrics change-admin-password
```

### Forced Updates

To manually force an update of Infinity Metrics, run the following command with sudo privileges:

```bash
sudo infinity-metrics update
```

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
