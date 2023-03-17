import Link from 'next/link';

const PostInflator = (props: any) => {
  const calculateDate = (id: number) => {
    const current = 100 - id;
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - current);
    return currentDate.toISOString().replace('Z','').replace('T',' ');
  };
  return (
    <section>
      <h6>
        <Link
          className="font-bold text-pink-500"
          href={`/blog/blog-${props.singlePost.id}`}
        >
          {props.singlePost.title}
        </Link>
      </h6>
      <p>
        <span>{calculateDate(props.singlePost.id)}</span>
        <br />
        {props.singlePost.body.substring(0, 20)}
      </p>
    </section>
  );
};

export default PostInflator;
