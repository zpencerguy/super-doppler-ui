// pages/api/post/index.ts

import { getSession } from 'next-auth/react';
import prisma from '../../lib/prisma';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { collection_slug } = req.body;
  const session = await getSession({ req });
  const result = await prisma.$queryRaw`select price from floorPrices fp inner join collections c on fp.collection_id = c.collection_id where c.slug = ${collection_slug} order by date desc limit 1`
  res.json(result);
}
