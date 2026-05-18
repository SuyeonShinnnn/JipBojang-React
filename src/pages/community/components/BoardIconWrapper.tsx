import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';

import {
  faHeart as faHeartRegular,
  faStar as faStarRegular,
  faComment as faCommentRegular,
  faFlag,
} from '@fortawesome/free-regular-svg-icons';

interface BoardIconWrapperProps {
  scraps: number;
  likes: number;

  scrapped: boolean;
  liked: boolean;
}

const BoardIconWrapper = ({
  scraps,
  likes,
  scrapped,
  liked,
}: BoardIconWrapperProps) => {
  return (
    <Container>
      <IconWrapper>
        <Icon color={'#ff4d4f'}>
          <FontAwesomeIcon icon={liked ? faHeart : faHeartRegular} />
          <small>{likes}</small>
        </Icon>

        <Icon color={'#e7cb13'}>
          <FontAwesomeIcon icon={liked ? faStar : faStarRegular} />
          <small>{scraps}</small>
        </Icon>

        <Icon color="#4dabf7">
          <FontAwesomeIcon icon={faCommentRegular} />
          <small>0</small>
        </Icon>
      </IconWrapper>

      <Icon color="#595959">
        <FontAwesomeIcon icon={faFlag} />
        <small>신고하기</small>
      </Icon>
    </Container>
  );
};

export default BoardIconWrapper;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Icon = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  svg {
    width: 16px;
    height: 16px;
    color: ${({ color }) => color};
  }

  small {
    color: rgba(var(--color-darkgray));
  }

  &:hover {
    cursor: pointer;
  }
`;
