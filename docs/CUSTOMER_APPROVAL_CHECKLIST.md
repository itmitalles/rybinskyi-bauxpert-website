# Customer approval checklist

Status: 2026-08-20. Every item below is a live-release blocker until Denys has confirmed it in writing. Current values are preview working data, not documented customer approvals.

| Zu bestätigen | Aktueller Preview-Stand | Bestätigt | Datum / Nachweis | Offene Frage |
| --- | --- | --- | --- | --- |
| Firmenname | Rybinskyi BauXpert | nein | — | Ist dies der vollständige rechtliche bzw. geschäftliche Name? |
| Inhaber | Denys Rybinskyi | nein | — | Ist Denys der rechtlich verantwortliche Anbieter/Inhaber? |
| Anschrift | Pfälzer-Wald-Straße 2, 81539 München | nein | — | Ist dies die ladungsfähige Geschäftsanschrift? |
| Telefonnummer | +49 178 693 0465 | nein | — | Darf die Nummer öffentlich für Anrufe verwendet werden? |
| E-Mail-Adresse | info@rybinskyi-bauxpert.de | nein | — | Existiert das Postfach und wird es betreut? |
| WhatsApp | +49 178 693 0465 | nein | — | Ist geschäftliche WhatsApp-Nutzung unter dieser Nummer gewünscht und datenschutzrechtlich organisiert? |
| Kleinunternehmerstatus oder Umsatzsteuer-ID | keine Angabe im sichtbaren Impressum | nein | — | Welche steuerliche Angabe ist tatsächlich erforderlich und korrekt? |
| Berufsbezeichnung | keine Angabe | nein | — | Gibt es eine rechtlich relevante Berufsbezeichnung? |
| Kammer oder Eintragung, falls zutreffend | keine Angabe | nein | — | Bestehen Handwerksrolle, Kammerzugehörigkeit oder sonstige Registerangaben? |
| Tatsächliche Leistungen | Küche, Möbel/Anpassung, Innenausbau, Böden, Renovierung, kleinere Projekte | nein | — | Welche Arbeiten werden tatsächlich selbst angeboten? Was muss gestrichen oder ergänzt werden? |
| Umgang mit Elektroarbeiten | keine pauschale Eigenleistung; Abgrenzung/Koordination mit geeignetem Fachbetrieb | nein | — | Welche erlaubten Handgriffe werden selbst ausgeführt, welche ausschließlich durch einen Fachbetrieb? |
| Umgang mit Sanitärarbeiten | keine pauschale Eigenleistung; Abgrenzung/Koordination mit geeignetem Fachbetrieb | nein | — | Welche erlaubten Handgriffe werden selbst ausgeführt, welche ausschließlich durch einen Fachbetrieb? |
| Servicegebiet | München und Umgebung; bisher acht Stadtteile genannt | nein | — | Welche Orte oder welcher Radius werden tatsächlich bedient? |
| Bildrechte | keine Projektgruppe freigegeben | nein | — | Welche exakten Dateien dürfen für Website, OG-Vorschau und Kundenkommunikation verwendet werden? |
| Biografie | nicht im öffentlichen Build | nein | — | Soll überhaupt eine Biografie erscheinen? Falls ja: exakten Text ausdrücklich bestätigen. |
| Finale Designfreigabe | eine Premium-basierte, bodenständige Fassung | nein | — | Layout, Texte, Farbwelt, Hero und Leistungsreihenfolge freigeben. |

## Release block

Until all applicable rows are confirmed:

- `previewMode` remains `true`.
- Every page remains `noindex,nofollow,noarchive` and `robots.txt` disallows crawling.
- No custom domain is configured or switched.
- No unconfirmed project photo or biography enters `dist`.
- The pull request remains a draft and must not be merged for a live release.
- The visible imprint contains no placeholder section; missing legal facts are managed here as a release blocker instead.

The machine-readable mirror is `config/release-approvals.json`. A status may be changed to `approved` only when the written evidence exists.
