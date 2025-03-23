import { http, HttpResponse } from "msw";

import { faker } from "@faker-js/faker";

// function generateDate() {
//   const lastWeek = new Date(Date.now());
//   lastWeek.setDate(lastWeek.getDate() - 7);
//   return faker.date.between({
//     from: lastWeek,
//     to: Date.now(),
//   });
// }
const User = [
  { id: "asdasd", nickname: "sadasd", image: faker.image.avatar() },
  { id: "asdas", nickname: "정중식", image: faker.image.avatar() },
  { id: "asdasddas", nickname: "123123", image: faker.image.avatar() },
];

export const handlers = [
  http.post("/api/login", () => {
    console.log("로그인zzz");
    return HttpResponse.json(User[1], {
      headers: {
        "Set-Cookie": "connect.sid=msw-cookie;HttpOnly;Path=/",
      },
    });
  }),
];
