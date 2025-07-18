# Example for fetching data on the server

```tsx
import Footer from "@/components/Footer";
import { getData } from "@instincthub/react-ui/lib";
import { notFound } from "next/navigation";
import BlogDetailRequest from "@/components/blog/BlogDetailRequest";
import { BlogItem } from "@/components/blog/types";
import { auth } from "@/app/api/auth/[...nextauth]/auth";
import {
  SessionUserNameType,
  SessionUserType,
} from "@instincthub/react-ui/types";
import LandingNavResponsive from "@/components/navbar/LandingNavResponsive";

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

const BlogDetailPage = async ({ params }: BlogDetailPageProps) => {
  const session = await auth();
  const user = session?.user as SessionUserType;
  const userData = user?.name as SessionUserNameType;

  const { slug } = (await params) as { slug: string };
  const objects: BlogItem = await getData({
    path: `posts/skills/post/${slug}/`,
  });

  if (objects?.detail === "Not found.") return notFound();

  return (
    <>
      <section className="compulsory">
        <LandingNavResponsive />
        <BlogDetailRequest data={objects} userData={userData} />
        <Footer />
      </section>
    </>
  );
};

export default BlogDetailPage;
```