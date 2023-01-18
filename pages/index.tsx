// pages/drafts.tsx

import React from 'react';
import { GetServerSideProps } from 'next';
import { useSession, getSession } from 'next-auth/react';
import Layout from '../components/Layout';
import Collection, { CollectionProps } from '../components/Collections';
import MainFloorCard, { MainFloorProps } from '../components/FloorCard'
import prisma from '../lib/prisma';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  // const session = await getSession({ req });
  // if (!session) {
  //   res.statusCode = 403;
  //   return { props: { drafts: [] } };
  // }

  const collections = await prisma.$queryRaw`select c.id, c."name" , c.image as imageurl, fp.price, p.predictions::float as predictions
  from public."floorPrices" fp 
  inner join (select max("date") date, collection_id from public."floorPrices" group by collection_id) fp2 on fp."date" = fp2."date" and fp.collection_id = fp2.collection_id 
  inner join public.project c 
      on fp.collection_id = c.id
  inner join (select count(id) as predictions, slug from public.predict group by slug) p on c.slug = p.slug
  order by c.id desc`

  return {
    props: { collections },
  };
};

type Props = {
  collections: MainFloorProps[];
};

const Collections: React.FC<Props> = (props) => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Layout>
          <div className="page">
            <main>
            <h1>Super Forecaster</h1>
            <p>
              The climate of the NFT market is always changing, with floor prices fluctuating on a daily basis. Can you guess where the floor will be tomorrow? or 7 days from now? 
            </p>
            <p>
              Login with Twitter, and check out the collections currently supported. Make a prediction and see if you can become a Super Forecaster!
            </p>
            <p>
              Your prediction will be tweeted out by <a href="https://twitter.com/Super4caster">@Super4caster</a> as well as the outcome!
            </p>
            {props.collections.map((collection) => (
            <div key={collection.id} className="collection">
              <MainFloorCard collection={collection} />
            </div>
          ))}
            </main>
            
          </div>
          
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page">
        <h1>Super Forecaster</h1>
        <p>
          Make a prediction and <a href="https://twitter.com/Super4caster">@Super4caster</a> will remember and tweet the outcome!
        </p>
        
        <h1>Collections</h1>
        <main>
          {props.collections.map((collection) => (
            <div key={collection.id} className="collection">
              <MainFloorCard collection={collection} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        
        .post {
          background: var(--geist-background);
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

export default Collections;
