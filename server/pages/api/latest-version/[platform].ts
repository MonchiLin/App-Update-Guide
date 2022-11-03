// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from "../../../lib/prisma";
import { LastestVersion } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const platform = (req.query["platform"] as string).toLowerCase();
  if (req.method === "DELETE") {
    try {
      await prisma.lastestVersion.delete({
        where: {
          platform: platform
        }
      });
      res.status(200).end();
    } catch (e) {
      res.status(400).end(e);
    }
  } else if (req.method === "PUT") {
    try {
      const body: LastestVersion = JSON.parse(req.body);
      if (!body.hostingVersion) {
        return res.status(400).end("hostingVersion is required");
      }
      if (!body.hotUpdateVersion) {
        return res.status(400).end("hotUpdateVersion is required");
      }
      body.platform = platform;
      const result = await prisma.lastestVersion.upsert({
        where: {
          platform
        },
        update: body,
        create: body
      });
      res.status(200).json(result);
    } catch (e) {
      res.status(400).end(e);
    }
  } else if (req.method === "GET") {
    try {
      const result = await prisma.lastestVersion.findFirst({
        where: {
          platform
        },
      });
      res.status(200).json(result);
    } catch (e) {
      res.status(400).end(e);
    }
  }

}
