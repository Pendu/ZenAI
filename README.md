# ZenAI - Mindful Parenting Website

A beautiful, modern website for ZenAI (zen-ai.eu) featuring:
- 🎯 **Parenting Guide Bundle** - Showcase and sell your comprehensive parenting guide
- 📞 **Consultation Booking** - Allow parents to book 1:1 video sessions
- 📧 **Newsletter Signup** - Build your email list with a beautiful signup form
- 📱 **Fully Responsive** - Looks great on all devices
- 🚀 **CI/CD Pipeline** - Automatic deployment via GitHub Actions + Netlify

## 🔄 CI/CD Setup (GitHub Actions + Netlify)

### Step 1: Create Netlify Site
1. Go to [netlify.com](https://netlify.com) and log in
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect to GitHub and select the `Pendu/ZenAI` repository
4. Deploy settings will auto-detect from `netlify.toml`
5. Click **Deploy site**

### Step 2: Get Netlify Credentials
1. Go to your Netlify site dashboard
2. **Site ID**: Go to **Site settings** → Copy the "Site ID" (looks like `abc123-def456-...`)
3. **Auth Token**: Go to [User settings > Applications](https://app.netlify.com/user/applications) → **New access token** → Copy it

### Step 3: Add GitHub Secrets
1. Go to your repo: `github.com/Pendu/ZenAI/settings/secrets/actions`
2. Click **"New repository secret"** and add:
   - `NETLIFY_SITE_ID` = Your Site ID
   - `NETLIFY_AUTH_TOKEN` = Your Access Token

### Step 4: Connect Custom Domain
1. In Netlify: **Domain settings** → **Add custom domain**
2. Enter `zen-ai.eu`
3. Follow DNS configuration instructions

Now every push to `main` automatically deploys to production! 🎉

---

## 🚀 Quick Start

### Option 1: Open Directly
Simply double-click `index.html` to open in your browser.

### Option 2: Local Server (Recommended)
For best results, run a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have it)
npx serve

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## 📁 Project Structure

```
ZenAI/
├── index.html      # Main HTML file
├── styles.css      # All styles (CSS custom properties, responsive)
├── script.js       # JavaScript (navigation, animations, forms)
└── README.md       # This file
```

## 🎨 Design Features

- **Color Palette**: Warm sage greens and sand/gold accents for a calming feel
- **Typography**: Cormorant Garamond (display) + Outfit (body) for elegance
- **Animations**: Smooth scroll-triggered animations and micro-interactions
- **Accessibility**: Semantic HTML, proper contrast ratios, keyboard navigation

## 🔧 Customization

### Colors
Edit CSS custom properties in `styles.css`:
```css
:root {
    --color-primary: #4A5D4E;    /* Main green */
    --color-accent: #C4A77D;     /* Gold accent */
    /* ... */
}
```

### Content
- Update text in `index.html`
- Replace placeholder prices and session details
- Add your own images (replace the placeholder in About section)

### Integrations Needed

1. **Payment Processing**
   - Add Stripe or PayPal for bundle purchases
   - Replace the bundle "Get Now" button link

2. **Booking System**
   - Integrate Calendly, Cal.com, or Acuity
   - Update the booking button in consultation section

3. **Email Marketing**
   - Connect to Mailchimp, ConvertKit, or similar
   - Update newsletter form submission in `script.js`

## 🌐 Deployment

### For zen-ai.eu

1. **Static Hosting** (Recommended for simple sites):
   - Netlify, Vercel, or GitHub Pages
   - Simply upload all files

2. **Traditional Hosting**:
   - Upload via FTP to your web host
   - Point domain to the folder

### Domain Setup
Ensure your domain registrar points to your hosting provider's nameservers.

## 📝 License

© 2025 ZenAI. All rights reserved.

