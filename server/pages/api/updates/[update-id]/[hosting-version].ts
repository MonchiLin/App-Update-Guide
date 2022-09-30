// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from "../../../../lib/prisma";
import type Prisma from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Prisma.Update | null>
) {
  const platform = req.query["update-id"] as string;
  const hostingVersion = req.query["hosting-version"] as string;

  const data = await prisma.update.findFirst({
    where: {
      platform,
      hostingVersion
    }
  });

  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).end();
  }
}
