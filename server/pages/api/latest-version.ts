// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from "../../lib/prisma";
import { LastestVersion } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const body: LastestVersion = JSON.parse(req.body);
    if (!body.hostingVersion) {
      return res.status(400).end("hostingVersion is required");
    }
    if (!body.platform) {
      return res.status(400).end("platform is required");
    }
    if (!body.hotUpdateVersion) {
      return res.status(400).end("hotUpdateVersion is required");
    }

    const result = prisma.lastestVersion.upsert({
      where: {
        platform: body.platform
      },
      create: body,
      update: body
    });
    res.status(200).json(result);
  } else if (req.method === "POST") {
    const body: LastestVersion = JSON.parse(req.body);
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
    const result = prisma.lastestVersion.create({ data: body, });
    res.status(200).json(result);
  } else if (req.method === "GET") {
    const data = await prisma.lastestVersion.findMany();
    const platforms = ["android", "ios"];
    const result = platforms.reduce((p, k) => {
      const v = data.find(i => i.platform.toLowerCase() === k.toLowerCase()) || null;
      return { ...p, [k]: v };
    }, {} as Record<string, LastestVersion | null>);
    res.status(200).json(result);
  }
}
