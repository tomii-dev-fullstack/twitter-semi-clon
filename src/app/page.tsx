"use client"; // Necesario en archivos que usan useState / useEffect

import { useEffect, useState } from "react";
import TweetCard from "../components/tweet";
import PostBox from "@/components/post_box";
import Sidebar from "@/components/side_bar";

export default function Home() {
  const [posts, setPosts] = useState<{ id: number; body: string; title: string }[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      {/* Botón para abrir el sidebar */}
      <button
        type="button"
        className="fixed top-5 left-5 bg-black text-white p-2 rounded-full"
        onClick={() => setOpen(true)}
      >
        Abrir
      </button>

      {/* Sidebar */}
      <Sidebar setOpen={setOpen} open={open} />

      {/* Contenido principal */}
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="flex flex-col items-center space-y-4 max-w-3xl pb-20 border-l-1 border-r-1">
          <div className="flex border-b border-b-1 w-full text-center  justify-center items-center bg-black">
            <div className="w-full border-r-1 py-5">
              <span>Para vos</span>
            </div>
            <div className="w-full">

              <span>Siguiendo</span>
            </div>
          </div>
          <PostBox />
          {posts.map((post) => (
            <TweetCard
              key={post.id}
              title={post.title}
              username={`Usuario ${post.id}`}
              body={post.body}
              avatar="https://via.placeholder.com/50"
            />
          ))}
        </div>
      </div>
    </>
  );
}
