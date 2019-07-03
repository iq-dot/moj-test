'use strict';

import { Response, Request } from 'express';

import * as cache from '../util/anagram-cache';

type AnagramResponse = {
    [key: string]: string[]
};

// TODO: Handle array of words
/**
 * GET /:word
 * Get an anagram of an alphanumberic word, will exclude pure numeric values
 */
export const getAnagram = (req: Request, res: Response) => {

    if (!isNaN(req.params.word)) {
        return res
        .status(400)
        .send({ error: 'Numbers not allowed'});
    }

    const cleanWords: string[] = req.params.word.trim().toLowerCase().split(',');
    const result: AnagramResponse  = {};

    cleanWords.forEach(w => {
        let anagrams = cache.getFromStore(w);

        // no cache hit, calculate anagram
        if (!anagrams) {
            anagrams = _getAnagrams(w);
            cache.storeAnagramMap(w, anagrams);
        }

        result[w] = anagrams;
    });

    return res.send(result);
};


/**
 * For a given word find all the anagram, this is partially optimised
 * to only look at strings with the same length as the provided word.
 * @param word
 * @private
 */
function _getAnagrams(word: string): string[] {
    const wordArr: string[] = cache.getFromStore(word.length);
    const sortedWord = word.split('').sort().join();
    const result: string[] = [];

    // go through each word from the array that have the same length as the
    // original word, sort and compare if same as original.
    wordArr.forEach(w => {

        // skip the original word
        if (w === word) {
            return;
        }

        const sortedW = w.split('').sort().join();
        if (sortedWord === sortedW) {
            result.push(w);
        }
    });

    return result;
}
