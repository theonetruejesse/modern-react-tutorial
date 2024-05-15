import "server-only";
import { db } from "./db";
import { userAuth } from "./wrappers";

export const getMyImages = userAuth(async (authContext) => {
  const { userId } = authContext;

  return await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.createdAt),
    where: (model, { eq }) => eq(model.userId, userId),
  });
});
