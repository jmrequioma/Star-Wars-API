import { dictionary } from '@/lib/lang.js';

export function useTranslateWookiee() {
    function translateWookieeToEnglish(wookieeWord : string) {
        for (const word in dictionary) {
            if (dictionary[word].wk == wookieeWord) {
                return dictionary[word].en;
            }
        }
        return '';
    }

    function translateEnglishToWookie(englishWord: string) {
        for (const word in dictionary) {
            if (dictionary[word].en == englishWord) {
                return dictionary[word].wk;
            }
        }
        return '';
    }

    return {
        translateWookieeToEnglish,
        translateEnglishToWookie
    };
}