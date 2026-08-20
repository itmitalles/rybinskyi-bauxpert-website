# Asset approval register

Status: 2026-08-20. This register is the release record for visual assets. A repository commit, a customer advert, or a PIN gate is not proof of copyright ownership or permission to publish.

## Build policy

- Only assets marked `Verwendung freigegeben: ja` may enter `dist`.
- Current build allowlist: three original vectors, one WebP derivative of the existing customer logo, and six WebP derivatives of selected customer/project photos.
- The repository owner explicitly instructed inclusion of the existing logo and customer photos in the PIN/noindex GitHub Pages preview on 2026-08-20. This is recorded as preview-build authorization, not as Denys' final rights confirmation.
- The four former generated Kleinanzeigen visualizations were removed from the current build. They remain recoverable from Git history.
- The strongest finished U-shaped kitchen is the hero in both website versions. Sauna appears only as a secondary reference in the premium route.
- Publication on the custom domain or reuse in a real advert remains blocked until Denys confirms the exact files and intended use.

## Public and brand assets

| Pfad | Quelle | Vermuteter Rechteinhaber | Von Denys bestätigt | Verwendung freigegeben | Datum | Anmerkung |
| --- | --- | --- | --- | --- | --- | --- |
| `public/hero-kitchen-placeholder.svg` | Für diesen Branch eigenständig als Vektorgrafik erstellt | Projekt/Repository; vertragliche Zuordnung bei Bedarf klären | nein | ja | 2026-08-20 | Neutraler Gestaltungsplatzhalter, ausdrücklich kein Referenzfoto. |
| `public/favicon.svg` | Für diesen Branch eigenständig als Vektorgrafik erstellt | Projekt/Repository; vertragliche Zuordnung bei Bedarf klären | nein | ja | 2026-08-20 | Kein fremdes Bildmaterial. |
| `public/og-default.svg` | Codebasierte Vektorgrafik aus dem Repository, in diesem Branch textlich aktualisiert | Projekt/Repository; vertragliche Zuordnung bei Bedarf klären | nein | ja | 2026-08-20 | Kein Projektfoto, keine externe Quelle. |
| `src/assets/brand/logo.png` → `public/brand/rybinskyi-bauxpert-logo.webp` | Bestehendes Kundenlogo, Initialimport in Commit `5fb03fa`; WebP ist eine rein technische Größen-/Formatableitung | unbekannt, mutmaßlich Denys bzw. Logo-Urheber | nein | ja, PIN/noindex-Preview auf ausdrückliche Nutzeranweisung | 2026-08-20 | Original-Logo ist wieder in Header, Übersicht, PIN-Gate und Anzeigenpaket sichtbar. Finale Nutzungsrechte bestätigen. |
| `src/assets/projects/kuechenmontage-u-form/fertig.jpg` → `public/preview/customer/kuechenmontage-u-form-fertig.webp` | Import `d8153ee`; Teilquelle Kundenanzeige möglich | unbekannt, möglicherweise Denys oder fotografierende Person | nein | ja, PIN/noindex-Preview auf ausdrückliche Nutzeranweisung | 2026-08-20 | Hero beider Website-Versionen und Bild 1 im Anzeigenpaket. |
| `src/assets/projects/kuechenmontage-u-form/waehrend.jpg` → `public/preview/customer/kuechenmontage-u-form-waehrend.webp` | Import `d8153ee`; Teilquelle Kundenanzeige möglich | unbekannt, möglicherweise Denys oder fotografierende Person | nein | ja, PIN/noindex-Preview auf ausdrückliche Nutzeranweisung | 2026-08-20 | Bild 2 im Anzeigenpaket. |
| `src/assets/projects/eckkueche-grau/fertig.jpg` → `public/preview/customer/eckkueche-grau-fertig.webp` | Import `d8153ee`; Teilquelle Kundenanzeige möglich | unbekannt, möglicherweise Denys oder fotografierende Person | nein | ja, PIN/noindex-Preview auf ausdrückliche Nutzeranweisung | 2026-08-20 | Referenzfoto in Standard und Premium. |
| `src/assets/projects/hochbett-montage/fertig.jpg` → `public/preview/customer/hochbett-montage-fertig.webp` | Import `d8153ee`; Teilquelle Kundenanzeige möglich | unbekannt, möglicherweise Denys oder fotografierende Person | nein | ja, PIN/noindex-Preview auf ausdrückliche Nutzeranweisung | 2026-08-20 | Möbelreferenz und Bild 3 im Anzeigenpaket. |
| `src/assets/projects/boden/fischgraet-parkett.png` → `public/preview/customer/fischgraet-parkett.webp` | Initialimport `5fb03fa`; Quelle nicht dokumentiert | unbekannt, möglicherweise Denys oder fotografierende Person | nein | ja, PIN/noindex-Preview auf ausdrückliche Nutzeranweisung | 2026-08-20 | Bodenreferenz und Bild 4 im Anzeigenpaket. Materialbezeichnung bestätigen. |
| `src/assets/projects/sauna/innenansicht.jpeg` → `public/preview/customer/sauna-innenansicht.webp` | Initialimport `5fb03fa`; Quelle nicht dokumentiert | unbekannt, möglicherweise Denys oder fotografierende Person | nein | ja, PIN/noindex-Preview auf ausdrückliche Nutzeranweisung | 2026-08-20 | Nur nachrangige Referenz in Premium, nicht Hero oder Kernleistung. |
| `src/assets/pending/legacy-favicon.png` | Früheres `public/favicon.png`, Initialimport in Commit `5fb03fa` | unbekannt | nein | nein | — | Unverändert aus `public/` verschoben, damit es nicht in `dist` kopiert wird. |

