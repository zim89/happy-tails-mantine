import Image from "next/image";
import Link from "next/link";

import { Post } from "@/shared/api/postApi";
import { formatDateToLongString } from "@/shared/lib/helpers";
import noImage from '@/assets/icons/no-image.512x512.png';

type Props = {
    posts: Post[];
}

export default function PostList({ posts }: Props) {
    return (
        <ul className='grid grid-cols-1 gap-6 lg:gap-8'>
        {posts.map((post) => (
          <li key={post.id}>
            <Link
              href={`/blog/${post.id}`}
              className='group flex cursor-pointer gap-4'
            >
              <div className='relative h-[120px] w-[120px] flex-none'>
                <Image
                  src={
                    post.posterImgSrc.includes('http')
                      ? post.posterImgSrc
                      : noImage
                  }
                  alt={post.title}
                  fill={true}
                  sizes='120px'
                  className='object-cover'
                />
              </div>

              <div className='flex items-center'>
                <div className='flex flex-col gap-2'>
                  <h3 className='text-lg/[1.3] text-secondary transition-colors duration-300 group-hover:text-brand-orange-400'>
                    {post.title}
                  </h3>
                  <p className='text-base font-light'>
                    {formatDateToLongString(post.createdAt)}
                  </p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    );
}