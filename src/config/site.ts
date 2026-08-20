export const siteConfig = {
  name: "Rybinskyi BauXpert",
  owner: "Denys Rybinskyi",
  claim: "Montieren. Ausbauen. Renovieren.",
  description:
    "Küchenmontage, Möbelmontage, Innenausbau, Böden und Renovierung in München und Umgebung – direkt per Telefon, WhatsApp oder E-Mail anfragen.",
  productionUrl: "https://rybinskyi-bauxpert.de",
  githubOwner: "rybinskyi-bauxpert-de",
  repositoryName: "rybinskyi-bauxpert-website",
  previewMode: true,
  previewPinHash:
    import.meta.env.PUBLIC_PREVIEW_PIN_HASH ??
    "08103202cf42e3a6f06ead35f9a9bf11a077d0eff1e8170ce73f0f5f19ded4f7",
  phoneDisplay: "+49 178 693 0465",
  phoneHref: "+491786930465",
  whatsappNumber: "491786930465",
  email: "info@rybinskyi-bauxpert.de",
  address: {
    street: "Pfälzer-Wald-Straße 2",
    postalCode: "81539",
    city: "München",
    country: "DE",
  },
  areas: [
    "Schwabing",
    "Bogenhausen",
    "Haidhausen",
    "Maxvorstadt",
    "Sendling",
    "Pasing",
    "Neuhausen",
    "Giesing",
  ],
  whatsappText:
    "Hallo, ich möchte ein Montage- oder Ausbauprojekt in München besprechen.",
} as const;

export const navigation = [
  { label: "Leistungen", href: "/leistungen/" },
  { label: "Referenzen", href: "/projekte/" },
  { label: "München", href: "/muenchen/" },
  { label: "Betrieb", href: "/ueber-mich/" },
  { label: "Kontakt", href: "/kontakt/" },
] as const;
