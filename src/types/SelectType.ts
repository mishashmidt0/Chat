import { SelectLanguage } from '../enums/enum-channels';

export type languageType =
  | SelectLanguage.Russian
  | SelectLanguage.English
  | SelectLanguage.Chinese;

export type selectType = {
  id: string;
  language: languageType;
}[];
