# 리아드 코퍼레이션 프론트엔드 과제

## 설치, 실행 가이드
- [`pnpm 모듈 패키지 설치`](https://pnpm.io/installation) 후 실행시켜주세요.

```bash 
$ pnpm start
```

## 사용 기술

- Render - React:</br>
- Language - TypeScript, JavaScript:</br>
- HTTP - axios:</br>

- Package Manager - pnpm 8.x:</br>
    - pnpm은 monorepo를 구성할 때 쉽고 빠르게 세팅할 수 있음
    - 패키지 매니저의 최신버전도 node >= 16.x을 지원하고 있어 엔진 버전 문제로인한 이슈 발생확률이 적음
        (yarn berry 같은 경우 최신버전은 18.x 미만 버전은 지원되고 있지않아 aws amplify 배포 시 이슈를 경험했었음)

- Bundling - Vite:</br>
    - Vite는 es-builder와 rollup 두 가지 번들러를 채택하고 있고, 개발/운영 환경에 따라 번들러를 변경하여 빌드
     (dev-> builder \ prod-> rollup) 
    - webpack과 비교했을 떄 성능 개선을 위한 조작이 거의 들지 않음
    - 개발 빌드 시, 전체 파일을 전부 빌드하지 않고 라우트에 따라 필요한 요소를 호출하여 렌더링하는 방식을 사용하여 애플리케이션 실행과 업데이트가 빠름
    - Vite에서 제공하는 보일러 플레이트는 CRA와 비교했을 때 선택할 수 있는 라이브러리에 대한 자율성이 높음

- State - Zustand:</br>
    - Zustand는 사용방법이 Recoil과 Redux와 유사하면서도 상태관리 라이브러리 중에서도 가장 가벼운 라이브러리
    - Zustand의 best practice 상태관리 패턴은 flux 패턴을 들고 있음
    - 현재 프로젝트에서는 store라는 파일을 통해 코드 관리, container가 리덕스의 dispatch 역할을 수행 (action은 생략)

- CSS - Tailwind CSS:</br>
    - 프로토 타입을 빠르게 작성할 수 있는 툴
    - 유틸리티 클래스로 css in js와 비교했을 때 CSS 렌더링이 더 빠르게 적용된다는 장점
    - css in js와 비교했을 때 관리하는 파일의 양과 번들링 사이즈가 상대적으로 감소

- Routing - React-router-dom:</br>
    - react-router-dom은 React 애플리케이션의 페이지 네비게이션을 쉽게 관리할 수 있는 라이브러리
    - 라우트를 중첩하고 특정 라우트에 대한 보호 기능을 제공. 이를 통해 특정 조건이나 권한에 따라 페이지 액세스를 제어

- Util - React-hook-form:</br>
    - 상태 업데이트로 인한 불필요한 리렌더링을 방지해주는 기능제공
    - React-hook-form은 인라인으로 유효성 검사를 수행하고 에러를 처리하는 기능을 제공, 사용자 경험을 향상시키고 폼의 유효성을 간편하게 관리

- Pre-commit hook validator - Husky:</br>
    - Husky는 Git의 pre-commit 훅을 이용하여 코드 커밋 전에 미리 정의된 작업을 실행할 수 있게 해주어 코드 품질을 유지하고 일관성을 유지가 가능

- Lint git commit subject - commitlint:</br>
    - commitlint는 커밋 메시지의 형식을 규정하여 일관된 커밋 로그를 유지하고, 프로젝트의 가독성과 협업을 용이


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

## 테스트 계정
테스트에 필요한 계정은 `apps/riad-buyer/auth/fixtures`에 `user.account.json` 또는</br> 
로그인 페이지 방문 시 세션 스토리지에 회원정보가 업데이트 되오니 참고 부탁드리겠습니다.