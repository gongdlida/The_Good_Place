# 리아드 코퍼레이션 프론트엔드 과제

## 설치, 실행 가이드
- [`pnpm 모듈 패키지 설치`](https://pnpm.io/installation) 후 실행시켜주세요.

```bash 
$ pnpm start
```

## 사용 기술

- Package Manager - pnpm:</br>
pnpm은 프로젝트의 의존성을 효율적으로 관리하는 패키지 매니저로, 중복된 모듈을 공유하여 저장 공간을 절약하고 빠른 설치 속도를 제공한다.

- Language - TypeScript, JavaScript:</br>
TypeScript은 정적 타입 언어로, 코드의 가독성을 높이고 버그를 사전에 방지할 수 있는 장점이 있으며, JavaScript와 함께 사용하여 유연성과 생산성을 유지한다.

- Bundling - Vite:</br>
Vite는 빠른 개발 환경을 제공하는 빌드 도구로, 최신 ES 모듈 표준을 활용하여 빠른 빌드 시간과 실행 속도를 제공한다.

- Render - React:</br>
React는 선언적이고 효율적인 UI를 구축하기 위한 라이브러리로, 컴포넌트 기반 아키텍처를 통해 코드의 재사용성과 유지보수성을 높인다.

- State - Zustand:</br>
Zustand는 간단하면서도 강력한 상태 관리 라이브러리로, React 애플리케이션의 상태를 효과적으로 관리할 수 있게 해준다.

- CSS - Tailwind CSS:</br>
Tailwind CSS는 utility-first CSS 프레임워크로, 클래스를 사용하여 간편하게 스타일을 적용할 수 있다. 
커스터마이징이 용이하며 빠르게 프로토타입을 작성할 수 있는 장점이 있다. 

- HTTP - axios:</br>
axios는 간편하게 HTTP 요청을 처리할 수 있는 라이브러리로, 다양한 기능과 인터셉터를 제공하여 효율적인 네트워크 통신을 지원한다.

- Routing - react-router-dom:</br>
react-router-dom은 React 애플리케이션의 페이지 네비게이션을 쉽게 관리할 수 있는 라이브러리로, 라우팅을 구현하는 데 용이하다.

- Util - React-hook-form:</br>
React-hook-form은 간편하게 폼을 관리할 수 있는 라이브러리로, 높은 유연성과 성능을 제공하여 폼 상태와 유효성 검사를 간단하게 처리할 수 있다.

- Pre-commit hook validator - Husky:</br>
Husky는 Git의 pre-commit 훅을 이용하여 코드 커밋 전에 미리 정의된 작업을 실행할 수 있게 해주어 코드 품질을 유지하고 일관성을 유지할 수 있다.

- Lint git commit subject - commitlint:</br>
commitlint는 커밋 메시지의 형식을 규정하여 일관된 커밋 로그를 유지하고, 프로젝트의 가독성과 협업을 용이하게 한다.


## 폴더 구조

- 모든 파일은 도메인으로 먼저 분류된 후 기능 단위로 분류되어 {도메인}/{기능}/{파일명}의 경로를 갖습니다.
- 프로젝트 관리 용이성을 위해 모노레포를 사용합니디.
- 각 폴더별 기능 정의는 다음과 같습니다.

```
root
└─ apps: 프로젝트 관리 폴더
│    └--project: 도메인에 속한 페이지들에서 사용되는 파일들의 모음
│      └─ components: 자주 사용되는 컴포넌트 관리
│      └─ api: HTTP 통신에 필요한 설정 코드 관리
│      └─ hooks: 커스텀 훅 관리
│      └─ layout: Top, Footer, Left 등 레이아웃을 이루는 Component
│      └─ util: 중복코드를 제거하는 유틸형 함수
│      └─ routes: 프로젝트 Route 관리
│      └─ 도메인(ex:auth): 프로젝트 도메인 관리 폴더
│            └─ elements: 도메인 페이지를 구성하는 컴포넌트 관리    
│            │     └─ index: 절대경로로 관리하기 위한 파일
│            │ 
│            └─ constants: 상수관리 파일
│            └─ api: 도메인에 필요한 HTTP 통신 관리
│            └─ store: 상태관리 스토어
│            └─ container: 비즈니스 로직 관리   
│            └─ type: 도메인에 필요한 타입 관리
│
└─ packages: 프로젝트에서 자주 사용되는 패키지 관리 폴더
│      └─ eslint
│      └─ tailwind
│      └─ tsconfig
│      └─ vite
└─ ...
```

- 모든 폴더는 해당 폴더의 변수들을 취합하여 export 하는 index파일을 가지고 있습니다.
- index파일을 이용하여 절대경로 방식의 폴더 단위 import를 지향합니다.
