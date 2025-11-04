# Closet Domain Website - Setup Guide

This guide will help you set up the backend form submission, Google Analytics, and SEO optimization.

---

## 3. Backend Form Submission Setup

### Option A: Using Node.js Server (Recommended)

#### Step 1: Install Dependencies

```bash
npm install
```

#### Step 2: Configure Email Settings

1. Copy `.env.example` to `.env`:
   ```bash
   copy .env.example .env
   ```

2. Edit `.env` file and add your credentials:

**For Gmail:**
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
BUSINESS_EMAIL=closetdomain@gmail.com
PORT=3000
```

**Getting Gmail App Password:**
1. Go to your Google Account: https://myaccount.google.com/
2. Navigate to Security
3. Enable 2-Step Verification if not already enabled
4. Search for "App passwords"
5. Generate a new app password for "Mail"
6. Copy the 16-character password (no spaces) to EMAIL_PASS

**For Other Email Providers:**
- **Outlook/Hotmail**: Use your regular password or app password
- **Custom SMTP**: Uncomment and configure SMTP settings in `server.js`

#### Step 3: Start the Server

```bash
npm start
```

The server will run on `http://localhost:3000`

#### Step 4: Test the Contact Form

1. Open `http://localhost:3000` in your browser
2. Fill out and submit the contact form
3. Check your email for the submission

### Option B: Using Serverless Functions

If you prefer serverless deployment (Vercel, Netlify, etc.), the form submission logic in `server.js` can be adapted to serverless functions.

### Option C: Using Third-Party Services

**EmailJS (Free tier available):**
1. Sign up at https://www.emailjs.com/
2. Create an email service
3. Replace the fetch call in `script.js` with EmailJS SDK

**Formspree (Free tier available):**
1. Sign up at https://formspree.io/
2. Get your form endpoint
3. Update the form action or fetch URL

**Netlify Forms (If hosting on Netlify):**
1. Add `data-netlify="true"` to your form tag
2. Netlify automatically handles submissions

---

## 4. Google Analytics Setup

### Step 1: Create Google Analytics Account

1. Go to https://analytics.google.com/
2. Click "Start measuring"
3. Create an account and property
4. Choose "Web" platform
5. Add your website URL: `www.closetdomain.com`
6. Copy your **Measurement ID** (format: G-XXXXXXXXXX)

### Step 2: Add Measurement ID to Website

In `index.html` (lines 5 and 10), replace `GA_MEASUREMENT_ID` with your actual ID:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Step 3: Verify Installation

1. Open your website
2. Go to Google Analytics
3. Navigate to Real-time reports
4. You should see your own visit

### Custom Events Being Tracked

Your website automatically tracks:
- **Form submissions** - Triggered when contact form is successfully submitted
- **Page views** - Automatic tracking
- **Engagement time** - How long users stay on the site

### Additional Events You Can Add

Add these to `script.js` for more tracking:

```javascript
// Track button clicks
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', () => {
        gtag('event', 'button_click', {
            'event_category': 'engagement',
            'event_label': btn.textContent
        });
    });
});

// Track service card clicks
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', () => {
        gtag('event', 'service_view', {
            'event_category': 'services',
            'event_label': card.querySelector('h3').textContent
        });
    });
});
```

---

## 5. SEO Optimization

### What's Already Implemented

✅ **Meta Tags**
- Title, description, keywords
- Canonical URL
- Robots directives

✅ **Open Graph Tags** (Facebook, LinkedIn)
- Optimized for social sharing
- Custom images for previews

✅ **Twitter Cards**
- Enhanced Twitter sharing

✅ **Schema.org Structured Data**
- ProfessionalService schema
- Complete business information
- Service catalog

✅ **Technical SEO**
- Sitemap.xml
- Robots.txt
- .htaccess optimizations

### Step 1: Update URLs

Replace `https://www.closetdomain.com` with your actual domain in:
- `index.html` (all meta tags and schema)
- `sitemap.xml`
- `.htaccess`

### Step 2: Add Social Media Images

Create and add these images to optimize social sharing:

