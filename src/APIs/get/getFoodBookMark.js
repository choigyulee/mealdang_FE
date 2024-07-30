import axiosInstance from "../axiosInstance";

export default async function getFoodBookMark() {
  try {
    const response = await axiosInstance.get(`/api/accounts/mypage/recommended-diet-list/`
    );

    return response.data;
  } catch (error) {
    console.error("에러 발생:", error);
    throw error; // 오류를 호출자에게 전달
  }
}