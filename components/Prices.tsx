import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

export type PriceProps = {
    collectionId: string;
    collection: string;
    price: string
};

const Prices: React.FC<{ prices: PriceProps }> = ({ prices }) => {
  const name = prices.collection;
  //const price = collection.floorPrices;
  console.log(name);
  //console.log(price);
  return (
    <div>
      <h2>{prices.collection}</h2>
      <h3>{prices.price}</h3>
      
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Prices;
