# NEON YAKUZA - Slot Stake Engine

Slot 6x6 cluster pays, style Tokyo cyberpunk, pour Stake Engine.

## Structure

```
NEON YAKUZA/
├── apps/
│   └── neon-yakuza/       # Frontend Svelte 5 + PixiJS 8
├── packages/              # Packages partagés web-sdk
├── math/                  # Math engine Python (StakeEngine/math-sdk)
│   └── games/
│       └── neon_yakuza/   # Config, gamestate, reels
└── .nvmrc                 # Node 22.16.0
```

## Setup

### Environnement
- Node.js 22.16.0 (voir `.nvmrc`)
- pnpm 10.5.0
- Python 3.12+ (pour math-sdk)

### Frontend
```bash
pnpm install
pnpm run storybook --filter=neon-yakuza
pnpm run dev --filter=neon-yakuza
pnpm run build --filter=neon-yakuza
```

### Math engine
```bash
cd math
python -m venv env
.\env\Scripts\activate   # Windows
pip install -r requirements.txt
pip install -e .
make run GAME=neon_yakuza
```

## Mécaniques

- **Grille** : 6x6 cluster pays
- **Symboles** : KOI, DRAGON, ONI, KATANA, CHERRY, SEVEN, WILD, SCATTER
- **Yakuza Mode** : multiplicateur progressif x1 → x500 par position
- **Free Spins** : 10 spins (3+ scatters), wilds collants
- **Bonus Buy** : 100x mise
- **RTP** : 96%, Max win : 15 000x

## Assets

Les assets actuels réutilisent le cluster sample. Pour la mise en production :
1. Remplacer par des assets uniques (palette violet/rose/cyan/noir)
2. Héberger sur CDN
3. Mettre à jour `apps/neon-yakuza/src/game/assets.ts` et `constants.ts`

### Configuration CDN (publication Stake)

En production, tous les assets (images, polices, vidéo, audio) doivent être chargés depuis le CDN Stake Engine. Le projet utilise une base URL configurable :

- **Variable d’environnement** : `PUBLIC_ASSETS_BASE_URL`
  - En dev / démo : laisser vide (assets servis par l’app).
  - En prod (build pour Stake) : définir l’URL du CDN (ex. `https://cdn.stake-engine.com/game-id`) sans slash final.

- **Fichiers concernés** :
  - `apps/neon-yakuza/src/game/assets.ts` — sprites, spines, sons (via `resolveAssetUrl`)
  - `apps/neon-yakuza/src/game/assetBaseUrl.ts` — helper `resolveAssetUrl` / `resolveAssetPath`
  - `apps/neon-yakuza/src/components/Background.svelte` — vidéo de fond
  - `apps/neon-yakuza/src/game/musicUrls.ts` — BGM

Lorsque `PUBLIC_ASSETS_BASE_URL` est défini, toutes les URLs d’assets sont préfixées par cette base (pathname conservé). Build statique sans accès à des sources externes (XSS).

## Guidelines Stake Engine (livraison Stake)

**Le projet est livré pour Stake ; ces règles sont obligatoires.**

| Règle | Détail |
|-------|--------|
| **Pas de console en prod** | Aucun `console.log` / `console.warn` dans le code de l’app (ESLint no-console). |
| **Assets CDN uniquement** | En production, tous les assets (sprites, spines, fonts, vidéos) doivent être servis via CDN. |
| **Multidevise** | Toujours afficher les montants avec `numberToCurrencyString` ; devise issue de l’auth. |
| **i18n** | Lingui pour tout texte utilisateur (multilingue). |
| **Autoplay** | Confirmation explicite obligatoire avant d’activer l’autoplay. |

**Documentation Stake :**

- **Doc locale (complète)** : dossier `stake_docs` (à la racine du studio). Index des fichiers dans **`STAKE_DOCS.md`** à la racine de ce repo.
- [Documentation en ligne](https://stake-engine.com/docs)
- [Stake Engine](https://engine.stake.com/)

Règle Cursor (équipe + IA) : `.cursor/rules/stake-guidelines.mdc`.

### Démo et production

- **Démo** : le paramètre `?demo=1` active le mode test (mock RGS, solde initial, pas d’auth). Seul le layout neon-yakuza et `createPrimaryMachines` utilisent `stateDemo` ; le mock et `stateDemo.isDemo` ne sont activés que lorsque l’URL contient `demo=1`.
- **Production** : sans `?demo=1`, l’auth et le RGS réels sont utilisés (sessionID, rgs_url en query). La page d’accueil (boutons « Démo PC » / « Démo Mobile ») est destinée aux tests internes ; l’URL de jeu Stake (CDN avec sessionID, etc.) ne sert pas cette page et envoie directement le joueur au jeu.
