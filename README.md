# Rybinskyi BauXpert Website

Statische Astro-Website für Rybinskyi BauXpert in München. Das Projekt gehört zur GitHub-Organisation [`rybinskyi-bauxpert-de`](https://github.com/rybinskyi-bauxpert-de) und liegt im Repository [`rybinskyi-bauxpert-website`](https://github.com/rybinskyi-bauxpert-de/rybinskyi-bauxpert-website).

Die GitHub-Pages-Fassung unter <https://rybinskyi-bauxpert-de.github.io/rybinskyi-bauxpert-website/> ist eine `noindex`-Kundenpreview mit einfachem PIN-Gate. Der PIN-Schutz hält nur zufällige Besucher fern und ist keine sichere Zugriffskontrolle.

Nach Eingabe der PIN stehen genau zwei Entwürfe zur Auswahl:

- `/` – bodenständige, praktische Werkstatt-Version
- `/premium/` – hochwertigere Innenausbau-Version mit denselben echten Referenzen

Die Auswahl kann über den Preview-Schalter erneut geöffnet werden.

## Entwicklung

```bash
npm ci
npm run dev
```

## Build und Prüfung

```bash
npm run build
npm run typecheck
npm run lint
npm test
```

`npm run typecheck` und `npm run lint` führen die strenge Astro-Prüfung aus. `npm run test:visual` prüft PIN-Gate, beide Varianten, Projektübersicht, Küchenprojekt und Kontakt in mehreren Desktop- und Mobilgrößen mit lokal installiertem Google Chrome. Dafür muss die Seite parallel unter `http://127.0.0.1:4321` laufen.

## Projektbilder und Quelle

Ein Teil der neuen Küchen- und Möbelaufnahmen stammt aus der bestehenden [gewerblichen Kleinanzeigen-Anzeige des Kunden](https://www.kleinanzeigen.de/s-anzeige/moebel-aufbau-kuechenmontage-in-muenchen/3034324567-239-6427). Die ausgewählten Bilder liegen als lokale Dateien unter `src/assets/projects/`; die Website hotlinkt keine Kleinanzeigen-URLs. Die Werbegrafik und qualitativ schwache Aufnahmen werden nicht als Projektfotos verwendet.

Vor dem öffentlichen Livegang muss Denys die Rechtekette und Freigabe für alle Bilder bestätigen. Unbelegte Adressen, Stadtteile, Marken, Materialien oder Arbeitsphasen dürfen nicht ergänzt werden.

## Projekte und Bilder ergänzen

1. Bilder unter `src/assets/projects/<projekt>/` ablegen und sinnvoll benennen, zum Beispiel `waehrend.jpg`, `detail.jpg` oder `fertig.jpg`.
2. Eine Markdown-Datei unter `src/content/projects/` anlegen. Das Schema in `src/content.config.ts` erwartet Titel, Slug, Ort, Leistungen, Zusammenfassung, Cover, Bilder und ausgeführte Arbeiten.
3. Nur sichtbar belegbare Phasen als `vorher`, `waehrend`, `detail` oder `nachher` kennzeichnen. Unterschiedliche Aufträge nicht zu einer Projektgruppe zusammenfassen.
4. Alt-Texte beschreiben ausschließlich den sichtbaren Inhalt. Astro erzeugt responsive Größen und moderne Bildvarianten.

## Preview-PIN ändern

1. Neuen PIN lokal hashen: `printf %s 'NEUER_PIN' | sha256sum`
2. Den Hash in `src/config/site.ts` unter `previewPinHash` ersetzen oder beim Build als `PUBLIC_PREVIEW_PIN_HASH` setzen.

Der Klartext-PIN wird weder gespeichert noch verglichen. Der Hash ist im statischen Build zwangsläufig öffentlich einsehbar.

## Preview-Modus deaktivieren

In `src/config/site.ts` setzen:

```ts
previewMode: false
```

Dadurch verschwinden PIN-Gate und `noindex`; `robots.txt` erlaubt dann das Crawling. Vorher müssen die offenen Pflichtangaben, Bildrechte und Inhalte geprüft werden.

## GitHub Pages

`.github/workflows/deploy-pages.yml` baut bei jedem Push auf `main`, leitet Owner und Repositorynamen aus `GITHUB_REPOSITORY` ab, setzt den Project-Pages-Unterpfad automatisch und deployt über die offiziellen Pages-Actions. In den Repository-Einstellungen muss als Pages-Quelle **GitHub Actions** gewählt sein.

## Spätere Custom Domain

Für `rybinskyi-bauxpert.de` später in GitHub Pages die Custom Domain eintragen, die von GitHub genannten DNS-Einträge beim DNS-Anbieter setzen und HTTPS aktivieren. Danach `PUBLIC_SITE_URL=https://rybinskyi-bauxpert.de` verwenden beziehungsweise ohne Project-Pages-Unterpfad bauen. Es wurden bewusst noch keine DNS-Änderungen vorgenommen.

## Datenschutz

Keine Analytics, externen Fonts, Karten, Videos, Formulardienste oder Tracking-Cookies. Der Anfrage-Builder erzeugt lokal einen `wa.me`- oder `mailto:`-Link. Die Datenschutzerklärung muss beim Wechsel des Hosters beziehungsweise auf die Hauptdomain nochmals an die reale Infrastruktur angepasst werden.
