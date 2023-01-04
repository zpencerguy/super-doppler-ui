// pages/api/post/index.ts

import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';


// PREDICT /api/post
// Required fields in body: date, collectionId, userId, direction, duration, threshold, start_price, end_price, status
// Optional fields in body: 
export default async function handle(req, res) {
  const { collection_slug, direction, duration, threshold} = req.body;

  const prices = await prisma.$queryRaw`
  select price 
  from public."floorPrices" fp 
  inner join public.collections c on fp.collection_id = c.id 
  where slug = ${collection_slug} 
  order by date 
  desc limit 1`

  console.log(prices)

  const price = prices[0]['price']
  console.log(price)

  let end_price: number = 0;

  if (direction == 'up') 
  {
      end_price = price * (1 + threshold);
  } 
  else if (direction == 'down')
  {
    end_price = price * (1 - threshold);
  }

  console.log(end_price)

  const session = await getSession({ req });
  const result = await prisma.predictions.create({
    data: {
        direction: direction,
        duration: duration,
        threshold: threshold,
        startPrice: price,
        endPrice: end_price,
        user: { connect: { email: session?.user?.email } },
        collection: { connect: {slug: collection_slug}},
        status: 'active'
    },
    include: {
      collection: true
    }
  });
  res.json(result);
}

// id           Int         @id @default(autoincrement())
// date         DateTime    @default(now())
// collection   collections @relation(fields: [collectionId], references: [id])
// collectionId Int         @map(name: "collection_id")
// user         User        @relation(fields: [userId], references: [id])
// userId       String      @map(name: "user_id")
// direction    String
// duration     String
// threshold    Float
// startPrice   Float       @map(name: "start_price")
// endPrice     Float       @map(name: "end_price")
// status       String
