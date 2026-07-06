# Deploy Guide - putting the site online and pushing updates

This site is hosted on **Vercel** and its code lives on **GitHub**. Once set up (a 15-minute, one-time job), the workflow is: **edit a file → save → the site updates itself in about 30 seconds.** No one has to "upload" anything.

Think of it like this:
- **GitHub** = the shared cupboard where the website's files live, with a full history of every change (so you can always undo).
- **Vercel** = the shop window. It watches the cupboard, and whenever the files change, it rebuilds the live site automatically.

---

## PART A - One-time setup (do this once)

### Step 1. Create the accounts
1. Go to **github.com** and create a free account (use the studio/agency email).
2. Go to **vercel.com**, click **Sign Up**, and choose **Continue with GitHub**. This links the two automatically.

### Step 2. Put the code on GitHub
Easiest, no-command way:
1. On github.com, click the **+** (top right) → **New repository**.
2. Name it `sivaprasadnn-website`. Leave it **Public** or **Private** (either is fine). Click **Create repository**.
3. On the next page click **"uploading an existing file"**.
4. Open the `website` folder on your computer, select **everything inside it** (all the `.html` files, the `css`, `js`, `assets` folders, etc.), and drag them into the browser.
5. Scroll down, click **Commit changes**.

> Tip: if you prefer, install **GitHub Desktop** (desktop.github.com) - it gives you buttons instead of commands and makes future edits even easier.

### Step 3. Connect Vercel to it
1. On vercel.com, click **Add New… → Project**.
2. Find `sivaprasadnn-website` in the list and click **Import**.
3. Framework preset: **Other** (it is a plain static site, no settings needed).
4. Click **Deploy**. Wait about a minute.
5. Vercel gives you a live link like `sivaprasadnn-website.vercel.app`. The site is live.

### Step 4. Point the real domain (sivaprasadnn.com) at it
1. In the Vercel project, go to **Settings → Domains**.
2. Type `sivaprasadnn.com`, click **Add**, and follow the on-screen instructions (Vercel tells you the two DNS records to add at the domain registrar). Once done, the real domain shows the site, with free HTTPS.

---

## PART B - The everyday workflow (making updates)

After setup, updating the site is this simple:

### Option 1 - Edit right on GitHub (no software needed)
1. Go to the repository on github.com.
2. Click into the file you want to change (e.g. `js/data.js`).
3. Click the **pencil (Edit)** icon.
4. Make your change, scroll down, click **Commit changes**.
5. Vercel notices and **auto-publishes in ~30 seconds.** Refresh the live site.

### Option 2 - Edit on your computer with GitHub Desktop (best for bigger edits)
1. Open **GitHub Desktop**, it shows the project.
2. Edit files in the `website` folder as normal (see `EDITING-GUIDE.md`), save them.
3. In GitHub Desktop, type a short note (e.g. "Added new concert video"), click **Commit to main**, then **Push origin**.
4. Vercel auto-publishes. Done.

That is the whole loop. Edit → commit → it is live.

---

## Undo / rollback (nothing can break permanently)

- Every change is saved in GitHub history. To undo, open the repo → **Commits** → find the good version → revert.
- In Vercel → **Deployments**, you can click any previous version and **Promote to Production** to instantly roll the live site back.

---

## Preview before it goes live (optional, recommended)

If the team wants to check a change before the public sees it, work in a **branch**:
- In GitHub Desktop click **Current Branch → New Branch**, name it `draft`.
- Push changes to `draft`. Vercel builds a **separate private preview link** for that branch, without touching the live site.
- When happy, merge `draft` into `main` and it goes live.

---

## Who does what (suggested)

| Task | Who |
|------|-----|
| Small text/photo/video edits | Content team, via Option 1 or 2 |
| New pages, design changes | Developer / MarketinCrew |
| Domain, hosting, DNS | Set once by MarketinCrew, then leave alone |

---

## Quick reference

- Live site (temp): `sivaprasadnn-website.vercel.app`
- Live site (real): `sivaprasadnn.com` (after Step 4)
- Code: `github.com/<account>/sivaprasadnn-website`
- Change something → commit on GitHub → live in ~30 seconds.
