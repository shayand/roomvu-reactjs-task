import axios from "axios";
import {useEffect, useState} from "react";

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import type Post from '@/type/post.type';
import PostInflator from '@/views/pages/PostInflator';

const Index = () => {
  const [postList, setPostList] = useState<Post[]>([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts').then((response) => {
      response.data.forEach((single: any) => {
        const singlePost: Post = {
          id: single.id,
          userId: single.userId,
          title: single.title,
          body: single.body,
        };
       setPostList(post => { return [...post,singlePost]});
      });
    });
  }, []);

  return (
    <Main
      meta={
        <Meta
          title="Shayan Davarzani's roomvue Task"
          description="Roomvu frontend task for fullstack developer"
        />
      }
    >
      <ul>
      {postList.reverse().map((singlePost: Post) => (
        <PostInflator singlePost={singlePost} />
      ))}
      </ul>
    </Main>
  );
};

export default Index;
