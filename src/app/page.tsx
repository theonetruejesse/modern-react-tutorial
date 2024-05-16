import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Dialog, DialogTrigger } from "~/components/ui/dialog";
import { OpenModal } from "~/components/ui/modal";
import { getMyImages } from "~/server/queries";

export const dynamic = "force-dynamic";

const Images = async () => {
  const images = await getMyImages();
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {images.map((image) => (
        <OpenModal url={`/img/${image.id}`}>
          <div key={image.id} className="w-48">
            <Image src={image.url} alt={image.name} width={200} height={200} />
            {image.name}
          </div>
        </OpenModal>
      ))}
    </div>
  );
};

export default async function HomePage() {
  return (
    <main className="">
      <SignedOut>
        <p className="text-center">Please sign in to view images</p>
      </SignedOut>

      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
}
