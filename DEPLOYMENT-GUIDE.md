# Closet Domain Website - Deployment Guide

## 🎯 Website Overview

This is a **fully static website** (HTML/CSS/JavaScript) with no backend dependencies. This means it's:
- **Free to host** (or very cheap)
- **Extremely fast** (served via CDN)
- **Easy to deploy** (just upload files)
- **Zero maintenance** (no server to manage)

---

## ✅ Files Ready for Deployment

Your website includes:

### Core Files (Required):
- `index.html` - Main website file
- `styles.css` - All styling
- `script.js` - All functionality (language switcher, animations, etc.)

### Images (Required):
- `ClosetDomainLogoSmall.png` - Logo (header & footer)
- `BackgroundImage1.jpg` - Hero section background
- `BackgroundImage2.jpg` - Hero section image
- Any other images in your folder

### SEO Files (Required):
- `robots.txt` - Search engine crawling instructions
- `sitemap.xml` - Site structure for search engines
- `.htaccess` - Apache server configuration (if using Apache hosting)

### Optional Files (Not needed for deployment):
- `.env` - Can be deleted (was for contact form email)
- `.env.example` - Can be deleted
- `server.js` - Can be deleted (no longer needed)
- `package.json` - Can be deleted
- `package-lock.json` - Can be deleted
- `DEPLOYMENT-GUIDE.md` - This file (for your reference)

---

## 🚀 Recommended Hosting Options

### **Option 1: Netlify (RECOMMENDED) ✅**

**Cost:** FREE forever for your use case

**Why Netlify:**
- ✅ Free SSL certificate (HTTPS)
- ✅ Global CDN (fast worldwide)
- ✅ Automatic deployments from Git
- ✅ Custom domain support
- ✅ Instant cache invalidation
- ✅ 100GB bandwidth/month free

**How to Deploy:**

1. **Create Account:**
   - Go to https://www.netlify.com
   - Sign up with GitHub, GitLab, or email

2. **Deploy Website (2 Methods):**

   **Method A: Drag & Drop (Easiest)**
   - Log in to Netlify
   - Click "Add new site" → "Deploy manually"
   - Drag your entire website folder
   - Done! Your site is live

   **Method B: Git Deployment (Recommended for updates)**
   - Create a Git repository (GitHub, GitLab)
   - Push your code to the repository
   - In Netlify: "Add new site" → "Import from Git"
   - Select your repository
   - Click "Deploy site"

3. **Configure Custom Domain:**
   - In Netlify dashboard → "Domain settings"
   - Click "Add custom domain"
   - Enter `closetdomain.com`
   - Follow DNS configuration instructions:
     - Add A record: `75.2.60.5`
     - Add CNAME record: `www` → `YOUR-SITE.netlify.app`
   - SSL will be automatically configured (5-10 minutes)

4. **Important Settings:**
   - Build command: Leave empty
   - Publish directory: `/` (root)

---

### **Option 2: Vercel (Alternative)**

**Cost:** FREE forever for your use case

**Why Vercel:**
- ✅ Same benefits as Netlify
- ✅ Owned by creators of Next.js
- ✅ Excellent performance
- ✅ Great developer experience

**How to Deploy:**

1. Go to https://vercel.com
2. Sign up with GitHub, GitLab, or email
3. Click "Add New" → "Project"
4. Import your Git repository (or drag & drop)
5. Click "Deploy"
6. Configure custom domain in settings

---

### **Option 3: GitHub Pages (Free)**

**Cost:** FREE forever

**Limitations:**
- Must use Git
- No server-side redirects
- Custom domain requires manual DNS setup

**How to Deploy:**

1. Create a GitHub account
2. Create a new repository named `closetdomain.com`
3. Push your code to the repository
4. Go to repository Settings → Pages
5. Source: Deploy from branch `main`
6. Custom domain: Enter `closetdomain.com`
7. Configure DNS at your domain registrar:
   - Add A records:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - Add CNAME: `www` → `YOUR-USERNAME.github.io`

---

### **Option 4: Traditional Web Hosting (Not Recommended)**

**Examples:** Hostinger, Bluehost, SiteGround, Hetzner

**Cost:** €2-10/month

**Only choose this if:**
- You already have a hosting account
- You need email hosting on the same server
- You want cPanel management

**How to Deploy:**
1. Access your cPanel or FTP
2. Upload all files to `public_html` folder
3. Ensure `.htaccess` is uploaded
4. Done!

---

## 📝 Before You Deploy Checklist

### 1. Google Analytics Setup (Lines 4-28 in index.html)

**Get your Google Analytics ID:**
1. Go to https://analytics.google.com
2. Create an account (or sign in)
3. Click "Admin" (bottom left)
4. Click "Create Property"
5. Enter:
   - Property name: Closet Domain
   - Time zone: Portugal
   - Currency: EUR
