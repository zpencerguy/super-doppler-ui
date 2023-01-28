import React from "react"
import { GetStaticProps, GetServerSideProps } from "next"
import { useSession, getSession } from 'next-auth/react';
import Layout from "../components/Layout"
import Post, { PostProps } from "../components/Post";
import Prediction, { PredictionProps } from '../components/Predictions';
import Stats, {StatsProps} from '../components/AggregateStats';
import prisma from '../lib/prisma';


export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { drafts: [] } };
  }

  const predictions = await prisma.$queryRaw`select a.id, a."name" , a.image as imageurl, p.direction, p.duration, p.start_price, p.end_price, p.date
  from public.project a 
  inner join public.predict p 
      on a.slug = p.slug
  inner join public."User" u 
      on p.user_id = u.id
  where p.status = 'active' 
  order by p.date desc`;

const aggregations = await prisma.$queryRaw`select count(p.id)::numeric prediction_count, sum(case when status = 'correct' then 1 else 0 end)::numeric as correct_predictions,
sum(case when status = 'incorrect' then 1 else 0 end)::numeric as incorrect_predictions, sum(case when status = 'active' then 1 else 0 end)::numeric as active_predictions
from public.predict p 
inner join public."User" u 
    on p.user_id = u.id `;

  return {
    props: { predictions: JSON.parse(JSON.stringify(predictions)), aggregations: JSON.parse(JSON.stringify(aggregations))  },
  };
};

type Props = {
  predictions: PredictionProps[];
  aggregations: StatsProps[];
};

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>Collection Predictions</h1>
        <main>
        {props.aggregations.map((aggregations) => (
            <div key="stats">
              <Stats stats={aggregations}/>
            </div>
          ))}
        {props.predictions.map((prediction) => (
            <div key={prediction.id} className="post">
              <Prediction collection={prediction} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  )
}

export default Blog
