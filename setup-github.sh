#!/bin/bash

echo "🚀 GitHub Repository Setup Script"
echo "=================================="
echo ""

# Sjekk om git er installert
if ! command -v git &> /dev/null; then
    echo "❌ Git er ikke installert. Installer git først!"
    exit 1
fi

# Få GitHub brukernavn
read -p "📝 Skriv inn ditt GitHub brukernavn: " username

if [ -z "$username" ]; then
    echo "❌ Brukernavn kan ikke være tomt!"
    exit 1
fi

echo ""
echo "✅ GitHub brukernavn: $username"
echo "📦 Repository navn: supabase-todo-react"
echo ""
echo "⚠️  VIKTIG: Gå til github.com og opprett repository 'supabase-todo-react' først!"
echo "   (Public repository, IKKE initialize with README)"
echo ""
read -p "Har du opprettet repository? (y/n): " confirm

if [ "$confirm" != "y" ] && [ "$confirm" != "Y" ]; then
    echo "❌ Avbrutt. Opprett repository først!"
    exit 1
fi

echo ""
echo "🔧 Initialiserer git repository..."
git init

echo "📝 Legger til filer..."
git add .

echo "💾 Lager commit..."
git commit -m "Initial commit: React Supabase Todo App"

echo "🔗 Kobler til GitHub..."
git remote add origin "https://github.com/$username/supabase-todo-react.git"

echo "📤 Pusher til GitHub..."
git branch -M main
git push -u origin main

echo ""
echo "✅ Ferdig!"
echo ""
echo "🌐 Din app vil være tilgjengelig på:"
echo "   https://$username.github.io/supabase-todo-react/"
echo ""
echo "📝 Neste steg:"
echo "   1. Gå til GitHub repository settings"
echo "   2. Velg 'Pages' i venstre meny"
echo "   3. Under 'Source', velg 'GitHub Actions'"
echo "   4. Vent 1-2 minutter på deployment"
echo ""
