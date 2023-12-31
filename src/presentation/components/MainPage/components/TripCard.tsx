import React from "react";
import { styled } from "styled-components";
import COLOR from "@styles/colors";
import Spacing from "@components/common/Spacing";
import Tag from "@components/common/Tag";
import Text from "@components/common/Text";
import { getTripDetailRange } from "../../../../application/utils/getDate";
import ProgressBar from "@components/common/ProgressBar";
import { useNavigate } from "react-router-dom";
import HeartButton from "@components/common/HeartButton";

const TripCard = ({ travelInfo }: any) => {
  const navigate = useNavigate();

  const handleClickTravelDetail = () => {
    navigate(`/trip/${travelInfo.travelId}`);
  };

  return (
    <TripCardWrapper
      progress={travelInfo.dDay.includes("-") ? true : false}
      onClick={handleClickTravelDetail}
    >
      <TopWrapper>
        <Tag
          text={travelInfo.dDay}
          backgroundColor={
            travelInfo.dDay.includes("-") ? COLOR.GREEN_100 : COLOR.GRAY_200
          }
          color={travelInfo.dDay.includes("-") ? COLOR.MAIN_GREEN : "#5C5F64"}
        />
        <Tag
          text={travelInfo.destinationType === "OVERSEAS" ? "해외" : "국내"}
          backgroundColor={
            travelInfo.destinationType === "OVERSEAS" ? "#D1DEFF" : "#FFE2D1"
          }
          color={travelInfo.destinationType === "OVERSEAS" ? "#5F8BFB" : "#FE984E"}
        />
      </TopWrapper>
      <Spacing size={11} />
      <MainWrapper>
        <div className="trip-info">
          <Text
            text={travelInfo.title}
            color={COLOR.GRAY_900}
            fontSize={18}
            fontWeight={600}
            lineHeight="18px"
          />
          <Text
            text={`${getTripDetailRange(
              travelInfo.startDate
            )} ~ ${getTripDetailRange(travelInfo.endDate)}`}
            color={COLOR.GRAY_600}
            fontSize={14}
            fontWeight={500}
            lineHeight="14px"
          />
        </div>
        <HeartButton
          isInStorage={travelInfo.isInStorage}
          travelId={travelInfo.travelId}
        />
      </MainWrapper>
      {travelInfo.dDay.includes("-") && (
        <>
          <Spacing size={15} />
          <ProgressBar
            max={String(travelInfo.finished + travelInfo.unfinished)}
            value={String(travelInfo.finished)}
            percent={false}
            percentNumber={100}
            size="small"
            startColor="#06DCA8"
            finishColor="#00B494"
          />
          <Spacing size={6} />
          <Text
            text={`잔여 리스트 총 ${travelInfo.unfinished}개`}
            color={COLOR.GRAY_700}
            fontSize={12}
            fontWeight={600}
            lineHeight="14px"
          />
        </>
      )}
    </TripCardWrapper>
  );
};

const TripCardWrapper = styled.div<{ progress: boolean }>`
  padding: ${({ progress }) => (progress ? "22px 19px 12px 19px" : "22px 19px")};
  border: 2px solid ${COLOR.GRAY_100};
  border-radius: 8px;
  background: ${COLOR.WHITE};
`;
const TopWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 6px;
`;
const MainWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;

  .trip-info {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
`;

export default TripCard;
