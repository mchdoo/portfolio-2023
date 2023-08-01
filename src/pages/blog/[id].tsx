import Link from "next/link";

function PostPage() {
  return (
    <main className="text-center">
      <h2 className="font-migra text-4xl p-8">
        working on it.
      </h2>
      <Link href="/blog" className="group p-3 border border-fore rounded-full hover:ring-4 ring-accent-2 transition">
        <span className="group-hover:-translate-x-2 transition">&lt;- </span>
        Volver al blog
      </Link>
    </main>
  );
}

export default PostPage;
