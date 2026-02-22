# Assets Neon Yakuza — Documentation

Liste des assets nécessaires pour le slot **Neon Yakuza** (6×6 cluster, Tokyo cyberpunk).  
Les assets du template ont été retirés et remplacés par les nôtres.

---

## ✅ Assets déjà fournis (en place)

| Asset | Chemin | Notes |
|-------|--------|-------|
| **Logo loading** | `static/assets/loader/yakuza_logo.png` | Logo écran de chargement |
| **Background** | `static/assets/backgrounds/background.jpg` | Fond fixe |
| **Provider logo** | `static/assets/sprites/uiSlotsAssetsBespoke/provider-logo.png` | Logo du provider |
| **Symboles** | `static/assets/sprites/symbolsStatic/` | |
| ├ koi.png | | Poisson KOI (H1) |
| ├ dragon.png | | Dragon (H2) |
| ├ oni.png | | Masque ONI (H3) |
| ├ katana.png | | Katana (H4, H5) |
| ├ cherry.png | | Cerise (L1, L3) |
| ├ seven.png | | Sept (L2, L4) |
| ├ wild.png | | Wild |
| └ scatter.png | | Scatter |
| **Musiques** | `static/assets/audio/` | |
| ├ music_base.mp3 | | BGM mode base |
| └ music_freespin.mp3 | | BGM free spins |

---

## 🎨 UI généré en code PixiJS (sans images)

Tous les éléments UI suivants sont générés en code avec `Graphics()` et `Text` + `GlowFilter` :

| Élément | Implémentation |
|---------|----------------|
| **Reels Frame** | Bordures neon `Graphics()` — fond #0A0A0F, bordure cyan/violet |
| **Progress Bar** | Rectangle dégradé cyan/violet (`LoadingScreen`) |
| **Free Spins** | Texte PixiJS Orbitron + GlowFilter |
| **Win Small** | Texte PixiJS + GlowFilter |
| **Press to continue** | Texte PixiJS animé (pulse) |
| **Pay Frame / Tumble** | Rectangle neon `Graphics()` |
| **Coins** | Cercles dorés `Graphics()` animés |
| **Polices** | TextStyle : gold #FFD700, silver #C0C0C0, purple #7B2FBE |

**Couleurs :** violet #7B2FBE, cyan #00F5FF, rose #FF006E, fond #0A0A0F

---

## 📋 Assets à fournir (reste)






### 1. Sons - Voir section Résumé
| Fichier | Usage |
|---------|--------|
| `payFrame.png` | Cadre des gains |

**Chemin :** `static/assets/sprites/payFrame/payFrame.png`

### (Coins généré en code)
Spritesheet pour l’animation des jetons.

**Chemin actuel :** `static/assets/sprites/coin/SD2_Coin.json`

### Sons (SFX)
Fichier JSON + audio pour les effets sonores.

**Chemin actuel :** `static/assets/audio/sounds.json` + fichier audio associé

---

## 🎬 Animations Spine (conservées — nécessaires au fonctionnement)

Ces animations sont utilisées par le moteur du slot. À conserver sauf si vous fournissez des remplacements compatibles.

| Clé | Dossier | Usage |
|-----|---------|-------|
| `explosion` | `spines/symbols3/` | Explosion des symboles gagnants |
| `anticipation` | `spines/anticipation/` | Anticipation avant feature |
| `bigwin` | `spines/bigwin/` | Écran Big Win |
| `globalMultiplier` | `spines/globalMultiplier/` | Affichage multiplicateur global |
| `tumble_multiplier` | `spines/tumbleWin/` | Multiplicateur tumble |
| `tumble_win` | `spines/tumbleWin/` | Animation tumble win |
| `clusterWin` | `spines/clusterWin/` | Gains de cluster |
| `transition` | `spines/transition/` | Transition d’écran |
| `fsIntro` | `spines/fsIntro/` | Intro free spins |
| `fsIntroNumber` | `spines/fsIntro/` | Chiffres intro free spins |
| `fsOutroNumber` | `spines/fsIntro/` | Chiffres fin free spins |
| `reelhouse` | `spines/reelhouse/` | Glow des rouleaux |

---

## ❌ Assets / animations retirés (template)

- Symboles template : H1–H5, L1–L4, M, S, W (sprites/Spine du template)
- `foregroundAnimation`, `foregroundFeatureAnimation` (premier plan)
- `loader` (écran de chargement template)
- `loadingBg` (fond loading template)
- Sprites multiplicateurs du template : m1_2x, m1_4x, m2_5x, etc. (non utilisés dans Neon Yakuza)

---

## Résumé

**Déjà en place :** symboles, logo loading, background, provider logo, musiques.

**Générés en code (PixiJS) :** Reels Frame, Progress Bar, Free Spins, Win Small, Press to continue, Pay Frame, Coins, polices (TextStyle).

**À fournir :** sons SFX (`sounds.json` + audio) — optionnel si vous gardez ceux du template.
