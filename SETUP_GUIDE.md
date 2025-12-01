# ZenAI Setup Guide - Complete Integration Instructions

This guide walks you through setting up all the integrations for your website.

---

## 📅 Step 1: Calendly Setup (Consultation Booking)

Calendly is the easiest way to let clients book consultations with you.

### Create Your Account
1. Go to [calendly.com](https://calendly.com) and sign up (free plan works!)
2. Complete your profile setup

### Create Event Types
Create three event types matching your offerings:

| Event Name | Duration | Price | Suggested Slug |
|------------|----------|-------|----------------|
| Discovery Call | 30 min | Free | `discovery-call` |
| Deep Dive Session | 60 min | €79 | `deep-dive-session` |
| Transformation Package | 60 min | €199 | `transformation-package` |

**For each event:**
1. Go to **Event Types** → **Create**
2. Set the name, duration, and description
3. Under **Booking Page Options**, customize the slug
4. Enable Zoom integration under **Location**

### Add to Website
1. Copy your Calendly username (e.g., `your-name`)
2. Open `script.js` and find the `calendlyUrls` section (around line 85)
3. Replace `YOUR_USERNAME` with your actual username:

```javascript
const calendlyUrls = {
    discovery: 'https://calendly.com/your-name/discovery-call',
    standard: 'https://calendly.com/your-name/deep-dive-session',
    package: 'https://calendly.com/your-name/transformation-package'
};
```

### Payment for Paid Sessions
For the €79 and €199 sessions, you have two options:

**Option A: Calendly Native Payments** (Requires Calendly Pro)
- Connect Stripe in Calendly settings
- Add pricing to each event type

**Option B: Collect Payment Separately**
- Keep Calendly free
- Send payment link after booking confirmation

---

## 💳 Step 2: Stripe Setup (Bundle Payments)

Stripe Payment Links are the easiest way to accept payments — no coding required!

### Create Stripe Account
1. Go to [stripe.com](https://stripe.com) and create an account
2. Complete identity verification (required for payouts)

### Create Payment Link
1. Go to [Payment Links](https://dashboard.stripe.com/payment-links) in your dashboard
2. Click **+ New** button
3. Configure your product:

```
Product name: ZenAI Parenting Bundle
Description: Complete guide + workbook + bonus materials
Price: €97.00 (one-time)
```

4. Under **After payment**, set:
   - Confirmation page: Custom message or redirect to thank-you page
   - Enable receipt emails

5. Click **Create link**
6. Copy the link (looks like `https://buy.stripe.com/abc123...`)

### Add to Website
1. Open `script.js`
2. Find the `STRIPE_PAYMENT_LINK` line (around line 110)
3. Replace with your link:

```javascript
const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/your-actual-link';
```

### Test Mode
Before going live:
1. Create a payment link in **Test mode** (toggle in Stripe dashboard)
2. Use test card: `4242 4242 4242 4242` with any future date and CVC

---

## 📧 Step 3: Newsletter Setup (Email Collection)

### Option A: Formspree (Simplest)

1. Go to [formspree.io](https://formspree.io) and create free account
2. Click **+ New Form**
3. Name it "ZenAI Newsletter"
4. Copy your form ID (looks like `xyzabc123`)
5. Open `index.html`, find the newsletter form
6. Replace `YOUR_FORMSPREE_ID`:

```html
<form action="https://formspree.io/f/xyzabc123" method="POST">
```

Emails will be sent to your Formspree inbox and forwarded to your email.

### Option B: ConvertKit (Better for Email Marketing)

If you want to send actual newsletters:

1. Create account at [convertkit.com](https://convertkit.com) (free up to 1,000 subscribers)
2. Create a new Form → Inline form
3. Copy the form action URL
4. Replace in `index.html`:

```html
<form action="https://app.convertkit.com/forms/YOUR_FORM_ID/subscriptions" method="POST">
```

### Option C: Mailchimp

1. Create account at [mailchimp.com](https://mailchimp.com)
2. Create Audience → Signup Forms → Embedded Form
3. Copy the form action URL
4. Update `index.html` form action

---

## 🚀 Step 4: Deploy Your Website

### Option A: Netlify (Recommended)

1. Create account at [netlify.com](https://netlify.com)
2. Drag & drop your ZenAI folder to deploy
3. Get your temporary URL (e.g., `zen-ai-abc123.netlify.app`)
4. Go to **Domain settings** → **Add custom domain**
5. Enter `zen-ai.eu`
6. Follow DNS configuration instructions

### Option B: Vercel

1. Create account at [vercel.com](https://vercel.com)
2. Install Vercel CLI: `npm i -g vercel`
3. Run `vercel` in your project folder
4. Add custom domain in dashboard

### Option C: Traditional Hosting

1. Get your hosting FTP credentials
2. Upload all files (index.html, styles.css, script.js, favicon.svg)
3. Point your domain to the hosting

---

## 🔗 Domain Configuration (zen-ai.eu)

### If using Netlify/Vercel:
They'll provide you with nameservers or DNS records to add.

### If using other hosting:
Update your domain's DNS records:

```
Type    Name    Value
A       @       [Your hosting IP]
CNAME   www     [Your hosting domain]
```

---

## ✅ Pre-Launch Checklist

- [ ] Calendly events created and URLs updated in `script.js`
- [ ] Stripe payment link created and added to `script.js`  
- [ ] Newsletter form connected to Formspree/ConvertKit
- [ ] Test booking flow on Calendly
- [ ] Test payment flow with Stripe test mode
- [ ] Test newsletter signup
- [ ] About section photo added (replace placeholder)
- [ ] All links working
- [ ] Mobile responsive check
- [ ] Deploy to hosting
- [ ] Connect custom domain
- [ ] SSL certificate active (https)

---

## 🆘 Need Help?

### Common Issues

**Calendly popup not working?**
- Check browser console for errors
- Ensure Calendly widget script is loading

**Payment not redirecting?**
- Verify payment link URL is correct
- Check no extra spaces in the URL

**Form submissions not received?**
- Verify Formspree ID is correct
- Check spam folder

---

## 📊 Analytics (Optional)

Add Google Analytics to track visitors:

1. Create account at [analytics.google.com](https://analytics.google.com)
2. Create new property for zen-ai.eu
3. Copy the tracking code
4. Add before `</head>` in `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

Happy launching! 🚀

