import {
  VikingsId,
  ClanId,
  FriendsId,
  GeneralId,
  HuntersId,
  NewsId,
} from '../../constants/const-channels';

export type message = {
  id: string;
  from: string;
  text: string;
  createdAt: string;
};

export type finalMessage = message & { lvl: number };

export type messageKey =
  | typeof VikingsId
  | typeof ClanId
  | typeof FriendsId
  | typeof GeneralId
  | typeof HuntersId
  | typeof NewsId;
