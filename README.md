# 📝 Supabase Todo App (React)

En moderne todo-app bygget med React, Vite og Supabase.

## ✨ Features

- ✅ Legg til, fullfør og slett oppgaver
- 🔄 Realtime oppdateringer (synkroniserer automatisk)
- 💾 Lagret i Supabase PostgreSQL database
- ⚛️ Bygget med React og Vite
- 🎨 Responsivt og moderne design

## 🚀 Kom i gang

### 1. Sett opp Supabase

1. Gå til [supabase.com](https://supabase.com) og opprett en gratis konto
2. Opprett et nytt prosjekt
3. Gå til SQL Editor og kjør følgende SQL:

```sql
create table public.todos (
  id bigint generated always as identity not null,
  title text not null,
  completed boolean null default false,
  created_at timestamp with time zone null default now(),
  constraint todos_pkey primary key (id)
);

-- Aktiver Row Level Security
alter table public.todos enable row level security;

-- Tillat alle operasjoner (for testing)
create policy "Enable all access for todos"
on public.todos
for all
using (true)
with check (true);
```

4. Gå til Project Settings → API
5. Kopier **Project URL** og **anon/public key**

### 2. Konfigurer appen

Åpne `src/supabaseClient.js` og lim inn dine Supabase credentials:

```javascript
const supabaseUrl = 'https://XXXXXXXX.supabase.co'  // <-- Din URL her
const supabaseAnonKey = 'eyXXXXXXXXXXXXXXXX'       // <-- Din anon key her
```

### 3. Installer og kjør lokalt

```bash
# Installer avhengigheter
npm install

# Start dev server
npm run dev

# Åpne http://localhost:5173 i nettleseren
```

### 4. Bygg for produksjon

```bash
# Bygg appen
npm run build

# Forhåndsvis bygget
npm run preview
```

## 📦 Deploy til GitHub Pages

### Steg 1: Opprett GitHub Repository

```bash
# Initialiser git
git init

# Legg til alle filer
git add .

# Commit
git commit -m "Initial commit: React Supabase Todo App"

# Opprett repository på GitHub (via nettsiden)
# Gå til github.com → New repository → Opprett

# Koble til remote repository
git remote add origin https://github.com/DITT-BRUKERNAVN/supabase-todo-react.git

# Push koden
git branch -M main
git push -u origin main
```

### Steg 2: Deploy med GitHub Actions

Opprett `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

### Steg 3: Aktiver GitHub Pages

1. Gå til repository settings
2. Velg "Pages" i venstre meny
3. Under "Source", velg "GitHub Actions"
4. Push koden - deployment starter automatisk!

Siden vil være tilgjengelig på: `https://ditt-brukernavn.github.io/supabase-todo-react/`

## 🔧 Prosjektstruktur

```
supabase-todo-react/
├── src/
│   ├── App.jsx              # Hovedkomponent
│   ├── App.css              # App styling
│   ├── main.jsx             # Entry point
│   ├── index.css            # Global styling
│   └── supabaseClient.js    # Supabase config
├── index.html               # HTML template
├── vite.config.js           # Vite config
├── package.json             # Dependencies
└── README.md                # Dokumentasjon
```

## 🛠️ Teknologi

- **React** 18.2 - UI framework
- **Vite** 5.0 - Build tool
- **Supabase** - Backend og database
- **CSS3** - Styling

## 🔐 Sikkerhet

⚠️ **Viktig:** Denne appen bruker en enkel RLS-policy som tillater all tilgang. For produksjon bør du:

1. Implementere autentisering
2. Oppdatere RLS-policies
3. Legg til en `user_id` kolonne

## 📝 Lisens

MIT License - bruk fritt!

---

Laget med ❤️ og React
