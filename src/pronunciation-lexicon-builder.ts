// MIT © 2017 azu
import groupBy = require("lodash.groupBy");

export interface BuilderJSON {
    lexeme: Lexeme[];
}

export interface Lexeme {
    lang: string;
    grapheme: string | string[];
    phoneme: string;
}

// return divided by country
export function toPLSJSON(json: BuilderJSON, _options?: any) {
    const langGroups = groupBy(json.lexeme, (lexeme: Lexeme) => {
        return lexeme.lang;
    });
    return Object.keys(langGroups).map(langName => {
        return {
            _declaration: {
                _attributes: {
                    version: "1.0",
                    encoding: "UTF-8"
                }
            },
            lexicon: {
                _attributes: {
                    version: "1.0",
                    xmlns: "http://www.w3.org/2005/01/pronunciation-lexicon",
                    "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
                    "xsi:schemaLocation":
                        "http://www.w3.org/2005/01/pronunciation-lexicon \n        http://www.w3.org/TR/2007/CR-pronunciation-lexicon-20071212/pls.xsd",
                    alphabet: "ipa",
                    "xml:lang": langName
                },
                lexeme: langGroups[langName].map((lexeme: Lexeme) => {
                    return {
                        grapheme: {
                            _text: lexeme.grapheme
                        },
                        phoneme: {
                            _text: lexeme.phoneme
                        }
                    };
                })
            }
        };
    });
}
