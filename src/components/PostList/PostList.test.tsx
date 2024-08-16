import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';

import { TestWrapper } from '../TestWrapper';
import PostList, { Props } from './PostList';
import { Post } from '@/shared/api/postApi';

const TestPostList = (props: Props) => {
  return (
    <TestWrapper>
      <PostList {...props} />
    </TestWrapper>
  );
};

const testPosts: Post[] = [
  {
    authorName: 'John',
    content: 'This is a test post',
    // June 4, 2024
    createdAt: 1717495200,
    hero: false,
    id: 0,
    title: "John's Post",
    posterImgSrc: '',
    updatedAt: null,
    postStatus: 'PUBLISHED',
    slug: 'test',
    publishedAt: 1717495200,
  },
  {
    authorName: 'Jack',
    content: 'This is a test post',
    // June 4, 2024
    createdAt: 1717495200,
    hero: false,
    id: 1,
    title: "Jack's Post",
    posterImgSrc: '',
    updatedAt: null,
    postStatus: 'PUBLISHED',
    slug: 'test',
    publishedAt: 1717495200,
  },
  {
    authorName: 'Wane',
    content: 'This is a test post',
    // August 5, 2024
    createdAt: 1722857500.167358,
    hero: true,
    id: 2,
    title: "Wane's Post",
    posterImgSrc: '',
    updatedAt: null,
    postStatus: 'PUBLISHED',
    slug: 'test',
    publishedAt: 1722857500.167363,
  },
];

describe('PostList', () => {
  test('should render', () => {
    const { getByTestId } = render(<TestPostList posts={testPosts} />);

    expect(getByTestId('posts-container')).toBeInTheDocument();
  });

  test("shouldn't render when the posts prop in an empty array", () => {
    const { queryByTestId } = render(<TestPostList posts={[]} />);

    expect(queryByTestId('posts-container')).toBeNull();
  });

  test('should render 3 links for 3 posts', () => {
    const { getAllByTestId } = render(<TestPostList posts={testPosts} />);

    const links = getAllByTestId('post-link');

    expect(links.length).toBe(testPosts.length);

    for (let i = 0; i < links.length; i++) {
      expect(links[i]).toHaveAttribute('href', `/blog/${testPosts[i].id}`);
    }
  });

  test('should add altText for every post image', () => {
    const { getAllByTestId } = render(<TestPostList posts={testPosts} />);
    const images = getAllByTestId('post-image');

    expect(images.length).toBe(testPosts.length);

    for (let i = 0; i < images.length; i++) {
      expect(images[i]).toHaveAttribute('alt', testPosts[i].title);
    }
  });

  test('should render title for every post', () => {
    const { getAllByTestId } = render(<TestPostList posts={testPosts} />);
    const titles = getAllByTestId('post-title');

    expect(titles.length).toBe(testPosts.length);

    for (let i = 0; i < titles.length; i++) {
      expect(titles[i]).toHaveTextContent(testPosts[i].title);
    }
  });

  test('should render published date for every post correctly', () => {
    const { getAllByTestId } = render(<TestPostList posts={testPosts} />);
    const dates = getAllByTestId('post-date');
    const testPublishedDates = [
      'June 4, 2024',
      'June 4, 2024',
      'August 5, 2024',
    ];

    expect(dates.length).toBe(testPosts.length);
    for (let i = 0; i < dates.length; i++) {
      expect(dates[i]).toHaveTextContent(testPublishedDates[i]);
    }
  });
});
