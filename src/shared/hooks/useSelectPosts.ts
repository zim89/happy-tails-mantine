import { useFindManyQuery, Post } from "../api/postApi";


export const useSelectPosts = <T>(cb: (posts: Post[]) => T) => {
    const { posts } = useFindManyQuery({ page: 0, size: 1000000 }, { selectFromResult: res => ({ posts: cb(res.data?.content || []) }) });
    return posts;
}