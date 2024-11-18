MoodDiary 제품 요구사항 문서 (PRD)

1. 프로젝트 개요

프로젝트명: MoodDiary
목적: 사용자가 일기를 작성하고, GPT를 통해 감정을 분석하여 일기별로 감정 상태를 확인할 수 있는 단순하고 직관적인 일기장 서비스 개발
목표: 최대한 단순한 UI와 기술 스택을 사용하여 핵심 기능에 집중한 MVP 개발

2. 유저 플로우

	1.	일기 작성
	•	사용자는 앱을 열고 바로 일기를 작성할 수 있다.
	•	작성 완료 후 ‘저장’ 버튼을 누른다.

	2.	감정 분석
	•	일기가 저장되면 GPT API를 통해 일기 내용을 분석하여 감정을 분류한다.

	3.	일기 리스트뷰 확인
	•	사용자는 날짜별로 정렬된 일기 목록을 리스트뷰 형식으로 확인한다.
	•	각 일기 항목에는 감정 분류에 따른 색상 및 아이콘이 표시된다.

	4.	일기 상세보기
	•	리스트에서 특정 일기를 선택하면 상세 내용을 확인할 수 있다.

3. 핵심 기능

	•	단순한 UI 제공
	•	최소한의 요소로 구성된 직관적인 사용자 인터페이스
	•	날짜별 일기 관리
	•	[x] 일기 작성, 수정, 삭제 기능
	•	날짜별로 일기 목록을 리스트뷰 형식으로 제공
	•	감정 분석 및 표시
	•	GPT API를 활용하여 일기 내용의 감정을 분석
	•	분석된 감정에 따라 일기 항목에 색상 및 아이콘 표시

감정 상태별 색상 코드 및 아이콘 매핑

감정 상태	색상 코드	아이콘 이름	아이콘 코드
행복	#FFD700 (황금색)	Smile	<Smile />
슬픔	#1E90FF (청색)	Frown	<Frown />
분노	#FF4500 (주황색)	Angry	<AlertCircle />
평범	#A9A9A9 (회색)	Meh	<Meh />
신남	#7FFF00 (연두색)	Star	<Star />

	•	색상 코드: 감정 상태에 따라 일기 항목의 배경색 또는 강조 색상으로 사용
	•	아이콘: 감정 상태를 직관적으로 나타내기 위해 일기 목록과 상세 화면에 표시
	•	아이콘 라이브러리: Lucide Icons 사용

아이콘 라이브러리 선택

	•	Lucide Icons
	•	ShadCN UI와 호환되며, TailwindCSS와 쉽게 통합 가능
	•	React 컴포넌트로 제공되어 프로젝트에 손쉽게 적용 가능
	•	다양한 아이콘 제공으로 감정 상태에 맞는 아이콘 선택 가능
	•	아이콘 사용 예시:

import { Smile, Frown, AlertCircle, Meh, Star } from 'lucide-react';

function EmotionIcon({ emotion }) {
  switch (emotion) {
    case '행복':
      return <Smile color="#FFD700" />;
    case '슬픔':
      return <Frown color="#1E90FF" />;
    case '분노':
      return <AlertCircle color="#FF4500" />;
    case '평범':
      return <Meh color="#A9A9A9" />;
    case '신남':
      return <Star color="#7FFF00" />;
    default:
      return null;
  }
}


	•	리스트뷰 기능
	•	일기 목록을 스크롤하여 쉽게 탐색
	•	최신 일기가 상단에 표시되도록 정렬

4. 기술스택

	•	프론트엔드
	•	Next.js (App Router)
	•	React 기반의 프레임워크로 서버 사이드 렌더링 및 파일 기반 라우팅 지원
	•	TailwindCSS
	•	유틸리티 퍼스트 CSS 프레임워크로 빠르고 일관된 스타일링 가능
	•	ShadCN UI 라이브러리
	•	TailwindCSS와 통합된 UI 컴포넌트 라이브러리로 신속한 개발 지원
	•	백엔드
	•	Next.js API Routes
	•	간단한 API 엔드포인트를 생성하여 백엔드 로직 처리
	•	데이터 저장
	•	로컬 스토리지(Local Storage)
	•	브라우저의 로컬 스토리지를 활용하여 사용자 데이터 저장
	•	또는 JSON 파일 저장
	•	서버 측에서 간단한 JSON 파일로 데이터 읽기/쓰기를 수행
	•	감정 분석
	•	OpenAI GPT API
	•	일기 내용의 감정 분석을 위해 사용
	•	상태 관리
	•	React Context API
	•	전역 상태 관리에 사용
	•	기타 라이브러리
	•	아이콘: Lucide Icons
	•	ShadCN UI와 호환되며, 다양한 아이콘 제공
	•	폼 관리: React Hook Form
	•	HTTP 요청: Fetch API

5. MVP 기능 개발 이후 추가 개선사항

	•	회원가입 및 로그인 기능 추가
	•	이메일 또는 소셜 계정을 통한 사용자 인증 기능
	•	사용자별 데이터 저장을 위한 데이터베이스 도입 (예: PostgreSQL, Prisma)
	•	감정 통계 제공
	•	주간/월간 감정 변화 그래프 제공
	•	주요 감정 빈도 분석
	•	알림 기능
	•	일기 작성 리마인더 알림 설정
	•	소셜 기능 추가
	•	다른 사용자와 감정 공유 또는 공감 기능
	•	데이터 백업 및 복원
	•	클라우드에 데이터 백업 및 복원 기능 제공
	•	보안 강화
	•	사용자 데이터 암호화 저장
	•	OAuth 2.0 등 보안 인증 방식 적용
	•	다국어 지원
	•	영어, 일본어 등 다국어 인터페이스 제공
	•	모바일 앱 출시
	•	React Native 또는 Flutter를 활용한 모바일 앱 개발
	•	오프라인 모드 지원
	•	인터넷 연결 없이도 일기 작성 및 확인 가능

참고: 이번 MVP 개발에서는 최대한 단순한 기술 스택과 UI를 활용하여 핵심 기능인 일기 작성 및 감정 분석에 집중합니다. 감정 상태에 따른 색상 코드와 Lucide Icons을 적용하여 사용자에게 직관적인 피드백을 제공합니다. 데이터 저장은 로컬 스토리지나 간단한 파일 시스템을 이용하며, 복잡한 데이터베이스나 사용자 인증 기능은 추후 개선사항으로 배치합니다.