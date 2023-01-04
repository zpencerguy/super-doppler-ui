// pages/drafts.tsx

import React from 'react';
import { GetServerSideProps } from 'next';
import { useSession, getSession } from 'next-auth/react';
import Layout from '../components/Layout';
import Collection, { CollectionProps } from '../components/Collections';
import MainFloorCard, { MainFloorProps } from '../components/FloorCard'
import prisma from '../lib/prisma';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { drafts: [] } };
  }

  const collections = await prisma.$queryRaw`select c.id, c."name" , c.image_url as imageurl, fp.price
  from public."floorPrices" fp 
  inner join (select max("date") date, collection_id from public."floorPrices" group by collection_id) fp2 on fp."date" = fp2."date" and fp.collection_id = fp2.collection_id 
  inner join public.collections c 
      on fp.collection_id = c.id`

  const collections_ = await prisma.collections.findMany({
    select: {
      id: true,
      name: true,
      imageUrl: true
    },
  });
  return {
    props: { collections },
  };
};

type Props = {
  collections: CollectionProps[];
};

const Collections: React.FC<Props> = (props) => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Layout>
        <h1>Collections</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page">
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
