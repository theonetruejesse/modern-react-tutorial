import { getMyImage } from "~/server/queries";
import { Modal } from "./modal";
import {
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "~/components/ui/dialog";
import { RouteChangeComplete } from "~/components/routeChangeComplete";

export default async function ImgModal({
  params: { id: imgId },
}: {
  params: { id: string };
}) {
  const numImgId = Number(imgId);
  if (isNaN(numImgId)) throw new Error("Invalid image id");

  const image = await getMyImage(numImgId);

  return (
    <RouteChangeComplete targetUrl={`/img/${imgId}`}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{image.name}</DialogTitle>
          <img src={image.url} className="w-48" />
          <DialogDescription>
            Created at: {image.createdAt.toString()}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </RouteChangeComplete>
  );
}
