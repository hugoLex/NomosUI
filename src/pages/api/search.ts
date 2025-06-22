import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { q, page } = req.query;
  const query = String(q);
  const pageNumber = String(page);
}
