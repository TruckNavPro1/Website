# TruckNavPro Landing Page - Deployment Guide 🚀

This guide will walk you through deploying your TruckNavPro landing page to various hosting platforms.

## Table of Contents
1. [GitHub Pages Deployment](#github-pages-free)
2. [Vercel Deployment](#vercel-free)
3. [Netlify Deployment](#netlify-free)
4. [Traditional Web Hosting](#traditional-web-hosting)
5. [Self-Hosted Server](#self-hosted-server)
6. [Domain Configuration](#domain-configuration)
7. [SSL/HTTPS Setup](#ssl-setup)
8. [Performance Optimization](#performance-optimization)

---

## GitHub Pages (Free)

Perfect for getting started quickly with free hosting.

### Step-by-Step

1. **Create GitHub Account**
   - Go to [github.com](https://github.com)
   - Sign up for a free account

2. **Create New Repository**
   ```bash
   # Option A: Using GitHub Website
   - Click "New Repository"
   - Name: "trucknavpro-landing"
   - Make it Public
   - Don't initialize with README
   - Click "Create Repository"
   ```

3. **Upload Files**
   ```bash
   # Navigate to your project folder
   cd "/Users/mr.healthynwealthy/untitled folder 2"
   
   # Initialize Git
   git init
   
   # Add all files
   git add .
   
   # Commit
   git commit -m "Initial commit - TruckNavPro landing page"
   
   # Connect to GitHub (replace YOUR_USERNAME)
   git remote add origin https://github.com/YOUR_USERNAME/trucknavpro-landing.git
   
   # Push to GitHub
   git branch -M main
   git push -u origin main
   ```

4. **Enable GitHub Pages**
   - Go to repository Settings
   - Click "Pages" in left sidebar
   - Source: Deploy from branch
   - Branch: main
   - Folder: / (root)
   - Click Save

5. **Access Your Site**
   - Wait 2-3 minutes
   - Visit: `https://YOUR_USERNAME.github.io/trucknavpro-landing`

### Custom Domain with GitHub Pages

1. In repository settings → Pages
2. Add your custom domain (e.g., `www.trucknavpro.com`)
3. Update DNS records with your domain provider:
   ```
   Type: CNAME
   Name: www
   Value: YOUR_USERNAME.github.io
   ```

---

## Vercel (Free)

Fastest deployment with automatic HTTPS and global CDN.

### Step-by-Step

1. **Install Vercel CLI**
   ```bash
   # Install Node.js first from nodejs.org if you don't have it
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   # Navigate to project
   cd "/Users/mr.healthynwealthy/untitled folder 2"
   
   # Login to Vercel
   vercel login
   
   # Deploy
   vercel
   
   # Follow prompts:
   # - Setup new project? Yes
   # - Project name: trucknavpro
   # - Directory: ./
   # - Override settings? No
   ```

3. **Production Deployment**
   ```bash
   vercel --prod
   ```

4. **Access Your Site**
   - You'll get a URL like: `https://trucknavpro.vercel.app`
   - Custom domains available in Vercel dashboard

### Custom Domain on Vercel

1. Go to Vercel dashboard
2. Select your project
3. Settings → Domains
4. Add your domain
5. Update DNS as instructed

---

## Netlify (Free)

Drag-and-drop deployment with excellent performance.

### Method 1: Drag & Drop (Easiest)

1. Go to [netlify.com/drop](https://netlify.com/drop)
2. Drag your entire project folder
3. Get instant deployment!
4. Claim site to your account for custom domain

### Method 2: Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy**
   ```bash
   cd "/Users/mr.healthynwealthy/untitled folder 2"
   
   # Login
   netlify login
   
   # Deploy
   netlify deploy
   
   # Choose: Create & configure new site
   # Directory: ./ (current directory)
   
   # Production deploy
   netlify deploy --prod
   ```

3. **Custom Domain**
   - Go to Netlify dashboard
   - Site settings → Domain management
   - Add custom domain
   - Follow DNS instructions

---

## Traditional Web Hosting

For cPanel, Bluehost, GoDaddy, HostGator, etc.

### Step-by-Step

1. **Access Your Hosting**
   - Login to cPanel or hosting control panel
   - Or use FTP client (FileZilla, Cyberduck)

2. **Upload Files**
   
   **Via File Manager (cPanel):**
   - Open File Manager
   - Navigate to `public_html` folder
   - Upload all files from your project
   - Extract if you uploaded a ZIP

   **Via FTP:**
   ```
   FTP Host: ftp.yourdomain.com
   Username: Your hosting username
   Password: Your hosting password
   Port: 21
   
   Upload all files to /public_html/
   ```

3. **Set Permissions**
   - Files: 644
   - Folders: 755

4. **Access Your Site**
   - Visit your domain: `https://yourdomain.com`

---

## Self-Hosted Server

For VPS, dedicated servers, or local servers.

### Nginx Setup

1. **Install Nginx**
   ```bash
   # Ubuntu/Debian
   sudo apt update
   sudo apt install nginx
   ```

2. **Configure Site**
   ```bash
   # Create config file
   sudo nano /etc/nginx/sites-available/trucknavpro
   ```

   Add this configuration:
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com www.yourdomain.com;
       root /var/www/trucknavpro;
       index index.html;
       
       location / {
           try_files $uri $uri/ =404;
       }
       
       # Caching for static assets
       location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|webp)$ {
           expires 1y;
           add_header Cache-Control "public, immutable";
       }
   }
   ```

3. **Upload Files**
   ```bash
   # Create directory
   sudo mkdir -p /var/www/trucknavpro
   
   # Upload files via SCP
   scp -r * user@yourserver:/var/www/trucknavpro/
   
   # Set permissions
   sudo chown -R www-data:www-data /var/www/trucknavpro
   sudo chmod -R 755 /var/www/trucknavpro
   ```

4. **Enable Site**
   ```bash
   sudo ln -s /etc/nginx/sites-available/trucknavpro /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

### Apache Setup

1. **Install Apache**
   ```bash
   sudo apt install apache2
   ```

2. **Create Virtual Host**
   ```bash
   sudo nano /etc/apache2/sites-available/trucknavpro.conf
   ```

   Add:
   ```apache
   <VirtualHost *:80>
       ServerName yourdomain.com
       ServerAlias www.yourdomain.com
       DocumentRoot /var/www/trucknavpro
       
       <Directory /var/www/trucknavpro>
           Options -Indexes +FollowSymLinks
           AllowOverride All
           Require all granted
       </Directory>
       
       ErrorLog ${APACHE_LOG_DIR}/trucknavpro_error.log
       CustomLog ${APACHE_LOG_DIR}/trucknavpro_access.log combined
   </VirtualHost>
   ```

3. **Enable Site**
   ```bash
   sudo a2ensite trucknavpro
   sudo systemctl reload apache2
   ```

---

## Domain Configuration

### DNS Records Setup

Configure these DNS records with your domain registrar:

```
Type: A
Name: @
Value: YOUR_SERVER_IP
TTL: 3600

Type: A
Name: www
Value: YOUR_SERVER_IP
TTL: 3600
```

For platforms (GitHub Pages, Vercel, Netlify), use CNAME:
```
Type: CNAME
Name: www
Value: your-site.platform.app
TTL: 3600
```

---

## SSL Setup

### Free SSL with Let's Encrypt

**For Nginx/Apache:**
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate (Nginx)
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Get certificate (Apache)
sudo certbot --apache -d yourdomain.com -d www.yourdomain.com

# Auto-renewal (already set up)
sudo certbot renew --dry-run
```

**For Platforms:**
- GitHub Pages: Automatic HTTPS
- Vercel: Automatic HTTPS
- Netlify: Automatic HTTPS

---

## Performance Optimization

### 1. Enable Gzip Compression

**Nginx:**
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml;
gzip_min_length 1000;
```

**Apache (.htaccess):**
```apache
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/css text/javascript application/javascript
</IfModule>
```

### 2. Browser Caching

Add to `.htaccess` (Apache):
```apache
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

### 3. Image Optimization

```bash
# Install imagemagick
brew install imagemagick  # Mac
sudo apt install imagemagick  # Linux

# Optimize images
mogrify -strip -quality 85 images/*.png
mogrify -strip -quality 85 images/*.jpg
```

### 4. Minify CSS/JS

```bash
# Install minifiers
npm install -g clean-css-cli uglify-js

# Minify CSS
cleancss -o styles.min.css styles.css

# Minify JS
uglifyjs script.js -o script.min.js

# Update HTML to use minified versions
```

---

## Testing Your Deployment

### Pre-Launch Checklist

- [ ] All images load correctly
- [ ] All links work (especially App Store link)
- [ ] Social media links are correct
- [ ] Mobile responsive on all devices
- [ ] HTTPS is enabled
- [ ] Page loads in under 3 seconds
- [ ] Forms work (if any)
- [ ] Video plays correctly
- [ ] No console errors
- [ ] SEO meta tags present

### Testing Tools

- **Speed**: [PageSpeed Insights](https://pagespeed.web.dev)
- **Mobile**: [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- **SSL**: [SSL Labs](https://www.ssllabs.com/ssltest/)
- **SEO**: [SEO Site Checkup](https://seositecheckup.com)

---

## Troubleshooting

### Common Issues

**404 Errors:**
- Check file names are correct (case-sensitive on Linux)
- Verify files uploaded to correct directory
- Check server configuration

**Images Not Loading:**
- Verify file paths are relative, not absolute
- Check file permissions (644 for files)
- Verify images uploaded correctly

**Slow Loading:**
- Enable gzip compression
- Optimize images
- Enable browser caching
- Use a CDN (Cloudflare free tier)

**SSL Issues:**
- Ensure certificate is valid
- Check for mixed content (http/https)
- Verify domain matches certificate

---

## Next Steps After Deployment

1. **Submit to Google Search Console**
   - Verify ownership
   - Submit sitemap
   
2. **Add Analytics**
   - Google Analytics
   - Facebook Pixel
   
3. **Monitor Performance**
   - Uptime monitoring (UptimeRobot)
   - Speed monitoring
   
4. **Create Marketing Campaign**
   - Share landing page URL
   - Run ads to landing page
   - Track conversions

---

## Support

For deployment issues:
- Check server logs
- Review error messages
- Verify DNS propagation (can take 24-48 hours)
- Test in incognito mode

**Your landing page is production-ready! Deploy and start driving traffic! 🚀**
