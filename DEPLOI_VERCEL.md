# Déployer Neon Yakuza sur GitHub + Vercel

## 1. Créer un nouveau dépôt GitHub

1. Va sur [github.com/new](https://github.com/new)
2. Nom du repo : par ex. `neon-yakuza` ou `bce-neon-yakuza`
3. **Ne coche pas** "Add a README" (le projet en a déjà)
4. Clique sur **Create repository**

## 2. Pousser le code vers GitHub

Dans le terminal, à la **racine** du projet (`NEON YAKUZA`) :

```bash
# Ajouter le nouveau remote (remplace TON-USERNAME et TON-REPO par les tiens)
git remote add github https://github.com/TON-USERNAME/TON-REPO.git

# Ou si tu remplaces complètement l’origin actuel :
# git remote remove origin
# git remote add origin https://github.com/TON-USERNAME/TON-REPO.git

# Tout ajouter, committer, pousser
git add .
git commit -m "Neon Yakuza - slot jouable + démo"
git push -u github main
```

Si le repo GitHub est vide et que tu utilises `origin` :

```bash
git add .
git commit -m "Neon Yakuza - slot jouable + démo"
git branch -M main
git push -u origin main
```

## 3. Déployer sur Vercel

1. Va sur [vercel.com](https://vercel.com) et connecte-toi (avec GitHub si tu veux)
2. **Add New** → **Project**
3. **Import** le repo GitHub que tu viens de créer
4. **Important (monorepo)** : dans **Settings → General**, définis **Root Directory** sur `apps/neon-yakuza` (bouton Edit à côté, puis choisis le dossier). Sans ça, le déploiement peut rester bloqué après le build.
5. Le `vercel.json` à la racine fournit :
   - **Build Command** : `pnpm -w run build:neon-yakuza`
   - **Output Directory** : `build` (relatif au Root Directory)
   - **Install Command** : `pnpm install`
6. Clique sur **Deploy**

Quand le déploiement est terminé, tu auras une URL du type `https://ton-projet.vercel.app`. Tu pourras la partager pour que des gens testent la slot.

### Lien direct mode démo

Pour envoyer un lien qui saute les loaders :

`https://ton-projet.vercel.app/?demo=1`

---

**Note** : En production sur Vercel, l’appel `wallet/authenticate` échouera tant qu’il n’y a pas de backend. Le jeu peut quand même s’afficher (comme en local avec `?demo=1`).
