type AvatarType = "identicon" | "croodles-neutral" | "croodles";
/**
 * Generates random avatar from external api
 * @param {AvatarType} type This is the type of avatar
 */
export declare const getAvatar: (type: AvatarType) => string;
export {};
