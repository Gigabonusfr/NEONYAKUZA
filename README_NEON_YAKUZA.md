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

## Guidelines Stake Engine

- Pas de console.log en production (ESLint no-console)
- Assets CDN uniquement
- Multidevise : `numberToCurrencyString`
- i18n : Lingui pour multilingue
- Autoplay avec confirmation obligatoire
