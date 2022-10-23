import app from "../src/index";
import request from "supertest";

const instance = request(app);

export const makeTestRequest = (
  method: string,
  url: string,
  data?: any,
  jwtToken?: string
): Promise<any> => {
  if (jwtToken)
    return instance[method](url).set("Authorization", `Bearer ${jwtToken}`);
  return instance[method](url).send(data);
};
