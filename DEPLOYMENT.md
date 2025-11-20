# Deployment Guide for CultureGuest

## 📋 Prerequisites
- Node.js installed
- Git installed
- GitHub account
- Vercel account (free tier works)

---

## 🚀 Step 1: Push to Git

### Initialize Git Repository

```bash
# Navigate to project directory
cd /Users/devang/Documents/cultureguest

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: CultureGuest app"

# Add your GitHub repository as remote (replace with your actual repo URL)
# Option 1: If you haven't created the repo on GitHub yet:
#   1. Go to GitHub and create a new repository
#   2. Copy the repository URL
#   3. Run: git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Option 2: If you already have a GitHub repository:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Future Git Commands

```bash
# After making changes:
git add .
git commit -m "Your commit message"
git push
```

---

## 🌐 Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Your Project**
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Vercel will auto-detect it's a Vite project

3. **Configure Build Settings**
   - **Framework Preset:** Vite (auto-detected)
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `dist` (default)
   - **Install Command:** `npm install` (default)

4. **Add Environment Variables**
   - Go to "Environment Variables" section
   - Add: `API_KEY` = `your-gemini-api-key-here`
   - Make sure it's available for "Production", "Preview", and "Development"

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be live at `your-project-name.vercel.app`

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (from project directory)
cd /Users/devang/Documents/cultureguest
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (select your account)
# - Link to existing project? No (first time) or Yes (if updating)
# - Project name? (press enter for default or type custom name)
# - Directory? (press enter for current directory)
# - Override settings? No

# For production deployment:
vercel --prod
```

### Environment Variables in Vercel

After deployment, you can add/update environment variables:

**Via Dashboard:**
- Go to your project → Settings → Environment Variables
- Add `API_KEY` with your Gemini API key value

**Via CLI:**
```bash
vercel env add API_KEY
# Enter your API key when prompted
# Select environments: Production, Preview, Development
```

---

## 🔧 Important Notes

### 1. Environment Variables
- **Local Development:** Create `.env.local` file with `API_KEY=your-key`
- **Vercel:** Add `API_KEY` in Vercel dashboard under Environment Variables
- **Never commit** `.env.local` to Git (already in .gitignore)

### 2. HashRouter Compatibility
Your app uses `HashRouter`, which works perfectly with Vercel's static hosting. No additional configuration needed!

### 3. Build Output
- Vite builds to `dist/` folder (already in .gitignore)
- Vercel automatically detects and serves this

### 4. Custom Domain (Optional)
- Go to Vercel project → Settings → Domains
- Add your custom domain
- Follow DNS configuration instructions

---

## 🐛 Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Ensure `API_KEY` is set in Vercel environment variables
- Check build logs in Vercel dashboard

### API Not Working
- Verify `API_KEY` is correctly set in Vercel
- Check browser console for errors
- Ensure environment variable is available for all environments (Production, Preview, Development)

### Routing Issues
- HashRouter should work automatically
- If you switch to BrowserRouter, you'll need a `vercel.json` with rewrites

---

## 📝 Quick Reference

```bash
# Git workflow
git add .
git commit -m "message"
git push

# Vercel CLI workflow
vercel          # Deploy to preview
vercel --prod   # Deploy to production
vercel env ls   # List environment variables
```

---

## ✅ Post-Deployment Checklist

- [ ] Repository pushed to GitHub
- [ ] Vercel project connected to GitHub repo
- [ ] Environment variable `API_KEY` added in Vercel
- [ ] Build successful in Vercel
- [ ] App accessible at Vercel URL
- [ ] Test all features (especially AI-powered ones)
- [ ] (Optional) Custom domain configured

