import styled from 'styled-components';
import BaseButton from '../../../components/common/BaseButton';
import basicProfile from '../../../assets/consult/basic-profile.png';
import type { ExpertInfo } from '../../../types/consult';

interface Props {
  expert: ExpertInfo;
  favorite: boolean;
  onToggleFavorite: () => void;
  onChat: (expertId: number) => void;
  onDetail: () => void;
}

const ExpertCard = ({
  expert,
  favorite,
  onToggleFavorite,
  onChat,
  onDetail,
}: Props) => {
  return (
    <Card>
      <Header>
        <FavBtn active={favorite} onClick={onToggleFavorite}>
          ♥
        </FavBtn>
      </Header>

      <Body>
        <ImageWrapper>
          <ProfileImage
            src={expert.profileImage}
            alt={expert.name}
            onError={(e) => (e.currentTarget.src = basicProfile)}
          />
        </ImageWrapper>

        <h3>{expert.name}</h3>
        <Company>{expert.company}</Company>
        <Rating>⭐ {expert.rating?.toFixed(1)}</Rating>
        <Description>{expert.description}</Description>
      </Body>

      <Footer>
        <BaseButton onClick={onDetail} variant="outline">
          상세보기
        </BaseButton>

        <BaseButton onClick={() => onChat(Number(expert.userId))}>
          상담하기
        </BaseButton>
      </Footer>
    </Card>
  );
};

export default ExpertCard;

const Card = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  transition: 0.25s;

  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-6px);
  }
`;

const Header = styled.div`
  height: 90px;
  background: #e8e7ff;

  position: relative;
`;

const FavBtn = styled.button<{ active?: boolean }>`
  position: absolute;
  top: 14px;
  right: 14px;

  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;

  cursor: pointer;

  font-size: 18px;

  background: white;

  color: ${(props) => (props.active ? '#ff4757' : '#bbb')};
`;

const Body = styled.div`
  padding: 0 24px 24px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ImageWrapper = styled.div`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  border: 5px solid white;
  transform: translateY(-50px);

  background: white;
`;

const ProfileImage = styled.img`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
`;

const Company = styled.p`
  color: #777;
  margin-top: 6px;
`;

const Rating = styled.div`
  margin-top: 12px;
  font-weight: bold;
`;

const Description = styled.p`
  margin-top: 16px;
  color: #555;
  line-height: 1.6;
`;

const Footer = styled.div`
  display: flex;
  gap: 12px;
  padding: 20px;

  button {
    flex: 1;
    padding: 12px;
  }
`;
