# Deployment Guide

## 1. Create a GitHub Repository
1. Go to [GitHub.com](https://github.com) and sign in.
2. Click the **+** icon in the top right and select **New repository**.
3. Name your repository (e.g., `bmgi-live` or `saran-web-page`).
4. Keep it **Public**.
5. Do **not** check "Initialize this repository with a README" (we already have one).
6. Click **Create repository**.

## 2. Push Your Code
Copy the commands from the section **"…or push an existing repository from the command line"** on the GitHub page. They will look like this:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
git branch -M main
git push -u origin main
```

Run these commands in your terminal (I can run them for you if you paste the first one here!).

## 3. Activate GitHub Pages (to go live)
1. Go to your repository **Settings** tab.
2. Click on **Pages** in the left sidebar.
3. Under **Build and deployment** -> **Source**, select **Deploy from a branch**.
4. Under **Branch**, select `main` (or `master`) and `/ (root)`.
5. Click **Save**.

Wait a minute or two, and GitHub will give you a link like `https://your-username.github.io/your-repository-name/`. **This is your live website!**

## 4. Final Polish
Once your site is live:
1. Update the `index.html`, `sitemap.xml`, and `robots.txt` files with your **actual** live URL instead of the placeholders I added.
2. Submit your `sitemap.xml` URL to [Google Search Console](https://search.google.com/search-console) to get indexed faster.
