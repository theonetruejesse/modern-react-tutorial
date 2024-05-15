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

export const getMyImage = userAuth(async (authContext, imgId: number) => {
  const { userId } = authContext;
  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, imgId),
  });

  if (!image) throw new Error("Image not found");
  if (image.userId !== userId) throw new Error("Unauthorized");

  return image;
});
