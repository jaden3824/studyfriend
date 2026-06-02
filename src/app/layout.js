import "./globals.css";

export const metadata = {
  title: "과외친구 | 중고등 1:1 맞춤 과외 매칭",
  description:
    "중1부터 고3까지, 학생의 성향·수준·목표에 맞춰 1:1 과외 선생님을 상담 후 연결합니다.",
  keywords: [
    "과외친구",
    "studyfriend",
    "중학생 과외",
    "고등학생 과외",
    "수학 과외",
    "영어 과외",
    "과외 매칭",
    "과외 중개",
  ],
  openGraph: {
    title: "과외친구 | 우리 아이에게 맞는 선생님을 찾아드립니다",
    description:
      "중1부터 고3까지, 학생 상황에 맞는 1:1 과외 선생님을 상담 후 추천합니다.",
    url: "https://studyfriend.kr",
    siteName: "과외친구",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}