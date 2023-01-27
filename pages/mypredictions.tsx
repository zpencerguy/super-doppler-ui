// pages/drafts.tsx

import React from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { GetServerSideProps } from 'next';
import { useSession, getSession } from 'next-auth/react';
import Layout from '../components/Layout';
import Prediction, { PredictionProps } from '../components/Predictions';
import prisma from '../lib/prisma';

Router.events.on('routeChangeStart', () => NProgress.start()); 
Router.events.on('routeChangeComplete', () => NProgress.done()); 
Router.events.on('routeChangeError', () => NProgress.done());


export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { drafts: [] } };
  }

  const predictions = await prisma.$queryRaw`select a.id, a."name" , a.image as imageurl, p.direction, p.start_price, p.end_price, p.date
  from public.project a 
  inner join public.predict p 
      on a.slug = p.slug
  inner join public."User" u 
      on p.user_id = u.id
  where u.email = ${session.user.email} order by p.date desc`;

  return {
    props: { predictions: JSON.parse(JSON.stringify(predictions)) },
  };
};

type Props = {
  predictions: PredictionProps[];
};

const Predictions: React.FC<Props> = (props) => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Layout>
        <h1>My Predictions</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page">
        <h1>My Predictions</h1>
        <main>
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
  );
};

export default Predictions;
