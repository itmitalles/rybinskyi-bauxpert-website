# Asset approval register

Status: 2026-08-20. This register is the release record for visual assets. A repository commit, a customer advert, or a PIN gate is not proof of copyright ownership or permission to publish.

## Build policy

- Only assets marked `Verwendung freigegeben: ja` may enter `dist`.
- Current build allowlist: three original vectors plus four newly generated and visibly labelled Kleinanzeigen preview visualizations under `public/preview/kleinanzeigen/`.
- All customer/project raster images remain in the repository or its Git history but outside the current build.
- Generated preview visuals are not reference photos, are isolated to `/kleinanzeigen/`, and require Denys' final design/publication approval before any real advert is placed.
- A real kitchen photograph replaces the neutral hero only after the exact file has a documented rights approval.
- Preferred real hero after approval: `src/assets/projects/kuechenmontage-u-form/fertig.jpg`. It shows a finished kitchen, is suitable for the vertical split-hero, and has a related process image. This is a design recommendation, not a publication approval.

## Public and brand assets

| Pfad | Quelle | Vermuteter Rechteinhaber | Von Denys bestätigt | Verwendung freigegeben | Datum | Anmerkung |
| --- | --- | --- | --- | --- | --- | --- |
| `public/hero-kitchen-placeholder.svg` | Für diesen Branch eigenständig als Vektorgrafik erstellt | Projekt/Repository; vertragliche Zuordnung bei Bedarf klären | nein | ja | 2026-08-20 | Neutraler Gestaltungsplatzhalter, ausdrücklich kein Referenzfoto. |
| `public/favicon.svg` | Für diesen Branch eigenständig als Vektorgrafik erstellt | Projekt/Repository; vertragliche Zuordnung bei Bedarf klären | nein | ja | 2026-08-20 | Kein fremdes Bildmaterial. |
| `public/og-default.svg` | Codebasierte Vektorgrafik aus dem Repository, in diesem Branch textlich aktualisiert | Projekt/Repository; vertragliche Zuordnung bei Bedarf klären | nein | ja | 2026-08-20 | Kein Projektfoto, keine externe Quelle. |
| `public/preview/kleinanzeigen/kueche-fertig-visualisierung.webp` | OpenAI-Bildgenerierung für diesen Entwurf; Prompt und ursprüngliche Arbeitsdatei `exec-efbbd84d-4b42-44d8-b711-1ac41e1c7e4b.png` dokumentiert | Projektauftraggeber gemäß den anwendbaren Bedingungen des Erzeugungswerkzeugs; Rechtsprüfung für externe Veröffentlichung offen | nein | ja, ausschließlich gekennzeichnete PIN-Preview | 2026-08-20 | Fertige Küche; im UI dauerhaft „Visualisierung · kein Referenzfoto“. Keine Marke, Person oder Kundenreferenz beabsichtigt. |
| `public/preview/kleinanzeigen/kueche-montage-visualisierung.webp` | OpenAI-Bildgenerierung für diesen Entwurf; Prompt und ursprüngliche Arbeitsdatei `exec-a4071f00-45f1-47e7-b4af-30d0853e868a.png` dokumentiert | Projektauftraggeber gemäß den anwendbaren Bedingungen des Erzeugungswerkzeugs; Rechtsprüfung für externe Veröffentlichung offen | nein | ja, ausschließlich gekennzeichnete PIN-Preview | 2026-08-20 | Montagesituation ohne Person; im UI dauerhaft als Visualisierung gekennzeichnet. |
| `public/preview/kleinanzeigen/moebelmontage-visualisierung.webp` | OpenAI-Bildgenerierung für diesen Entwurf; Prompt und ursprüngliche Arbeitsdatei `exec-38e7330e-ead8-4774-b917-8137ec97d57a.png` dokumentiert | Projektauftraggeber gemäß den anwendbaren Bedingungen des Erzeugungswerkzeugs; Rechtsprüfung für externe Veröffentlichung offen | nein | ja, ausschließlich gekennzeichnete PIN-Preview | 2026-08-20 | Möbelmontage ohne Person; im UI dauerhaft als Visualisierung gekennzeichnet. |
| `public/preview/kleinanzeigen/boden-innenausbau-visualisierung.webp` | OpenAI-Bildgenerierung für diesen Entwurf; Prompt und ursprüngliche Arbeitsdatei `exec-48512e2e-b2a8-4687-98f1-f7bd894ae0d7.png` dokumentiert | Projektauftraggeber gemäß den anwendbaren Bedingungen des Erzeugungswerkzeugs; Rechtsprüfung für externe Veröffentlichung offen | nein | ja, ausschließlich gekennzeichnete PIN-Preview | 2026-08-20 | Boden-/Sockelleistendetail; im UI dauerhaft als Visualisierung gekennzeichnet. |
| `src/assets/brand/logo.png` | Initialimport in Commit `5fb03fa`; Originalquelle nicht dokumentiert | unbekannt | nein | nein | — | Bleibt unverändert im Repository, wird nicht importiert. |
| `src/assets/pending/legacy-favicon.png` | Früheres `public/favicon.png`, Initialimport in Commit `5fb03fa` | unbekannt | nein | nein | — | Unverändert aus `public/` verschoben, damit es nicht in `dist` kopiert wird. |

