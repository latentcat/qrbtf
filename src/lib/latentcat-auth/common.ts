export interface UserPayload {
  id: string;
  name: string;
  picture: string;
}

export enum UserTier {
  Trial = 0,
  Alpha,
}
export interface QrbtfUserData {
  tier?: UserTier;
  subscribe_time?: Date;
  subscribe_expire?: Date;
}

export type QrbtfUser = UserPayload & QrbtfUserData;
