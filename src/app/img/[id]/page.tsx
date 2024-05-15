export default function ImgModal({
  params: { id: imgId },
}: {
  params: { id: string };
}) {
  return <div>{imgId}</div>;
}
