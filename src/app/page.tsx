import { SignedIn, SignedOut } from "@clerk/nextjs";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

const Images = async () => {
  const images = await db.query.images.findMany();
  return (
    <div className="flex flex-wrap gap-4">
      {images.map((image, index) => (
        <div key={image.id + "-" + index} className="w-48">
          <img src={image.url} />
          {image.name}
        </div>
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
