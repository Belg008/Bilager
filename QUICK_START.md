# ⚡ Quick Start Guide

Kom i gang på 5 minutter!

## 📝 Sjekkliste

- [ ] Node.js installert (v18+)
- [ ] Git installert
- [ ] GitHub konto
- [ ] Supabase konto

## 🚀 3 Enkle Steg

### Steg 1: Konfigurer Supabase (2 min)

1. Gå til [supabase.com](https://supabase.com) → Opprett prosjekt
2. SQL Editor → Kjør denne SQL:
```sql
create table public.todos (
  id bigint generated always as identity not null,
  title text not null,
  completed boolean null default false,
  created_at timestamp with time zone null default now(),
  constraint todos_pkey primary key (id)
);

alter table public.todos enable row level security;

create policy "Enable all access for todos"
on public.todos for all using (true) with check (true);
```
3. Settings → API → Kopier URL og anon key
4. **Lim inn i `src/supabaseClient.js`** (VIKTIG!)

### Steg 2: Test Lokalt (1 min)

```bash
npm install
npm run dev
```

Åpne http://localhost:5173 og test appen!

### Steg 3: Deploy til GitHub (2 min)

```bash
# Opprett repository på github.com først!

git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/DITT-BRUKERNAVN/supabase-todo-react.git
git push -u origin main
```

Gå til GitHub → Settings → Pages → Velg "GitHub Actions" → Ferdig! 🎉

## 📍 Viktige Filer

| Fil | Hva du må gjøre |
|-----|-----------------|
| `src/supabaseClient.js` | ⚠️ **LIM INN** dine Supabase credentials her! |
| `vite.config.js` | Endre `base` hvis du bruker annet repo-navn |
| `.github/workflows/deploy.yml` | GitHub Actions config (trenger ikke endre) |

## 🔗 Din App URL

Etter deployment: `https://ditt-brukernavn.github.io/supabase-todo-react/`

## ❓ Problemer?

Les `DEPLOYMENT.md` for detaljerte instruksjoner!
