// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from "../../lib/prisma";
import { Update } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const body: Update = JSON.parse(req.body);
    if (!body.hostingVersion) {
      return res.status(400).end("hostingVersion is required");
    }
    if (!body.platform) {
      return res.status(400).end("platform is required");
    }
    if (!body.hotUpdateVersion) {
      return res.status(400).end("hotUpdateVersion is required");
    }
    if (!body.latestVersion) {
      return res.status(400).end("latestVersion is required");
    }
    const item = await prisma.update.findFirst({
      where: {
        hostingVersion: body.hostingVersion,
        platform: body.platform,
      }
    });

    let result: Update | null = null;
    if (item) {
      try {
        result = await prisma.update.update({
          where: {
            id: item.id
          },
          data: body
        });
      } catch (e) {
        res.status(400).end(e);
      }
    } else {
      try {
        result = await prisma.update.create({
          data: body
        });
      } catch (e) {
        res.status(400).end(e);
      }
    }

    res.status(200).json(result!);
  } else if (req.method === "GET") {
    const data = await prisma.update.findMany();
    res.status(200).json(data);
  }
}
