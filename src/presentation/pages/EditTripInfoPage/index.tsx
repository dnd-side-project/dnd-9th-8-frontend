import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { WhiteTemplate } from "@styles/templates"
import CustomCalendar from "@components/common/Calendar";
import CalendarRange from "@components/common/CalendarRange";
import BackHeader from "@components/common/BackHeader";
import COLOR from "@styles/colors";
import styled from "styled-components";
import Text from "@components/common/Text";
import Input from "@components/common/Input";
import Spacing from "@components/common/Spacing";
import Icon from "@components/common/Icon";
import { useSelector } from "react-redux";
import { RootState } from "@store";
import { getMonthandDate, getMonthandDateList } from "@utils/getDate";
import useGetTravelDetail from "@hooks/queries/trip/useGetTravelDetail";

interface TripType {
  title?: string;
  dDay?: string;
  destinationType: string;
  startDate?: string;
  endDate?: string;
}


const EditTripInfoPage = () => {
  const { tripId } = useParams();
  const { data, isLoading, error } = useGetTravelDetail(String(tripId)); //여행 상세 조회
  const [ title, setTitle ] = useState(data?.title); 
  const [ startDate, setStartDate ] = useState(data?.startDate); 
  const [ endDate, setEndDate ] = useState(data?.endDate); 

  const [ travel, setTravelInfo ] = useState<TripType>(data);
  
  const [ isOpenCalendar, setIsOpenCalendar ] = useState(false); 

  useEffect(()=>{
    if (data) {
      setTravelInfo(data);
      setTitle(data?.title);
      setStartDate(data?.startDate);
      setEndDate(data?.endDate);
    }

}, [data]);

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }

  const onChangeStartDay = (date:string) => {
    setStartDate(date);
  }

  const onChangeEndDay = (date:string) => {
    setEndDate(date);
  }

  return (
    <WhiteTemplate>
      <BackHeader text="여행 수정하기" />
      
      <ContentContainer>
        <Text text="여행 이름" color={COLOR.GRAY_500} fontSize={15} lineHeight="21px" fontWeight={600} />
        <Spacing size={5.53}/>
        <Input placeholder="" onChange={onChangeTitle} value={String(travel?.title)} />
        <Spacing size={23.98}/>
        <Text text="여행 일정" color={COLOR.GRAY_500} fontSize={15} lineHeight="21px" fontWeight={600} />
        <Spacing size={5.53}/>
        <InputWrapper>
        <DateButton onClick={()=>{setIsOpenCalendar(prev=>!prev)}}>
          <Text text={getMonthandDate(startDate)} color={COLOR.GRAY_800} fontSize={15} lineHeight="18px" fontWeight={600} />
          <Icon icon="Calendar"/>
        </DateButton>
        <Bar />
        <DateButton onClick={()=>{setIsOpenCalendar(prev=>!prev)}}>
          <Text text={getMonthandDate(endDate)} color={COLOR.GRAY_800} fontSize={15} lineHeight="18px" fontWeight={600} />
          <Icon icon="Calendar"/>
        </DateButton>
        </InputWrapper>
        {isOpenCalendar && 
        <CalendarWrapper>
          <CustomCalendar 
          defaultStartDay={getMonthandDateList(startDate)} 
          defaultEndDay={getMonthandDateList(endDate)}
          onChangeStartDay={onChangeStartDay}
          onChangeEndDay={onChangeEndDay}/>
        </CalendarWrapper>
        }
        
      </ContentContainer>
    </WhiteTemplate>
  );
};

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;


const DateButton = styled.button`
  all : unset;
  border: 1px solid #BEC2C9;
  border-radius: 8px;
  padding: 15px 12px;
  display: flex;
  align-items: center;
`;


const Bar = styled.div`
  height: 1px;
  width: 12px;
  background-color: ${COLOR.GRAY_400};
  
`;

const ContentContainer = styled.div`
  padding-top: 41.47px;
`;


const CalendarWrapper = styled.div`
  padding: 16px;
`;
export default EditTripInfoPage;