## Project groups

For the groups introduced in commit `d8153ee`, the README says that part of the kitchen and furniture material came from the customer's commercial Kleinanzeigen advert. The repository does not document which exact files came from that advert, who took each photo, or whether third-party rights exist. The source therefore remains unresolved for every individual group.

| Pfad / Projektgruppe | Quelle | Vermuteter Rechteinhaber | Von Denys bestätigt | Verwendung freigegeben | Datum | Anmerkung |
| --- | --- | --- | --- | --- | --- | --- |
| `src/assets/projects/bad/` | Initialimport `5fb03fa`; Quelle nicht dokumentiert | unbekannt, möglicherweise Denys oder fotografierende Person | nein | nein | — | Nicht im Build. |
| `src/assets/projects/boden/` | Initialimport `5fb03fa`; Quelle nicht dokumentiert | unbekannt, möglicherweise Denys oder fotografierende Person | nein | nein | — | Nicht im Build; Materialbezeichnung ebenfalls bestätigen. |
| `src/assets/projects/eckkueche-grau/` | Import `d8153ee`; Teilquelle Kundenanzeige möglich, Dateizuordnung offen | unbekannt, möglicherweise Denys oder fotografierende Person | nein | nein | — | Nicht im Build. |
| `src/assets/projects/garten/` | Initialimport `5fb03fa`; Quelle nicht dokumentiert | unbekannt, möglicherweise Denys oder fotografierende Person | nein | nein | — | Nicht im Build; mögliches Duplikat. |
| `src/assets/projects/hochbett-montage/` | Import `d8153ee`; Teilquelle Kundenanzeige möglich, Dateizuordnung offen | unbekannt, möglicherweise Denys oder fotografierende Person | nein | nein | — | Nicht im Build. |
| `src/assets/projects/kinderzimmer/` | Initialimport `5fb03fa`; Quelle nicht dokumentiert | unbekannt, möglicherweise Denys oder fotografierende Person | nein | nein | — | Nicht im Build; mögliches Duplikat. |
| `src/assets/projects/kinderzimmer-regal/` | Import `d8153ee`; Teilquelle Kundenanzeige möglich, Dateizuordnung offen | unbekannt, möglicherweise Denys oder fotografierende Person | nein | nein | — | Nicht im Build. |
| `src/assets/projects/kleiderschrank/` | Initialimport `5fb03fa`; Quelle nicht dokumentiert | unbekannt, möglicherweise Denys oder fotografierende Person | nein | nein | — | Nicht im Build; mögliches Duplikat. |
| `src/assets/projects/kleiderschrank-drehtueren/` | Import `d8153ee`; Teilquelle Kundenanzeige möglich, Dateizuordnung offen | unbekannt, möglicherweise Denys oder fotografierende Person | nein | nein | — | Nicht im Build. |
| `src/assets/projects/kleiderschrank-schiebetueren/` | Import `d8153ee`; Teilquelle Kundenanzeige möglich, Dateizuordnung offen | unbekannt, möglicherweise Denys oder fotografierende Person | nein | nein | — | Nicht im Build. |
| `src/assets/projects/kompakte-kueche/` | Import `d8153ee`; Teilquelle Kundenanzeige möglich, Dateizuordnung offen | unbekannt, möglicherweise Denys oder fotografierende Person | nein | nein | — | Nicht im Build. |
| `src/assets/projects/kueche/` | Initialimport `5fb03fa`; Quelle nicht dokumentiert | unbekannt, möglicherweise Denys oder fotografierende Person | nein | nein | — | Nicht im Build; mögliche Duplikate. |
| `src/assets/projects/kueche-holzfronten/` | Import `d8153ee`; Teilquelle Kundenanzeige möglich, Dateizuordnung offen | unbekannt, möglicherweise Denys oder fotografierende Person | nein | nein | — | Nicht im Build; Materialbezeichnung bestätigen. |
| `src/assets/projects/kuechen-hochschrank/` | Import `d8153ee`; Teilquelle Kundenanzeige möglich, Dateizuordnung offen | unbekannt, möglicherweise Denys oder fotografierende Person | nein | nein | — | Nicht im Build. |
| `src/assets/projects/kuechenmontage-l-form/` | Import `d8153ee`; Teilquelle Kundenanzeige möglich, Dateizuordnung offen | unbekannt, möglicherweise Denys oder fotografierende Person | nein | nein | — | Nicht im Build. |
| `src/assets/projects/kuechenmontage-u-form/` | Import `d8153ee`; Teilquelle Kundenanzeige möglich, Dateizuordnung offen | unbekannt, möglicherweise Denys oder fotografierende Person | nein | nein | — | Bevorzugtes Hero-Projekt nach Freigabe; derzeit nicht im Build. |
| `src/assets/projects/kuechenmontage-zeile/` | Import `d8153ee`; Teilquelle Kundenanzeige möglich, Dateizuordnung offen | unbekannt, möglicherweise Denys oder fotografierende Person | nein | nein | — | Nicht im Build. |
| `src/assets/projects/kuechenzeile-grau/` | Import `d8153ee`; Teilquelle Kundenanzeige möglich, Dateizuordnung offen | unbekannt, möglicherweise Denys oder fotografierende Person | nein | nein | — | Nicht im Build. |
| `src/assets/projects/kuechenzeile-gruen-weiss/` | Import `d8153ee`; Teilquelle Kundenanzeige möglich, Dateizuordnung offen | unbekannt, möglicherweise Denys oder fotografierende Person | nein | nein | — | Nicht im Build. |
| `src/assets/projects/kuechenzeile-schutzfolie/` | Import `d8153ee`; Teilquelle Kundenanzeige möglich, Dateizuordnung offen | unbekannt, möglicherweise Denys oder fotografierende Person | nein | nein | — | Nicht im Build. |
| `src/assets/projects/renovierung/` | Initialimport `5fb03fa`; Quelle nicht dokumentiert | unbekannt, möglicherweise Denys oder fotografierende Person | nein | nein | — | Nicht im Build. |
| `src/assets/projects/sauna/` | Initialimport `5fb03fa`; Quelle nicht dokumentiert | unbekannt, möglicherweise Denys oder fotografierende Person | nein | nein | — | Nach Freigabe nur nachrangige Referenz, nicht Hero oder Kernleistung. |
| `src/assets/projects/spielanlage-montage/` | Import `d8153ee`; Teilquelle Kundenanzeige möglich, Dateizuordnung offen | unbekannt, möglicherweise Denys oder fotografierende Person | nein | nein | — | Nicht im Build. |
| `src/assets/projects/spielhaus/` | Initialimport `5fb03fa`; Quelle nicht dokumentiert | unbekannt, möglicherweise Denys oder fotografierende Person | nein | nein | — | Nicht im Build. |
| `src/assets/projects/studio/` | Initialimport `5fb03fa`; Quelle nicht dokumentiert | unbekannt, möglicherweise Denys oder fotografierende Person | nein | nein | — | Nicht im Build. |
| `src/assets/projects/terrasse/` | Initialimport `5fb03fa`; Quelle nicht dokumentiert | unbekannt, möglicherweise Denys oder fotografierende Person | nein | nein | — | Nicht im Build; verschiedene mögliche Aufträge nicht zusammenführen. |
| `src/assets/projects/wandkonsole-spiegel/` | Import `d8153ee`; Teilquelle Kundenanzeige möglich, Dateizuordnung offen | unbekannt, möglicherweise Denys oder fotografierende Person | nein | nein | — | Nicht im Build. |

## Required evidence for approval

For every group that should be published, record:

1. Who created each file.
2. Whether Denys owns the necessary rights or has written permission for website and social-preview use.
3. Whether people, private information, brand labels, licence plates, screens, or artworks require removal or separate consent.
4. The exact approved filenames and intended pages.
5. Confirmation date and the location of the written evidence without committing private correspondence or secrets.

After approval, update this register and `config/asset-approvals.json`, reintroduce only the approved filenames through a reviewed project route/content collection, adapt the asset gate for Astro's generated output names, and then run the complete release gates.
