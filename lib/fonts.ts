import { Shippori_Mincho, Zen_Kaku_Gothic_New } from "next/font/google";

export const mincho = Shippori_Mincho({
  weight: ["500", "600"],
  subsets: ["latin"],
  variable: "--font-mincho",
  display: "swap",
});

export const gothic = Zen_Kaku_Gothic_New({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-gothic",
  display: "swap",
});
