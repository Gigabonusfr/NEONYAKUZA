# Documentation Stake Engine (locale)

Documentation officielle Stake fournie dans le dossier **`stake_docs`** (à la racine du studio, même niveau que ce projet).

Source : [stake-engine.com/docs](https://stake-engine.com/docs)

## Emplacement

Depuis ce repo (NEON YAKUZA), le dossier est : **`../stake_docs`**  
(chemin absolu typique : `c:\Users\jojo7\Desktop\BCE STUDIO\stake_docs`)

## Index des fichiers

### Racine
| Fichier | Sujet |
|--------|--------|
| `index.md` | Vue d’ensemble API, format de jeu Stake, critères |
| `terms.md` | Termes |
| `privacy.md` | Confidentialité |

### RGS (Remote Game Server)
| Fichier | Sujet |
|--------|--------|
| `rgs.md` | RGS : URL, query params, argent, paris, devises, codes erreur |
| `rgs_wallet.md` | Endpoints wallet : authenticate, balance, play, end-round |
| `rgs_example.md` | Exemple de connexion RGS |

### Approval Guidelines (à respecter pour publication)
| Fichier | Sujet |
|--------|--------|
| `approval-guidelines.md` | Exigences générales, restrictions clés (stateless, pas de jackpot/gamble, etc.) |
| `approval-guidelines_rgs-communication.md` | Communication RGS : auth, bet levels, XSS, rgs_url, langues/devises |
| `approval-guidelines_front-end-communication.md` | Front : assets CDN, popout, mobile, règles/paytable, UI (balance, bet, sound, spacebar, autoplay) |
| `approval-guidelines_jurisdiction-requirements.md` | stake.us : termes interdits et remplacements (bet → play, etc.) |
| `approval-guidelines_game-tile-requirements.md` | Assets tuile : BG, FG, logo (formats, taille) |
| `approval-guidelines_game-quality-rankings.md` | Qualité / classement |
| `approval-guidelines_game-replay-requirements.md` | Replay |
| `approval-guidelines_math-verification.md` | Vérification math |
| `approval-guidelines_general-disclaimer.md` | Disclaimer |

### Front-end
| Fichier | Sujet |
|--------|--------|
| `front-end.md` | Vue d’ensemble front |
| `front-end_getting-started.md` | Démarrage (storybook, etc.) |
| `front-end_flowchart.md` | Schéma du flux |
| `front-end_file-structure.md` | Structure des fichiers |
| `front-end_context.md` | Contexte |
| `front-end_ui.md` | UI |
| `front-end_storybook.md` | Storybook |
| `front-end_adding-new-events.md` | Ajout de nouveaux events |
| `front-end_task-breakdown.md` | Découpage des tâches |
| `front-end_dependencies.md` | Dépendances |

### Math (engine Python, simulations, books)
| Fichier | Sujet |
|--------|--------|
| `math.md` | Vue d’ensemble math |
| `math_quick-start.md` | Quick start |
| `math_math-file-format.md` | Format des fichiers math pour publication |
| `math_setup.md` | Setup |
| `math_sdk-directory.md` | Répertoire SDK |
| `math_high-level-structure.md` | Structure haut niveau |
| `math_high-level-structure_state-machine.md` | Machine d’états |
| `math_high-level-structure_game-structure.md` | Structure jeu |
| `math_high-level-structure_game-format.md` | Format jeu |
| `math_game-state-structure.md` | Structure game state |
| `math_game-state-structure_board.md` | Board |
| `math_game-state-structure_events.md` | Events |
| `math_game-state-structure_wins.md` | Wins |
| `math_game-state-structure_symbols.md` | Symboles |
| `math_game-state-structure_setup_configs.md` | Configs |
| `math_game-state-structure_setup_betmode.md` | Bet mode |
| `math_game-state-structure_setup_distribution.md` | Distribution |
| `math_game-state-structure_force-files.md` | Force files |
| `math_game-state-structure_simulation-acceptance.md` | Acceptation simulation |
| `math_source-files.md` | Fichiers source |
| `math_source-files_config.md` | Config |
| `math_source-files_state.md` | State |
| `math_source-files_events.md` | Events |
| `math_source-files_outputs.md` | Outputs |
| `math_source-files_executables.md` | Executables |
| `math_source-files_win-manager.md` | Win manager |
| `math_source-files_calculations.md` | Calculs |
| `math_source-files_calculations_board.md` | Board |
| `math_source-files_calculations_lines.md` | Lines |
| `math_source-files_calculations_ways.md` | Ways |
| `math_source-files_calculations_cluster.md` | Cluster |
| `math_source-files_calculations_tumble.md` | Tumble |
| `math_source-files_calculations_scatter.md` | Scatter |
| `math_optimization-algorithm.md` | Algorithme d’optimisation |
| `math_utilities.md` | Utilitaires |
| `math_example-games.md` | Jeux exemples |

---

Pour toute décision technique ou conformité publication, se baser sur ces documents et sur les guidelines décrites dans `.cursor/rules/stake-guidelines.mdc`.
