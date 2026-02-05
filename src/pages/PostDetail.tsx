import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { Post } from "../types/post";
import formatDate from "../utils/date";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(
        `https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`,
      );
      const data = await res.json();
      setPost(data.post);
    };
    fetcher();
  }, [id]);

  if (!post) {
    return <div>読み込み中...</div>;
  }

  return (
    <article className="flex flex-col gap-4">
      <img src={post.thumbnailUrl} alt={post.title} className="w-full h-auto" />
      <div className="flex justify-between items-center">
        <time dateTime={post.createdAt} className="text-gray-400">
          {formatDate(post.createdAt)}
        </time>
        <div className="text-sm flex gap-2">
          {post.categories.map((category) => (
            <span
              key={category}
              className="border border-blue-500 text-blue-500 px-2 py-0.5 rounded"
            >
              {category}
            </span>
          ))}
        </div>
      </div>
      <h2 className="text-2xl">{post.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
    </article>
  );
};

export default PostDetail;
