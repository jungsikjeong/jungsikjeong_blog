"use client";

export default function Home() {
  return (
    <div>
      <button
        onClick={() => {
          fetch("/api/login", {
            method: "POST",
          })
            .then((res) => {
              if (!res.ok) {
                throw new Error(`HTTP 오류! 상태: ${res.status}`);
              }
              return res.json();
            })
            .then((data) => {
              console.log(data);
            })
            .catch((err) => {
              console.log("로그인에러:", err);
            });
        }}
      >
        로그인
      </button>
    </div>
  );
}
