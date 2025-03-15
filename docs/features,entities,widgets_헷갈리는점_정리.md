# Features

### **✅ `features/` 폴더의 역할은?**

`features/`는 특정 기능(로그인, 검색, 게시글 작성 등)을 처리하는 **독립적인 단위**예요.
즉, **애플리케이션의 개별적인 기능을 담당하는 곳**이라고 보면 됩니다.

## **🔍 `entities/` vs `features/` 차이점**

|               | `entities/`(엔터티)                               | `features/`(기능)                                       |
| ------------- | ------------------------------------------------- | ------------------------------------------------------- |
| **역할**      | 애플리케이션의 핵심 데이터와 비즈니스 로직을 관리 | 특정 기능(로그인, 검색, 결제 등)을 담당                 |
| **재사용성**  | 여러 `features`에서 재사용됨                      | 특정 기능에 맞춰 독립적으로 동작                        |
| **구성 요소** | 상태 관리, 도메인 모델, 공통 UI 컴포넌트          | UI, 모델, API 호출 등 기능별 구성                       |
| **예시**      | `User`,`Product`,`Post`                           | `auth`(로그인/회원가입),`search`(검색),`cart`(장바구니) |

# Entities

## **언제 Entities를 사용해야 할까?**

- **애플리케이션의 핵심 데이터 모델을 표현할 때**
- **다양한 기능(features)에서 동일한 도메인 데이터를 공유할 때**
- **UI 및 상태를 추상화하여 재사용성을 높이고 싶을 때**

##### 질문:

즉 Entities에 폴더와 코드구조를 짜는이유는 features 폴더의 각기다른 곳에서 재사용컴포넌트를 사용하기위해 구조하는거야?

###### ChatGPT의 말:

네, 맞아요! 🎯

`entities/` 폴더를 만드는 이유는 **features에서 공통으로 사용될 수 있는 비즈니스 로직과 상태, UI 컴포넌트를 한 곳에 모아 재사용성을 높이기 위해서**예요.

---

### **✅ 왜 `entities` 레이어를 따로 둘까?**

1. **재사용성** → 여러 `features`에서 같은 엔터티(예: `User`, `Product`)를 사용 가능
2. **일관된 상태 관리** → `features`마다 따로 관리하면 일관성이 깨지지만, `entities`에서 관리하면 유지보수 쉬움
3. **도메인 중심 설계** → 애플리케이션의 핵심 데이터를 다루는 레이어이므로 명확한 구조 유지 가능

---

### **📌 예제: `User` 엔터티 활용**

#### 1️⃣ `entities/user/` (공통 상태 및 UI 제공)

```javascript
// entities/user/model.ts (전역 상태)
import { createStore } from 'effector'

export const $user = (createStore < User) | (null > null)
```

#### 2️⃣ `features/auth/` (로그인/회원가입에서 사용)

```javascript
// features/auth/ui/LoginForm.tsx
import { useStore } from 'effector-react'
import { $user } from '@/entities/user/model'
import { UserAvatar } from '@/entities/user/ui/UserAvatar'

export const LoginForm = () => {
  const user = useStore($user)

  return (
    <div>
      {user && <UserAvatar user={user} />}
      <button>로그인</button>
    </div>
  )
}
```

#### 3️⃣ features/profile/ (프로필 페이지에서도 재사용) tsx 복사 편집

```javascript
// features/profile/ui/Profile.tsx
import { useStore } from 'effector-react'
import { $user } from '@/entities/user/model'
import { UserAvatar } from '@/entities/user/ui/UserAvatar'

export const Profile = () => {
  const user = useStore($user)

  return (
    <div>
      <h2>프로필</h2>
      {user && <UserAvatar user={user} />}
    </div>
  )
}
```

### **🚀 결론**

✔ `entities/`가 있으면 `features/`에서 중복 코드 없이 공통 데이터와 UI를 재사용할 수 있음
✔ 도메인 로직이 한 곳에 모여 있어서 유지보수 및 확장성 향상
✔ `features/`는 특정 기능에 집중하고, `entities/`는 핵심 데이터를 관리

이렇게 하면 `features/auth`나 `features/profile`에서 **같은 `User` 엔터티를 재사용**할 수 있기 때문에, **더 깔끔하고 유지보수하기 쉬운 구조**가 되는 거예요! 😊

# widgets

### **✅ `widgets/` 폴더의 역할은?**

`widgets/`는 **엔터티(`entities/`)나 기능(`features/`)을 조합하여 특정한 UI 블록을 구성하는 역할**을 합니다.
즉, **여러 `features`에서 사용할 수 있는 독립적인 UI 조각**이라고 보면 돼요.

## **🔍 `widgets/` vs 다른 레이어 비교**

| 레이어      | 역할                                      | 재사용 범위                              | 예제                             |
| ----------- | ----------------------------------------- | ---------------------------------------- | -------------------------------- |
| `entities/` | 핵심 데이터 & 상태 관리, 공통 UI 제공     | 전역 (`features`,`widgets`에서 사용)     | `User`,`Product`,`Post`          |
| `features/` | 특정 기능 (로그인, 검색, 장바구니 등)     | 독립적 (`routes`에서 사용)               | `auth`,`search`,`cart`           |
| `widgets/`  | 여러 `features`를 조합하여 UI 블록을 만듦 | `routes`및 여러 `features`에서 사용 가능 | `Navbar`,`Sidebar`,`ProfileCard` |
