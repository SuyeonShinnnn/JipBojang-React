# 🏠 집보장
> KB IT's Your Life 최종 프로젝트
> Vue에서 React로 마이그레이션

부동산 계약 과정에서 발생할 수 있는 위험 요소를 사전에 분석하고, 사용자에게 직관적인 리스크 진단 리포트와 교육 콘텐츠를 제공하는 서비스

<br>
<br>

## 📌 프로젝트 개요
**집보장**은 2030 세대를 위한 **전세사기 진단 및 예방 플랫폼**입니다. <br>
전세사기와 같은 부동산 거래 리스크를 사전에 인지하고 예방할 수 있도록<br>
등기부 기반 진단 리포트, AI 챗봇, 커뮤니티 정보 공유 기능을 제공하여<br>
누구나 쉽게 부동산 위험을 판단하고 안전한 부동산 거래가 가능한 환경 조성을 목표로 합니다.

<br>
<br>

## 🧑‍💻 기획 배경
해당 프로젝트는 단순한 부동산 정보 제공을 넘어<br>
데이터 기반 의사결정, 리스크 예방, 교육 기능을 결합한<br>
프롭테크 서비스 구축을 목표로 합니다.

<br>
<br>

## 🛠️ 사용 기술
#### 🎨 Frontend
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/react%20query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"> <img src="https://img.shields.io/badge/zustand-000000?style=for-the-badge">


#### ⚙️ Backend
![Spring](https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![MyBatis](https://img.shields.io/badge/MyBatis-000000?style=for-the-badge)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

<br>
<br>

## 🚀 주요 기능
### **1. 회원 관리**
- 이메일/소셜 로그인 (카카오 로그인)
- 회원가입 및 비밀번호 재설정
- 마이페이지: 관심 매물 관리, 진단 리포트 히스토리, 알림 설정

<br>
  
### **2. 지도 기반 건물 검색 및 정보 조회**
- 카카오 지도 API 기반 건물 마커 표시- 지도 필터링 기능 (위험도, 가격대, 지역 등)
- 매물 상세 정보 제공 (보증금 / 실거래가 / 주택 유형 등)
- 주변 위험도 시각화

<br>

|  |  |
|--|--|
|<img width="1200" height="675" alt="image" src="https://github.com/user-attachments/assets/34e0dfb7-4a38-4a1b-b750-836193555f18" />|<img width="1200" height="675" alt="image" src="https://github.com/user-attachments/assets/6480e4f4-edd3-473d-8963-f312f538af11" />|

<br>

### **3. 리스크 진단 리포트 발행**
- 사용자 입력 기반 부동산 분석
- 리포트 구성 요소
  - 전세가율 분석 (실거래가 vs 보증금)
  - 등기부등본 기반 권리 관계 분석
  - 건축물 대장 기반 불법 증축 여부 확인
  - AI 기반 종합 위험 등급 제공
- 리포트 PDF 다운로드 및 리포트 저장 기능

<br>

|  |  |
|--|--|
|<img width="1200" height="675" alt="image" src="https://github.com/user-attachments/assets/fbbbae5e-5bba-4346-8854-0bf45af48ded" />| <img width="1200" height="675" alt="image" src="https://github.com/user-attachments/assets/c472081f-b9e3-4f1a-92cf-e3e65fe48151" />|
|<img width="1200" height="675" alt="image" src="https://github.com/user-attachments/assets/4c606641-bde9-4736-8cc1-7cfe7804ea35" />|<img width="1200" height="675" alt="image" src="https://github.com/user-attachments/assets/f9c2b04a-8f90-4512-b950-616b2a120d2e" />|
|<img width="1200" height="675" alt="image" src="https://github.com/user-attachments/assets/91693762-f112-455d-a1a2-b25c363378c9" />
||

<br>
  
### **4. 등기부 변동 알림**
- 알림 수신 희망 부동산 정보 등록 및 관리
- 등기부 등본 변동 감지 알림 및 이메일 발송
- 주기적 데이터 체크 및 사용자 알림

<br>

|  |  |
|--|--|
|<img width="1200" height="675" alt="image" src="https://github.com/user-attachments/assets/da137c1a-d083-49e9-807a-b463f9348320" />|<img width="1200" height="675" alt="image" src="https://github.com/user-attachments/assets/c46a2544-a97c-4e0f-af37-aa0fd8b473fd" />|
|<img width="1200" height="675" alt="image" src="https://github.com/user-attachments/assets/9d8c8285-9a86-49bc-bd1d-9d16bae4d244" />||

<br>
  
### **5. 챗봇 기능**
- 일반 정보형 챗봇 (부동산 용어, 계약 절차 등 질의응답)
- 퀴즈형 챗봇 (O/X, 객관식 퀴즈)
  - 주제별 레벨 시스템
  - 즉각적인 정답 피드백과 해설
  - 성적에 따른 간단한 통계 제공

<br>

|  |  |
|--|--|
|<img width="1200" height="675" alt="image" src="https://github.com/user-attachments/assets/aa42c375-a1d9-4ecf-b72a-c4bf51f8403c" />|<img width="1200" height="675" alt="image" src="https://github.com/user-attachments/assets/37c16491-b012-4cb5-aedc-206e5c0136e0" />|

<br>

  
### **6. 커뮤니티 기능**
- 전세사기·부동산 정보 공유 커뮤니티
- 사용자 위치 인증을 통한 지역 기반 정보의 신뢰성 확보
- 게시글, 댓글, 좋아요, 스크랩 기능을 통한 정보 교류 활성화
- 신고 및 블라인드 처리 기능으로 신뢰도 높은 커뮤니티 환경 유지

<br>

|  |  |
|--|--|
|<img width="1200" height="675" alt="image" src="https://github.com/user-attachments/assets/654e063f-abff-4d12-95cb-68d740083f89" />|<img width="1200" height="675" alt="image" src="https://github.com/user-attachments/assets/4ea17589-a813-4ec3-a2fe-ae56d69b2c6b" />|
|<img width="1200" height="675" alt="image" src="https://github.com/user-attachments/assets/6802511d-b4b8-4aa5-ae3e-766bacdb9878" />|<img width="1200" height="675" alt="image" src="https://github.com/user-attachments/assets/831c2539-d790-44b3-9e22-71f63be9078b" />||

<br>
<br>

---

## 🎯 기대 효과
- 전세 사기 및 부동산 계약 리스크 감소
- 사용자 중심의 직관적인 부동산 정보 제공
- 교육 기반 부동산 이해도 향상
- 실시간 위험 감지 시스템 구축
