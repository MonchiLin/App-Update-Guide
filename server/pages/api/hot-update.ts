// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from "../../lib/prisma";
import { HotUpdate } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const body: HotUpdate = JSON.parse(req.body);
    if (!body.hostingVersion) {
      return res.status(400).end("hostingVersion is required");
    }
    if (!body.platform) {
      return res.status(400).end("platform is required");
    }
    if (!body.hotUpdateVersion) {
      return res.status(400).end("hotUpdateVersion is required");
    }

    body.platform = body.platform.toLowerCase();
    const item = await prisma.hotUpdate.findFirst({
      where: {
        hostingVersion: body.hostingVersion,
        platform: body.platform,
      }
    });

    let result: HotUpdate | null = null;
    if (item) {
      try {
        result = await prisma.hotUpdate.update({
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
        result = await prisma.hotUpdate.create({
          data: body
        });
      } catch (e) {
        res.status(400).end(e);
      }
    }

    res.status(200).json(result!);
  } else if (req.method === "GET") {
    const data = await prisma.hotUpdate.findMany();
    res.status(200).json(data);
  }
}
