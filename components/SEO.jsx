import React from "react";
import { NextSeo } from "next-seo";

function SEO() {
  return (
    <NextSeo
      title="NFT Finder"
      description="This app allows you to see what NFT influencers are holding in their wallets (their collections and data about them like floor_price, market_cap, etc.)."
      canonical="https://nft-finder.vercel.app/"
      openGraph={{
        url: "https://nft-finder.vercel.app/",
        title: "NFT Finder",
        description:
          "This app allows you to see what NFT influencers are holding in their wallets (their collections and data about them like floor_price, market_cap, etc.).",
        keywords:
          "nft finder, nft, nft influencers, influencers, find nft influencers, nft collections, nft influencers collections, dapp, opensea influencers, opensea collections",
        images: [
          {
            url: "https://nft-finder.vercel.app/nfts.png",
            width: 1280,
            height: 1280,
            alt: "NFT banner",
            type: "image/png",
          },
          {
            url: "https://nft-finder.vercel.app/favicon.png",
            width: 32,
            height: 32,
            alt: "NFT Finder Favicon",
            type: "image/png",
          },
          {
            url: "https://nft-finder.vercel.app/ethereum-gold.svg",
            width: 32,
            height: 32,
            alt: "Ethereum Crypto Logo",
            type: "image/svg",
          },
          {
            url: "https://nft-finder.vercel.app/vercel.svg",
            width: 32,
            height: 32,
            alt: "Vercel Logo",
            type: "image/svg",
          },
        ],
        site_name: "NFT Finder",
      }}
      twitter={{
        site: "@costin_official",
        cardType: "summary_large_image",
      }}
      additionalMetaTags={[
        {
          property: "dc:creator",
          name: "dc:creator",
          content: "Costin Gheorghe",
        },
        {
          property: "application-name",
          httpEquiv: "application-name",
          content: "NFT Finder",
        },
      ]}
    />
  );
}

export default SEO;
