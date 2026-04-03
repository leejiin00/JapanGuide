import type { NextConfig } from "next";

const securityHeaders = [
  // Empêche le site d'être chargé dans une iframe (clickjacking)
  { key: "X-Frame-Options", value: "DENY" },
  // Empêche le navigateur de deviner le type MIME des fichiers
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Force HTTPS pour toutes les connexions futures (1 an)
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
  // Contrôle les informations envoyées dans le header Referer
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Restreint l'accès aux fonctionnalités sensibles du navigateur
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Applique les headers de sécurité sur toutes les routes
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
