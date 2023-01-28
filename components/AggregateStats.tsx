import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { parseISO, format } from 'date-fns';
import { stringify } from "querystring";

export type StatsProps = {
  prediction_count: Number;
  correct_predictions: Number;
  incorrect_predictions: Number;
  active_predictions: Number;
};

const Stats: React.FC<{ stats: StatsProps }> = ({ stats }) => {
  return (
    <div>
      <h4>Total: {stats.prediction_count}</h4>
      <h4>Correct: {stats.correct_predictions}</h4>
      <h4>Incorrect: {stats.incorrect_predictions}</h4>
      <h4>Active: {stats.active_predictions}</h4>
      <br></br>
      <style jsx>{`
        h4 {
          display: inline;
          padding: 2rem;
          margin-bottom: 50px;
        }
      `}</style>
      <br></br>
    </div>
    
  );
};

export default Stats;
