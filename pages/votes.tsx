import React from "react"
import { GetStaticProps, GetServerSideProps } from "next"
import { useSession, getSession } from 'next-auth/react';
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../components/Layout"
import Post, { PostProps } from "../components/Post"
import CollectionCard, { CollectionProps } from '../components/CollectionCard';
// import CollectionProps, { PredictionProps } from '../components/Predictions'
import GridList from "@material-ui/core/GridList";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography
} from "@material-ui/core";
import prisma from '../lib/prisma';
import Predictions from "./mypredictions";


// export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
//   const session = await getSession({ req });
//   if (!session) {
//     res.statusCode = 403;
//     return { props: { drafts: [] } };
//   }

//   const predictions = await prisma.$queryRaw`select a.id, a."name" , a.image as imageurl, p.direction, p.start_price, p.end_price, p.date
//   from public.project a 
//   inner join public.predict p 
//       on a.slug = p.slug
//   inner join public."User" u 
//       on p.user_id = u.id
//   where p.status = 'active' 
//   order by p.date desc`;

//   return {
//     props: { predictions: JSON.parse(JSON.stringify(predictions)) },
//   };
// };


// type Props = {
//   predictions: PredictionProps[];
// };

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { drafts: [] } };
  }

  const collections = await prisma.$queryRaw`select c.id, c."name" , c.image as imageurl, fp.price
  from public."floorPrices" fp 
  inner join (select max("date") date, collection_id from public."floorPrices" group by collection_id) fp2 on fp."date" = fp2."date" and fp.collection_id = fp2.collection_id 
  inner join public.project c 
      on fp.collection_id = c.id order by c.id desc`

  return {
    props: { collections },
  };
};

type Props = {
  collections: CollectionProps[];
};

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
      width: "50ch"
    }
  },
  gridList: {
    width: "100%",
    height: "auto"
  },
  card: {
    maxWidth: 90,
    height: "75%"
  }
}));

const tileData = [
  {
    img:
      "https://images-na.ssl-images-amazon.com/images/I/71qmF0FHj7L._AC_SX679_.jpg",
    title: "title"
  },
  {
    img:
      "https://images-na.ssl-images-amazon.com/images/I/71qmF0FHj7L._AC_SX679_.jpg",
    title: "title"
  },
  {
    img:
      "https://images-na.ssl-images-amazon.com/images/I/71qmF0FHj7L._AC_SX679_.jpg",
    title: "title"
  },
  {
    img:
      "https://images-na.ssl-images-amazon.com/images/I/71qmF0FHj7L._AC_SX679_.jpg",
    title: "title"
  },
  
];


const Votes: React.FC<Props> = (props) => {
  const classes = useStyles();
  return (
    <Layout>
      <div className="page">
        <h1>DAO Votes</h1>
        <main>
        <GridList cellHeight={"auto"} className={classes.gridList}>
        {props.collections.map((collection) => (
          <CollectionCard collection={collection}></CollectionCard>
          // <Card className={classes.card}>
          //   <CardActionArea>
          //     <CardMedia
          //       component="img"
          //       alt="Contemplative Reptile"
          //       height="160"
          //       image={"" + prediction.imageurl}
          //       title="Contemplative Reptile"
          //     />
          //     <CardContent>
          //       <Typography gutterBottom variant="body2" component="h2" noWrap>
          //         {prediction.direction} from {prediction.start_price} to {prediction.end_price}
          //       </Typography>
          //     </CardContent>
          //   </CardActionArea>
          // </Card>
        ))}
      </GridList>

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

export default Votes

