// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from "../../../lib/prisma";
import type Prisma from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Prisma.HotUpdate | null>
) {
  const id = Number(req.query["hot-update-id"]);
  if (req.method === "DELETE") {
    try {
      await prisma.hotUpdate.delete({
        where: {
          id: id
        }
      })
      res.status(200).end();
    } catch (e) {
      res.status(400).end(e);
    }
  }

}
