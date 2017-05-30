import { englishMessages } from 'admin-on-rest';
import chineseMessages from 'aor-language-chinese';

import customEnglishMessages from './en';
import customChineseMessages from './zh';

export default {
    en: { ...englishMessages, ...customEnglishMessages },
    zh: { ...chineseMessages, ...customChineseMessages },
};
