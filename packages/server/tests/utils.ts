import app from "../src/index";
import request from "supertest";
import logger from "../src/utils/logger";

const instance = request(app);

export const makeTestRequest = (
  method: string,
  url: string,
  data?: any,
  jwtToken?: string
): Promise<any> => {
  if (jwtToken)
    return instance[method](url)
      .set({
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/x-www-form-urlencoded",
      })
      .send(data);
  return instance[method](url)
    .set("Content-Type", "application/json")
    .send(data);
};
