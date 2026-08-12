export const siteConfig = {
  name: "Rybinskyi BauXpert",
  owner: "Denys Rybinskyi",
  claim: "Bauen. Sanieren. Leben.",
  description:
    "Renovierung, Sanierung, Innenausbau und Montage in München und Umgebung – mit echten Projektbeispielen und direktem Kontakt.",
  productionUrl: "https://rybinskyi-bauxpert.de",
  githubOwner: "itmitalles",
  repositoryName: "rybinskyi-bauxpert-website",
  previewMode: true,
  previewPinHash:
    import.meta.env.PUBLIC_PREVIEW_PIN_HASH ??
    "08103202cf42e3a6f06ead35f9a9bf11a077d0eff1e8170ce73f0f5f19ded4f7",
  phoneDisplay: "+49 178 693 0465",
  phoneHref: "+491786930465",
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
    "Hallo, ich interessiere mich für eine Renovierung/Sanierung in München und würde gerne kurz mein Projekt besprechen.",
} as const;

export const navigation = [
  { label: "Leistungen", href: "/leistungen/" },
  { label: "Projekte", href: "/projekte/" },
  { label: "München", href: "/muenchen/" },
  { label: "Über uns", href: "/ueber-uns/" },
  { label: "Kontakt", href: "/kontakt/" },
] as const;
