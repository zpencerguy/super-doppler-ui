import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { parseISO, format } from 'date-fns';
import { stringify } from "querystring";

export type PredictionProps = {
  id: string;
  name: string;
  imageurl: string;
  direction: string;
  start_price: Number;
  end_price: Number;
  date: Date;
};

const Prediction: React.FC<{ collection: PredictionProps }> = ({ collection }) => {
  const name = collection.name;
  //const date = collection.date.toLocaleString();

  const date = new Date(collection.date.toLocaleString());
  console.log(date)

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  const myFormattedDate = day+"-"+(monthIndex+1)+"-"+year+" "+ hours+":"+minutes+":"+seconds;

  return (
    <div>
      <h2>{collection.name}</h2>
      <h4>Predicted direction: {collection.direction.toUpperCase()}</h4>
      <h4>Starting price: {collection.start_price} SOL</h4>
      <h4>Predicted price: {collection.end_price} SOL</h4>
      <h4>Prediction made on: { myFormattedDate }</h4>
      <img
        className="rounded-lg"
        src={collection.imageurl}
        width="100px"
        height="100px"
        // placeholder="blur"
        // blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
      />
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Prediction;
