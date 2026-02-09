# 🚀 Deployment Guide

Steg-for-steg guide for å deploye React Todo-appen til GitHub Pages.

## 📋 Forutsetninger

- GitHub konto
- Git installert på din maskin
- Node.js og npm installert

## 🔧 Del 1: Konfigurer Supabase

### 1. Hent Supabase Credentials

1. Logg inn på [supabase.com](https://supabase.com)
2. Åpne prosjektet ditt
3. Gå til **Settings** → **API**
4. Kopier:
   - **Project URL** (f.eks. `https://abc123.supabase.co`)
   - **anon public key** (starter med `eyJ...`)

### 2. Oppdater Koden

Åpne `src/supabaseClient.js` og lim inn credentials:

```javascript
const supabaseUrl = 'https://abc123.supabase.co'  // <-- Din URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'  // <-- Din key
```

**Lagre filen!**

## 🐙 Del 2: Opprett GitHub Repository

### Metode A: Via GitHub Nettsiden (Enklest)

1. Gå til [github.com](https://github.com)
2. Klikk på **"+"** → **"New repository"**
3. Fyll ut:
   - **Repository name**: `supabase-todo-react`
   - **Description**: "Todo app med React og Supabase"
   - **Public** (velg dette)
   - **IKKE** huk av "Initialize with README"
4. Klikk **"Create repository"**

### Metode B: Via GitHub CLI (hvis installert)

```bash
gh repo create supabase-todo-react --public --source=. --remote=origin
```

## 💻 Del 3: Push Koden til GitHub

Åpne terminal/kommandolinje i prosjektmappen og kjør:

```bash
# 1. Initialiser git repository (hvis ikke gjort)
git init

# 2. Legg til alle filer
git add .

# 3. Lag første commit
git commit -m "Initial commit: React Supabase Todo App"

# 4. Koble til GitHub repository (bruk URLen fra steg 2)
git remote add origin https://github.com/DITT-BRUKERNAVN/supabase-todo-react.git

# 5. Endre branch navn til main
git branch -M main

# 6. Push koden
git push -u origin main
```

**Erstatt `DITT-BRUKERNAVN`** med ditt GitHub brukernavn!

## 🌐 Del 4: Aktiver GitHub Pages

### Oppsett via GitHub Nettsiden

1. Gå til ditt repository på GitHub
2. Klikk på **"Settings"** (øverst til høyre)
3. I venstre meny, klikk på **"Pages"**
4. Under **"Build and deployment"**:
   - **Source**: Velg "GitHub Actions"
5. Klikk **"Save"**

### Opprett Deployment Workflow

1. I prosjektmappen, opprett denne mappestrukturen:
```bash
mkdir -p .github/workflows
```

2. Opprett filen `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

3. Lagre filen og push til GitHub:

```bash
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Pages deployment workflow"
git push
```

## ✅ Del 5: Verifiser Deployment

1. Gå til ditt repository på GitHub
2. Klikk på **"Actions"** tab
3. Du skal se en workflow som kjører
4. Vent til den er ferdig (grønn hake ✅)
5. Gå til **Settings** → **Pages**
6. Du skal se URLen til din app: `https://ditt-brukernavn.github.io/supabase-todo-react/`

## 🎉 Ferdig!

Din app er nå live! Åpne URLen i nettleseren og test appen.

## 🔄 Oppdatere Appen

Når du gjør endringer i fremtiden:

```bash
# 1. Gjør endringer i koden
# 2. Commit endringene
git add .
git commit -m "Beskrivelse av endringer"

# 3. Push til GitHub
git push

# 4. GitHub Actions vil automatisk deploye oppdateringen!
```

## ❗ Feilsøking

### Appen bygger ikke

- Sjekk at du har kjørt `npm install` lokalt
- Verifiser at `vite.config.js` har riktig `base` path

### Siden viser blank side

- Sjekk at `base` i `vite.config.js` matcher repository navnet
- Åpne browser console (F12) for å se feilmeldinger

### Kan ikke koble til Supabase

- Dobbeltsjekk at credentials i `src/supabaseClient.js` er riktige
- Verifiser at RLS policies er satt opp i Supabase

### 404 Error

- Sjekk at `base` i `vite.config.js` er: `/supabase-todo-react/`
- Verifiser at GitHub Pages er aktivert i Settings

## 📞 Trenger Hjelp?

- Sjekk [GitHub Pages dokumentasjon](https://docs.github.com/en/pages)
- Sjekk [Supabase dokumentasjon](https://supabase.com/docs)
- Se på GitHub Actions logs for feilmeldinger
