import client from "@api/index";

/* 아이템 순서 변경을 위한 인터페이스*/
interface changeItemProps {
    id : number;
    order : number;
  }


//새 아이템 생성
export const postNewItem = async (travelId: number, checkListId: number, title:string) =>
await client
    .post(`travels/${travelId}/check-lists/${checkListId}/items`, {title : title})
    .then(({ data }) => data)
    .catch((err) => err.response);

//아이템 순서 변경
export const changeItemOrder = async (travelId: number, checkListId: number, data :changeItemProps[]) =>
await client
    .patch(`travels/${travelId}/check-lists/${checkListId}/items/order`, data)
    .then(({ data }) => data)
    .catch((err) => err.response);

//아이템 삭제
export const deleteItem = async (travelId: number, checkListId: number, itemId: number) =>
await client
    .delete(`travels/${travelId}/check-lists/${checkListId}/items/${itemId}`)
    .then(({ data }) => data)
    .catch((err) => err.response);

//아이템 체크
export const toggleItemCheck = async (travelId: number, checkListId: number, itemId: number) =>
await client
    .patch(`travels/${travelId}/check-lists/${checkListId}/items/${itemId}`)
    .then(({ data }) => data)
    .catch((err) => err.response);


//아이템 내용 수정
export const updateItemTitle = async (travelId: number, checkListId: number, itemId: number, title : string) =>
await client
    .patch(`travels/${travelId}/check-lists/${checkListId}/items/${itemId}/title`, { title: title })
    .then(({ data }) => data)
    .catch((err) => err.response);