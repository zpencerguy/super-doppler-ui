// pages/api/post/index.ts

import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';


// PREDICT /api/post
// Required fields in body: date, collectionId, userId, direction, duration, threshold, start_price, end_price, status
// Optional fields in body: 
export default async function handle(req, res) {
  const { collectionId, userId, direction, duration, threshold} = req.body;

  const session = await getSession({ req });
  const result = await prisma.predictions.create({
    data: {
        collection_id: collectionId,
        userId: userId,
        direction: direction,
        duration: duration,
        threshold: threshold
    }
  });
  res.json(result);
}

