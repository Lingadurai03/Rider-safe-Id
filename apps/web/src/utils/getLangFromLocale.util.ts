import { LOCALMAP } from '@/constant';

export const getLangFromLocale = (locale: string) =>
    Object.keys(LOCALMAP).find((key) => LOCALMAP[key] === locale) || 'English';
