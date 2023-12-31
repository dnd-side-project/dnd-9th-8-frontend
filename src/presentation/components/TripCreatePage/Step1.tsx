import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import COLOR from '@styles/colors';
import Spacing from '../common/Spacing';
import TextBox from './components/TextBox';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store';
import {
  changeCreateTripState,
  initializeCreateTripInfo,
} from '../../../application/reducer/slices/createTrip/createTripSlice';
import BottomButton from '../common/BottomButton';
import { useNavigate } from 'react-router-dom';
import Icon from '@components/common/Icon';

const Step1 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { state } = useSelector((state: RootState) => state.createTrip);
  const [place, setPlace] = useState('');
  const recent = [
    '도쿄',
    '베를린',
    '시드니',
    '상하이',
    '이스탄불',
    '유럽',
    '제주도',
  ];

  useEffect(() => {
    if (state === 'main') {
      dispatch(
        changeCreateTripState({
          type: 'state',
          value: 'main',
        })
      );
    } else {
      dispatch(initializeCreateTripInfo());
    }
  }, []);

  const handleChangeTripPlace = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlace(e.target.value);
  };
  const handleClickNextBtn = () => {
    dispatch(changeCreateTripState({ type: 'tripName', value: place }));
    navigate('/trip-create/2');
  };

  return (
    <StepWrapper>
      <TextContainer>
        <TextBox>
          <div>
            여행을 떠날 지역을
            <br />
            입력해주세요
          </div>
        </TextBox>
        <Spacing size={50} />
      </TextContainer>
      <InputContainer>
        <input
          type="text"
          placeholder="어디로 여행을 떠나시나요?"
          value={place}
          onChange={handleChangeTripPlace}
        />
        <div className="icon">
          <Icon icon="Search" fill={place !== '' ? '#000' : '#B9BFC7'} />
        </div>
      </InputContainer>
      {recent && (
        <>
          <Spacing size={40} />
          <RecentKeyword>
            <div className="title">최근 검색어</div>
            <div className="keywords">
              {recent.map((keyword) => (
                <div
                  key={keyword}
                  className="keyword"
                  onClick={() => setPlace(keyword)}
                >
                  {keyword}
                </div>
              ))}
            </div>
          </RecentKeyword>
        </>
      )}

      <BottomButton
        disabled={place === '' ? true : false}
        text="다음"
        onClick={handleClickNextBtn}
      />
    </StepWrapper>
  );
};

const StepWrapper = styled.div``;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;

  input {
    width: 100%;
    height: 31px;
    border: none;
    outline: none;
    border-bottom: 1px solid #000;

    font-size: 22px;
    font-weight: 500;
    line-height: 140%;

    &::placeholder {
      color: #b9bfc7;
    }
  }
  .icon {
    position: absolute;
    right: 10px;
  }
`;

const RecentKeyword = styled.div`
  display: flex;
  flex-direction: column;
  gap: 11px;

  color: ${COLOR.MAIN_BLACK};
  font-size: 16px;
  font-weight: 600;
  line-height: 140%;

  .keywords {
    display: flex;
    flex-direction: row;
    gap: 7px;
    overflow: auto;
    height: 100%;
    font-weight: 500;
    line-height: 9.8px;

    .keyword {
      padding: 10px;
      border: 1.2px solid #e4e9ef;
      border-radius: 6px;
      background-color: #f4f6f9;
      white-space: nowrap;
      cursor: pointer;
    }
  }
`;

export default Step1;
