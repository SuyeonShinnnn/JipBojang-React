import styled from 'styled-components';
import type { NewsInfo } from '../../../types/community';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface NewsBoxProps {
  news: NewsInfo[];
}

const NewsBox = ({ news }: NewsBoxProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (news.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % news.length);
    }, 10000);
    console.log(news);
    return () => clearInterval(interval);
  }, [news]);

  const currentNews = news[currentIndex];

  if (!currentNews) return null;

  return (
    <Wrapper>
      <List>
        <NewsLink to={currentNews.link}>
          <strong>{currentNews.title}</strong>
          {/* <p>{currentNews.description}</p> */}
        </NewsLink>
      </List>
    </Wrapper>
  );
};

export default NewsBox;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const List = styled.li`
  list-style: none;
`;

const NewsLink = styled(Link)`
  display: grid;
  grid-template-columns: repeat(2, auto);
  align-items: center;
  gap: 16px;

  transition: all 0.25s ease;

  &:hover {
    text-decoration-line: underline !important;
  }

  p {
    overflow: hidden;
    text-overflow: ellipsis;

    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
`;
