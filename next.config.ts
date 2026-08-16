import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fixa a raiz do projeto para o Turbopack não confundir com a pasta pai.
  turbopack: {
    root: __dirname,
  },
  outputFileTracingRoot: path.join(__dirname),

  // Em desenvolvimento o Next só serve os assets para "localhost".
  // Sem isso, abrir pelo IP da rede (celular no mesmo Wi-Fi) carrega o HTML
  // mas bloqueia o JavaScript. Vale só em `next dev`.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "172.*.*.*", "*.local"],
};

export default nextConfig;
