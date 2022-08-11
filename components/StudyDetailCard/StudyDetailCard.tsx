import { MouseEvent, useState } from "react";
import { Avatar, Menu } from "@mui/material";
import { useRouter } from "next/router";
import { StudyState } from "./StudyState";
import * as S from "./style";
import type { UserType } from "../../types/userType";
import { selectStudyState } from "./helper";
import type { StudyType } from "../../types/studyType";
import { BookCard } from "../BookCard";

interface StudyDetailProps {
  study: StudyType;
  members: UserType[];
}

// TODO Image => future Image로 수정해야 함
export const StudyDetailCard = ({ study, members = [] }: StudyDetailProps) => {
  const router = useRouter();
  const {
    id,
    name,
    thumbnail,
    currentParticipant,
    maxParticipant,
    gatherStartDate,
    gatherEndDate,
    studyStartDate,
    studyEndDate,
  } = study;

  const studyState = selectStudyState(
    gatherEndDate,
    studyStartDate,
    studyEndDate
  );

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleAvatarListClick = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAvatarListClose = () => {
    setAnchorEl(null);
  };

  const handleUserClick = (userId: string) => {
    router.push(`/userProfile/${userId}`);
  };

  const handleShareClick = async () => {
    const { origin } = window.location;
    const willCopyUrl = `${origin}/studyRecruiting/${id}`;
    await navigator.clipboard.writeText(willCopyUrl);
    // TODO 이후 스낵바로 수정
    alert("스터디 링크가 복사 되었습니다");
  };

  return (
    <S.StudyDetailCard>
      <S.ImageWrapper>
        <BookCard size={10} src={thumbnail} title="" />
      </S.ImageWrapper>
      <S.StudyInfoContainer>
        <S.StyledTypograph>{name}</S.StyledTypograph>
        {studyState === "recruiting" && (
          <S.ResponsiveText>
            모집 인원 : {currentParticipant}/{maxParticipant}
          </S.ResponsiveText>
        )}
        <S.ResponsiveText>
          모집 기간 : {`${gatherStartDate} - ${gatherEndDate}`}
        </S.ResponsiveText>
        <S.ResponsiveText>
          진행 기간 : {`${studyStartDate} - ${studyEndDate}`}
        </S.ResponsiveText>
      </S.StudyInfoContainer>
      <S.IconsContainer>
        <S.StyledShareIcon onClick={handleShareClick} />
        <S.StyledAvatarGroup max={2} onClick={handleAvatarListClick}>
          {members.map((user) => (
            <Avatar key={`AvatarGroup_${user.id}`} src={user.image} />
          ))}
        </S.StyledAvatarGroup>
      </S.IconsContainer>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleAvatarListClose}
      >
        {members.map((user) => {
          return (
            <S.StyledMenuItem
              key={`avatar-${user.id}`}
              onClick={() => {
                handleUserClick(user.id);
              }}
            >
              <Avatar src={user.image} />
              <span>{user.name}</span>
            </S.StyledMenuItem>
          );
        })}
      </Menu>
      {studyState !== "done" && <StudyState studyState={studyState} />}
    </S.StudyDetailCard>
  );
};
