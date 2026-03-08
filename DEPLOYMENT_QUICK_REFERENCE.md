# GitHub Pages Deployment - Quick Reference

## 🚀 Deploy Command
```bash
npm run deploy
```

## ✅ Pre-Deployment Checklist

### Required Files
- [ ] `public/.nojekyll` - Disables Jekyll
- [ ] `public/404.html` - Handles client-side routing
- [ ] `vite.config.ts` - base: `/chatmate-ai-assistant/`
- [ ] `App.tsx` - basename: `/chatmate-ai-assistant`
- [ ] `package.json` - deploy script with `--dotfiles`

### Verify Configuration

**vite.config.ts**:
```typescript
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/chatmate-ai-assistant/' : '/',
}));
```

**App.tsx**:
```typescript
<BrowserRouter basename="/chatmate-ai-assistant">
```

**package.json**:
```json
{
  "homepage": "https://realvivekrana.github.io/chatmate-ai-assistant",
  "scripts": {
    "deploy": "gh-pages -d dist --dotfiles"
  }
}
```

## 📦 Deployment Steps

### 1. Build
```bash
npm run build
```

### 2. Deploy
```bash
npm run deploy
```

### 3. Verify
```bash
git fetch origin gh-pages
git ls-tree -r --name-only origin/gh-pages | grep nojekyll
```

## 🔍 Verification

### Check Files in gh-pages Branch
```bash
git ls-tree -r --name-only origin/gh-pages
```

Should include:
- ✅ `.nojekyll`
- ✅ `404.html`
- ✅ `index.html`
- ✅ `assets/`

### Check Deployment Status
Visit: https://github.com/realvivekrana/chatmate-ai-assistant/deployments

### Test Live Site
URL: https://realvivekrana.github.io/chatmate-ai-assistant/

## 🐛 Troubleshooting

### Still seeing 404?
1. Wait 2-3 minutes for propagation
2. Clear cache: `Ctrl + Shift + R`
3. Try incognito mode
4. Check GitHub Pages settings

### Assets not loading?
1. Verify `.nojekyll` in gh-pages branch
2. Check base path in vite.config.ts
3. Redeploy with `--dotfiles`

### Routes not working?
1. Verify `404.html` exists
2. Check BrowserRouter basename
3. Verify RedirectHandler component

## 🔧 Manual Deploy (if needed)
```bash
npx gh-pages -d dist --dotfiles
```

## 📊 GitHub Pages Settings

Repository Settings → Pages:
- **Source**: Deploy from a branch
- **Branch**: `gh-pages`
- **Folder**: `/ (root)`

## 🌐 Live URL
https://realvivekrana.github.io/chatmate-ai-assistant/

## ⚡ Quick Commands

```bash
# Full deployment
npm run build && npm run deploy

# Check gh-pages branch
git fetch origin gh-pages && git ls-tree -r --name-only origin/gh-pages

# Verify .nojekyll
git ls-tree -r --name-only origin/gh-pages | grep nojekyll

# Local preview
npm run build && npm run preview
```

## 📝 Important Notes

1. **Always use `--dotfiles`** flag to include `.nojekyll`
2. **Wait 2-3 minutes** after deployment for changes to propagate
3. **Clear browser cache** to see latest changes
4. **Check deployment status** in GitHub repository
5. **Verify all files** are in gh-pages branch

## 🎯 Success Indicators

- ✅ Build completes without errors
- ✅ Deploy shows "Published" message
- ✅ `.nojekyll` in gh-pages branch
- ✅ `404.html` in gh-pages branch
- ✅ All assets in gh-pages branch
- ✅ Site loads at live URL
- ✅ Routes work correctly
- ✅ Page refresh doesn't show 404
- ✅ All features functional

---

**Last Updated**: March 8, 2026
**Repository**: https://github.com/realvivekrana/chatmate-ai-assistant
**Live Site**: https://realvivekrana.github.io/chatmate-ai-assistant/
