import React from "react"
import { GetStaticProps, GetServerSideProps } from "next"
import { useSession, getSession } from 'next-auth/react';
import Layout from "../components/Layout"
import Post, { PostProps } from "../components/Post"
import Prediction, { PredictionProps } from '../components/Predictions';
import prisma from '../lib/prisma';


// index.tsx
// export const getStaticProps: GetStaticProps = async () => {
//   const feed = await prisma.post.findMany({
//     where: { published: true },
//     include: {
//       author: {
//         select: { name: true },
//       },
//     },
//   });
//   return {
//     props: { feed },
//     revalidate: 10,
//   };
// };


// type Props = {
//   feed: PostProps[]
// }

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { drafts: [] } };
  }

  const predictions = await prisma.$queryRaw`select c.id, c."name" , c.image_url as imageurl, p.direction, p.start_price, p.end_price, p.date
  from public.collection c 
  inner join public.predictions p 
      on c.id = p.collection_id
  inner join public."User" u 
      on p.user_id = u.id
  where p.status = 'active' 
  order by p.date desc`;

  return {
    props: { predictions: JSON.parse(JSON.stringify(predictions)) },
  };
};

type Props = {
  predictions: PredictionProps[];
};

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>Collection Predictions</h1>
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
  )
}

export default Blog
