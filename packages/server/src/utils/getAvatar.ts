import { env } from "../env/server";
import { v4 as uuidv4 } from "uuid";

const { AVATAR_API_HOST, AVATAR_API_PROTOCOL } = env;

type AvatarType = "identicon" | "croodles-neutral" | "croodles";

/**
 * Generates random avatar from external api
 * @param {AvatarType} type This is the type of avatar
 */
export const getAvatar = (type: AvatarType): string =>
  `${AVATAR_API_PROTOCOL}://${AVATAR_API_HOST}/${type}/${uuidv4()}.svg`;
