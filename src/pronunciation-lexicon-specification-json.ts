// MIT © 2017 azu
import { js2xml } from "xml-js";

export interface BuilderJSON {
    lang: string;
    alphabet: string;
    lexeme: Lexeme[];
}

export interface Lexeme {
    grapheme: string | string[];
    phoneme?: string;
    alias?: string;
}

export interface PLBOptions {}

export const DefaultOptions: PLBOptions = {};

// return xml
export function toPLSXML(json: BuilderJSON, options: PLBOptions = DefaultOptions) {
    return js2xml(toPLSJSON(json, options), { compact: true, spaces: 4 });
}

// return json that is not official format
export function toPLSJSON(json: BuilderJSON, _options: PLBOptions = DefaultOptions) {
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
                    "http://www.w3.org/2005/01/pronunciation-lexicon " +
                    "http://www.w3.org/TR/2007/CR-pronunciation-lexicon-20071212/pls.xsd",
                alphabet: json.alphabet,
                "xml:lang": json.lang
            },
            lexeme: json.lexeme.map((lexeme: Lexeme) => {
                return {
                    grapheme: Array.isArray(lexeme.grapheme)
                        ? lexeme.grapheme.map(grapheme => {
                              return {
                                  _text: grapheme
                              };
                          })
                        : {
                              _text: lexeme.grapheme
                          },
                    ...lexeme.phoneme
                        ? {
                              phoneme: {
                                  _text: lexeme.phoneme
                              }
                          }
                        : {},
                    ...lexeme.alias
                        ? {
                              alias: {
                                  _text: lexeme.alias
                              }
                          }
                        : {}
                };
            })
        }
    };
}