6. Click "Create"
7. Click "Web" → Enter `closetdomain.com`
8. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

**Update index.html:**
```html
<!-- Find lines 8 and 16, replace G-XXXXXXXXXX with your actual ID -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR-ACTUAL-ID"></script>
<script>
  ...
  gtag("config", "G-YOUR-ACTUAL-ID", {
```

---

### 2. Update Domain URLs

**Find and replace in index.html:**
- Search for: `https://www.closetdomain.com/`
- Replace with: Your actual domain (if different)

**Files to check:**
- `index.html` (lines 94, 104, 129, etc.)
- `sitemap.xml` (all URLs)
- `robots.txt` (line 11)

---

### 3. Social Media Links

**Update footer social links (index.html lines 954-967):**

Currently commented out. When you have social media accounts:

```html
<div class="footer-social">
    <h4>Siga-nos</h4>
    <div class="social-links">
        <a href="https://www.facebook.com/closetdomain" aria-label="Facebook">
            <i class="fab fa-facebook"></i>
        </a>
        <a href="https://www.linkedin.com/company/closetdomain" aria-label="LinkedIn">
            <i class="fab fa-linkedin"></i>
        </a>
        <a href="https://www.instagram.com/closetdomain" aria-label="Instagram">
            <i class="fab fa-instagram"></i>
        </a>
    </div>
</div>
```

---

### 4. Favicon Files

