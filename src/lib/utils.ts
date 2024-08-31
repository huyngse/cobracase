import { type ClassValue, clsx } from "clsx"
import { Metadata } from "next";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatPrice = (price: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return formatter.format(price);
}

export function constructMetadata({
  title = "CaseCobra - Custom high-quality phone cases",
  description = "Create custom high-quality phone cases in seconds",
  image = "/thumbnail.png",
  icon = "/icon.ico"
}: {
  title?: string,
  description?: string,
  image?: string,
  icon?: string,
} = {}): Metadata {
  return {
    metadataBase: new URL('https://cobracase-5oop.vercel.app/'),
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: image }]
    },
    icons: icon,
  }
}