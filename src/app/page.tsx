import { db } from "~/server/db";

export default async function HomePage() {
  const posts = await db.query.posts.findMany();

  console.log("bruh", posts);

  const mockUrls = [
    "https://utfs.io/f/dd238c5b-9c81-4ca7-a55c-c1c9bfde08eb-umtxnt.jpeg",
    "https://utfs.io/f/44fadc8b-716a-4a4b-a1eb-9bb144af9d67-wfz57m.png",
  ];
  const mockImages = mockUrls.map((url, index) => ({
    id: index + 1,
    url: url,
  }));

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {[...mockImages, ...mockImages, ...mockImages].map((image, index) => (
          <div key={image.id + "-" + index} className="w-48">
            <img src={image.url} />
          </div>
        ))}
      </div>
    </main>
  );
}