## Project groups

For the groups introduced in commit `d8153ee`, the README says that part of the kitchen and furniture material came from the customer's commercial Kleinanzeigen advert. The repository does not document which exact files came from that advert, who took each photo, or whether third-party rights exist. The source therefore remains unresolved for every individual group.

| Pfad / Projektgruppe | Quelle | Vermuteter Rechteinhaber | Von Denys bestätigt | Verwendung freigegeben | Datum | Anmerkung |
| --- | --- | --- | --- | --- | --- | --- |
| `src/assets/projects/bad/` | Initialimport `5fb03fa`; Quelle nicht dokumentiert | unbekannt, möglicherweise Denys oder fotografierende Person | nein | nein | — | Nicht im Build. |
| `src/assets/projects/boden/` | Initialimport `5fb03fa`; Quelle nicht dokumentiert | unbekannt, möglicherweise Denys oder fotografierende Person | nein | teilweise, nur oben genannter Preview-Ableger | 2026-08-20 | Übrige Dateien nicht im Build; Materialbezeichnung bestätigen. |
| `src/assets/projects/eckkueche-grau/` | Import `d8153ee`; Teilquelle Kundenanzeige möglich, Dateizuordnung offen | unbekannt, möglicherweise Denys oder fotografierende Person | nein | teilweise, nur oben genannter Preview-Ableger | 2026-08-20 | Übrige Dateien nicht im Build. |
| `src/assets/projects/garten/` | Initialimport `5fb03fa`; Quelle nicht dokumentiert | unbekannt, möglicherweise Denys oder fotografierende Person | nein | nein | — | Nicht im Build; mögliches Duplikat. |
| `src/assets/projects/hochbett-montage/` | Import `d8153ee`; Teilquelle Kundenanzeige möglich, Dateizuordnung offen | unbekannt, möglicherweise Denys oder fotografierende Person | nein | teilweise, nur oben genannter Preview-Ableger | 2026-08-20 | Übrige Dateien nicht im Build. |
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
| `src/assets/projects/kuechenmontage-u-form/` | Import `d8153ee`; Teilquelle Kundenanzeige möglich, Dateizuordnung offen | unbekannt, möglicherweise Denys oder fotografierende Person | nein | teilweise, nur zwei oben genannte Preview-Ableger | 2026-08-20 | Fertigfoto ist Preview-Hero; übrige Dateien nicht im Build. |
| `src/assets/projects/kuechenmontage-zeile/` | Import `d8153ee`; Teilquelle Kundenanzeige möglich, Dateizuordnung offen | unbekannt, möglicherweise Denys oder fotografierende Person | nein | nein | — | Nicht im Build. |
| `src/assets/projects/kuechenzeile-grau/` | Import `d8153ee`; Teilquelle Kundenanzeige möglich, Dateizuordnung offen | unbekannt, möglicherweise Denys oder fotografierende Person | nein | nein | — | Nicht im Build. |
| `src/assets/projects/kuechenzeile-gruen-weiss/` | Import `d8153ee`; Teilquelle Kundenanzeige möglich, Dateizuordnung offen | unbekannt, möglicherweise Denys oder fotografierende Person | nein | nein | — | Nicht im Build. |
| `src/assets/projects/kuechenzeile-schutzfolie/` | Import `d8153ee`; Teilquelle Kundenanzeige möglich, Dateizuordnung offen | unbekannt, möglicherweise Denys oder fotografierende Person | nein | nein | — | Nicht im Build. |
| `src/assets/projects/renovierung/` | Initialimport `5fb03fa`; Quelle nicht dokumentiert | unbekannt, möglicherweise Denys oder fotografierende Person | nein | nein | — | Nicht im Build. |
| `src/assets/projects/sauna/` | Initialimport `5fb03fa`; Quelle nicht dokumentiert | unbekannt, möglicherweise Denys oder fotografierende Person | nein | teilweise, nur oben genannter Preview-Ableger | 2026-08-20 | Nur nachrangige Referenz, nicht Hero oder Kernleistung. |
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
