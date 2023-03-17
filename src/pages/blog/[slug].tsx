import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import { useEffect, useState } from 'react';
import axios from 'axios';
import type Post from '@/type/post.type';

type IBlogUrl = {
  slug: string;
};

export const getStaticPaths: GetStaticPaths<IBlogUrl> = async () => {
  return {
    paths: [...Array(10)].map((_, index) => ({
      params: { slug: `blog-${index}` },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<IBlogUrl, IBlogUrl> = async ({
  params,
}) => {
  return {
    props: {
      slug: params!.slug,
    },
  };
};

const Blog = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [post, setPost] = useState<Post>();

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/` + props.slug.replace('blog-',''))
      .then((response) => {
        const singlePost: Post = {
          id: response.data.id,
          userId: response.data.userId,
          title: response.data.title,
          body: response.data.body,
        };
        setPost(singlePost);
      });
  }, []);

  return (
    <Main meta={<Meta title={props.slug} description="Lorem ipsum" />}>
      <h1 className="capitalize">{props.slug}</h1>
      <p>
        {post?.body}
      </p>
    </Main>
  );
};

export default Blog;