**Create favicon files** (if you haven't already):

1. Go to https://realfavicongenerator.net/
2. Upload your logo (ClosetDomainLogoSmall.png)
3. Generate all favicon files
4. Download and place in your website root folder:
   - `favicon-32x32.png`
   - `favicon-16x16.png`
   - `apple-touch-icon.png`
   - `favicon.ico`

---

### 5. Structured Data (Schema.org)

**Update in index.html (lines 155-223):**

Replace placeholder information:
- Line 162: `"logo": "https://www.closetdomain.com/images/logo.png"`
  → Update to actual logo URL
- Lines 176-179: Update social media URLs when available

---

### 6. Remove Unused Files

**Delete these files before deploying:**
```bash
server.js
package.json
package-lock.json
.env
.env.example
```

These were for the contact form backend which is no longer needed.

---

## 🔍 SEO Configuration

### 1. Google Search Console

**After deployment:**

1. Go to https://search.google.com/search-console
2. Click "Add Property"
3. Enter your domain: `closetdomain.com`
4. Verify ownership (DNS or HTML file)
5. Submit your sitemap: `https://www.closetdomain.com/sitemap.xml`

---

### 2. Meta Tags Checklist

✅ All meta tags are already configured in `index.html`:
- Title & Description (lines 70-80)
- Open Graph for Facebook (lines 103-125)
- Twitter Cards (lines 128-147)
- Structured Data (lines 155-223)

**Just verify:**
- Company name is correct
- Phone number is correct: `+351937358704`
- Email is correct: `closetdomain@gmail.com`
- Location is correct: Listed as "Portugal" (update if more specific)

---

## 🎨 Image Optimization (Optional but Recommended)

### Before deploying, optimize your images:

**Tools:**
- https://tinypng.com (PNG compression)
- https://squoosh.app (All formats)

**Images to optimize:**
- `BackgroundImage1.jpg` (Hero background)
- `BackgroundImage2.jpg` (Hero image)
- `ClosetDomainLogoSmall.png` (Logo)

**Target sizes:**
- Logo: < 50KB
- Background images: < 500KB each
- Keep original quality, just compress

---

## 📊 Performance Checklist

After deployment, test your website:

### 1. Google PageSpeed Insights
- Go to: https://pagespeed.web.dev/
- Enter your domain
- Target: 90+ score on mobile and desktop

### 2. GTmetrix
- Go to: https://gtmetrix.com/
- Enter your domain
- Target: A grade

### 3. Mobile-Friendly Test
- Go to: https://search.google.com/test/mobile-friendly
- Enter your domain
- Ensure "Page is mobile-friendly"

---

## 🔒 Security Checklist

### HTTPS/SSL
✅ Automatic with Netlify/Vercel
✅ Free Let's Encrypt certificate
✅ Auto-renewal

### Security Headers
✅ Already configured in `.htaccess` (if using Apache)
✅ Netlify/Vercel add security headers automatically

### What's Protected:
✅ No server-side vulnerabilities (static site)
✅ No database to hack
✅ No backend code to exploit
✅ No user data stored

---

## 📱 Testing Checklist

Before announcing your website:

### Functionality:
- [ ] All navigation links work
- [ ] Language switcher (PT/EN) works
- [ ] WhatsApp button works (opens WhatsApp with correct number)
- [ ] All sections load correctly
- [ ] Scroll animations work
- [ ] Mobile menu works
- [ ] All images load

### Contact Information:
- [ ] Email link works: closetdomain@gmail.com
- [ ] Phone link works: +351 937 358 704
- [ ] WhatsApp link works with correct number

### SEO:
- [ ] Page title shows correctly in browser tab
- [ ] Open Graph image shows when sharing on Facebook
- [ ] Twitter card shows when sharing on Twitter
- [ ] Google Analytics tracks visits (check Real-Time reports)

### Browsers:
Test on:
- [ ] Chrome (Desktop & Mobile)
- [ ] Firefox
- [ ] Safari (Desktop & Mobile)
- [ ] Edge

---

## 🚀 Deployment Steps (Final Checklist)

### Step 1: Pre-Deployment
- [ ] Update Google Analytics ID
- [ ] Generate and add favicon files
- [ ] Optimize all images
- [ ] Test locally (open index.html in browser)
- [ ] Delete unused files (server.js, package.json, etc.)

### Step 2: Deploy to Hosting
- [ ] Create Netlify/Vercel account
- [ ] Deploy website (drag & drop or Git)
- [ ] Verify site loads on temporary URL

### Step 3: Custom Domain
- [ ] Configure custom domain
- [ ] Update DNS records at your registrar
- [ ] Wait for DNS propagation (5 minutes - 48 hours)
- [ ] Verify HTTPS works

### Step 4: SEO Setup
- [ ] Submit sitemap to Google Search Console
- [ ] Verify Google Analytics tracking
- [ ] Test Open Graph (share on Facebook)
- [ ] Test Twitter Card (share on Twitter)

### Step 5: Performance Testing
- [ ] Run Google PageSpeed Insights
- [ ] Run GTmetrix
- [ ] Test on mobile devices
- [ ] Test all browsers

### Step 6: Go Live!
- [ ] Announce on social media
- [ ] Update Google Business Profile (if you have one)
- [ ] Add to LinkedIn company page
- [ ] Share with network

---

## 💰 Cost Summary

### Recommended Setup (Netlify):
- **Hosting:** €0/month (FREE)
- **SSL Certificate:** €0/month (FREE)
- **CDN:** €0/month (FREE)
- **Custom Domain:** €10-15/year (one-time per year)
- **Google Analytics:** €0/month (FREE)

**Total Monthly Cost:** €0
**Total Annual Cost:** €10-15 (domain only)

---

## 🛠️ Maintenance

### Monthly:
- Check Google Analytics for traffic
- Check Google Search Console for SEO issues
- Update sitemap.xml date if content changes

### As Needed:
- Update content (text, images)
- Add new services
- Update pricing
- Add testimonials (when you have them)

### No Maintenance Required:
✅ Server updates (no server!)
✅ Security patches (no backend!)
✅ Database backups (no database!)
✅ SSL renewal (automatic!)

---

## 📞 Support Resources

### Netlify:
- Docs: https://docs.netlify.com
- Support: https://answers.netlify.com
- Status: https://www.netlifystatus.com

### Google Analytics:
- Help: https://support.google.com/analytics
- Academy: https://analytics.google.com/analytics/academy

### DNS/Domain:
- Check propagation: https://www.whatsmydns.net
- DNS records explained: https://www.cloudflare.com/learning/dns/dns-records/

---

## 🎉 You're Ready!

Your website is:
- ✅ Fully static (no server needed)
- ✅ SEO optimized
- ✅ Mobile responsive
- ✅ Bilingual (PT/EN)
- ✅ Fast loading
- ✅ Secure (HTTPS)
- ✅ Analytics ready

**Next steps:**
1. Choose hosting (Netlify recommended)
2. Complete the deployment checklist
3. Deploy and test
4. Go live and promote!

---

## 📝 Quick Reference

### Your Website Files:
```
website/
├── index.html              (Main file)
├── styles.css              (Styling)
├── script.js               (Functionality)
├── robots.txt              (SEO)
├── sitemap.xml             (SEO)
├── .htaccess               (Apache config - optional)
├── ClosetDomainLogoSmall.png
├── BackgroundImage1.jpg
├── BackgroundImage2.jpg
└── (favicon files)
```

### Your Contact Info:
- **Email:** closetdomain@gmail.com
- **Phone:** +351 937 358 704
- **WhatsApp:** +351 937 358 704
- **Location:** Santarém, Portugal
- **Business:** Closet Domain - Unipessoal Lda

### Your Website Sections:
1. Hero (Transform Your Business Online)
2. Stats (24h response, 100% quality, etc.)
3. Services (Websites, Chatbot, Maintenance)
4. Chatbot Features
5. Use Cases (Perfect For...)
6. About Us
7. Contact Information
8. Footer

---

**Good luck with your launch! 🚀**

If you have questions, consult:
- This guide
- Netlify documentation
- Google Analytics help
- Google Search Console help
