# Rybinskyi BauXpert Website

Statische Astro-Website für Rybinskyi BauXpert in München. Die GitHub-Pages-Fassung ist eine `noindex`-Kundenpreview mit einfachem PIN-Gate. Der PIN-Schutz hält nur zufällige Besucher fern und ist keine sichere Zugriffskontrolle.

Nach Eingabe der PIN stehen zwei Entwürfe zur Auswahl: die bodenständige Werkstatt-Version unter `/` und die stärker auf hochwertigen Innenausbau ausgerichtete Premium-Version unter `/premium/`. Die Auswahl kann über den Preview-Schalter erneut geöffnet werden.

## Entwicklung

```bash
npm install
npm run dev
```

## Build und Prüfung

```bash
npm run build
npm test
```

`npm run typecheck` und `npm run lint` führen die strenge Astro-Prüfung aus. `npm run test:visual` prüft beide Varianten in vier Zielgrößen mit lokal installiertem Google Chrome; dafür muss die Seite parallel unter `http://127.0.0.1:4321` laufen.

## Projekte hinzufügen

Eine Markdown-Datei unter `src/content/projects/` anlegen. Das Schema in `src/content.config.ts` erwartet unter anderem Titel, Slug, Ort, Leistungen, Zusammenfassung, Cover, Bilder und ausgeführte Arbeiten. Nur belegbare Projektangaben veröffentlichen; keine Kundennamen oder privaten Adressen ergänzen.

## Bilder hinzufügen

Projektbilder nach `src/assets/projects/<projekt>/` legen und aus der Projekt-Markdown-Datei relativ referenzieren. Astro erzeugt responsive Größen und WebP-Dateien. Alt-Texte beschreiben den sichtbaren Inhalt; unbekannte Materialien oder Arbeitsschritte nicht vermuten.

## Preview-PIN ändern

1. Neuen PIN lokal hashen: `printf %s 'NEUER_PIN' | sha256sum`
2. Den Hash in `src/config/site.ts` unter `previewPinHash` ersetzen oder beim Build als `PUBLIC_PREVIEW_PIN_HASH` setzen.

Der Klartext-PIN wird weder gespeichert noch verglichen. Der Hash ist im statischen Build zwangsläufig öffentlich einsehbar.

## Preview-Modus deaktivieren

In `src/config/site.ts` setzen:

```ts
previewMode: false
```

Dadurch verschwinden PIN-Gate und `noindex`; `robots.txt` erlaubt dann das Crawling. Vorher müssen offene Pflichtangaben und Inhalte geprüft werden.

## GitHub Pages

`.github/workflows/deploy-pages.yml` baut bei jedem Push auf `main`, erkennt den Repository-Unterpfad automatisch und deployt über die offiziellen Pages-Actions. In den Repository-Einstellungen muss als Pages-Quelle **GitHub Actions** gewählt sein.

## Custom Domain

Für `rybinskyi-bauxpert.de` später in GitHub Pages die Custom Domain eintragen, die von GitHub genannten DNS-Einträge beim DNS-Anbieter setzen und HTTPS aktivieren. Danach `PUBLIC_SITE_URL=https://rybinskyi-bauxpert.de` verwenden beziehungsweise auf der Domain ohne Project-Pages-Unterpfad bauen. Es wurden bewusst noch keine DNS-Änderungen vorgenommen.

## Datenschutz

Keine Analytics, externen Fonts, Karten, Videos, Formulardienste oder Tracking-Cookies. Der Anfrage-Builder erzeugt lokal einen `wa.me`- oder `mailto:`-Link. Die Datenschutzerklärung muss beim Wechsel des Hosters beziehungsweise auf die Hauptdomain nochmals an die reale Infrastruktur angepasst werden.
