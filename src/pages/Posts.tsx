import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { Post } from "../types/post";
import PostCard from "../Components/PostCard";

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(
        "https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts",
      );
      const data = await res.json();
      setPosts(data.posts);
      setLoading(false);
    };
    fetcher();
  }, []);

  if (loading) {
    return <p>読み込み中...</p>;
  }

  return (
    <>
      <div>
        {posts.map((post) => (
          <Link key={post.id} to={`/posts/${post.id}`}>
            <PostCard post={post} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default Posts;
