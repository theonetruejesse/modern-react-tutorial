import { getMyImage } from "~/server/queries";
import { Modal } from "./modal";

export default async function ImgModal({
  params: { id: imgId },
}: {
  params: { id: string };
}) {
  const numImgId = Number(imgId);
  if (isNaN(numImgId)) throw new Error("Invalid image id");

  const image = await getMyImage(numImgId);

  return (
    <Modal>
      <img src={image.url} className="w-48" />
    </Modal>
  );
}