1. **Open Graph Image** (1200x630px)
   - Save as: `images/og-image.jpg`
   - Should include your logo and tagline
   - Optimized for Facebook/LinkedIn preview

2. **Twitter Image** (1200x675px)
   - Save as: `images/twitter-image.jpg`
   - Similar to OG image but Twitter aspect ratio

3. **Logo** (500x500px minimum)
   - Save as: `images/logo.png`
   - Transparent background recommended

4. **Favicons**
   - Use a favicon generator: https://realfavicongenerator.net/
   - Upload your logo
   - Download and replace the favicon files

### Step 3: Update Schema.org Data

In `index.html`, update the structured data (lines 47-110):

```json
"telephone": "+351-YOUR-PHONE-NUMBER",
"email": "closetdomain@gmail.com",
"sameAs": [
    "https://www.facebook.com/yourpage",
    "https://www.linkedin.com/company/yourcompany",
    "https://www.instagram.com/yourprofile"
]
```

### Step 4: Submit to Search Engines

**Google Search Console:**
1. Go to https://search.google.com/search-console
2. Add your property
3. Verify ownership (DNS or HTML file)
4. Submit your sitemap: `https://www.closetdomain.com/sitemap.xml`

**Bing Webmaster Tools:**
1. Go to https://www.bing.com/webmasters
2. Add your site
3. Verify ownership
4. Submit sitemap

### Step 5: SEO Best Practices

**Content Optimization:**
- ✅ Already implemented: Semantic HTML5 tags
- ✅ Already implemented: Descriptive headings (H1, H2, H3)
- ✅ Already implemented: Alt text for icons (using emoji, add images later)
- Add more content for target keywords

**Performance:**
- ✅ Already implemented: Compressed assets
- ✅ Already implemented: Browser caching
- Consider image optimization tools
- Consider a CDN for static assets

**Mobile Optimization:**
- ✅ Already implemented: Fully responsive design
- ✅ Already implemented: Mobile-first approach
- Test on multiple devices

### Step 6: Monitor SEO Performance

**Tools to use:**
1. **Google Search Console** - Monitor search performance
2. **Google PageSpeed Insights** - Check site speed
3. **Mobile-Friendly Test** - Verify mobile optimization
4. **Structured Data Testing Tool** - Validate schema

**Key Metrics to Track:**
- Organic traffic (Google Analytics)
- Search impressions and clicks (Search Console)
- Average position for target keywords
- Click-through rate (CTR)
- Bounce rate and engagement

---

## Deployment Checklist

Before going live:

- [ ] Replace all `GA_MEASUREMENT_ID` with actual Google Analytics ID
- [ ] Update all URLs from example to your actual domain
- [ ] Configure email settings in `.env`
- [ ] Add social media images
- [ ] Update phone number and contact details
- [ ] Add actual social media links
- [ ] Test contact form submission
- [ ] Verify Google Analytics is tracking
- [ ] Submit sitemap to Google Search Console
- [ ] Test website on multiple devices
- [ ] Run PageSpeed Insights test
- [ ] Validate structured data

---

## Optional Enhancements

### Add Blog for SEO

Create a blog to regularly publish content:
- Improves SEO with fresh content
- Targets long-tail keywords
- Establishes authority

### Add Testimonials Section

Social proof increases conversions:
- Customer reviews
- Case studies
- Success stories

### Add FAQ Section

Answers common questions:
- Reduces support inquiries
- Targets question-based searches
- Improves user experience

### Implement Live Chat

Real-time customer support:
- Increases engagement
- Captures leads
- Provides immediate assistance

---

## Support & Resources

**Documentation:**
- Google Analytics: https://support.google.com/analytics
- Google Search Console: https://support.google.com/webmasters
- Schema.org: https://schema.org/docs/gs.html

**Testing Tools:**
- PageSpeed Insights: https://pagespeed.web.dev/
- Mobile-Friendly Test: https://search.google.com/test/mobile-friendly
- Rich Results Test: https://search.google.com/test/rich-results

**Email Services:**
- Nodemailer Docs: https://nodemailer.com/
- EmailJS: https://www.emailjs.com/docs/
- Formspree: https://help.formspree.io/

---

Good luck with Closet Domain! 🚀
