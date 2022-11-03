// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from "../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const platform = req.query["hot-update-id"] as string;
  const hostingVersion = req.query["hosting-version"] as string;

  const data = await prisma.hotUpdate.findFirst({
    where: {
      platform: platform.toLowerCase(),
      hostingVersion
    }
  });

  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).end();
  }
}
