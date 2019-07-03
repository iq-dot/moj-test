/** Simple in-memory cache */

const store: any = {};

/**
 * Add a value to the in-memory store
 * @param key
 * @param value
 */
export const addToStore = (key: any, value: any) => {
    store[key] = value;
};


/**
 * Retreive a value from the in-memory store
 * @param key
 */
export const getFromStore = (key: any): any => {
    return store[key];
};


/**
 * This will store the anagram for the given word but in addition
 * it will also create a reverse by storing the same words as the anagram
 * result of each word in the array as they  are anagram of each other.
 * This is a progressive build up of anagram results so subsequent requests are faster.
 * Ideally this should be moved from in-memory to a dedicated key/value store like Redis.
 *
 * @param word
 * @param anagrams
 */
export const storeAnagramMap = (word: string, anagrams: string[]) => {
    addToStore(word, anagrams);

    for (let i = 0; i < anagrams.length; i++) {
        const altWord = anagrams[i];
        const altAnagram = [...anagrams.slice(0, i), ...anagrams.slice(i + 1)];
        addToStore(altWord, anagrams);
    }
};


/**
 * Store an array of words grouped by length
 * @param words
 */
export const storeWordbyLength = (words: string[]) => {
    words.forEach(w => {
        const cleanW = w.trim();
        if (!store[cleanW.length]) {
            store[cleanW.length] = [];
        }
        store[cleanW.length].push(cleanW);
    });
};
