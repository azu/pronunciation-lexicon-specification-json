// MIT © 2017 azu
import * as assert from "assert";
import * as fs from "fs";
import * as path from "path";
import { toPLSJSON } from "../src/pronunciation-lexicon-builder";

describe("pronunciation-lexicon-builder", () => {
    const fixturesDir = path.join(__dirname, "json-to-PLSJSON");
    fs.readdirSync(fixturesDir).map(caseName => {
        it(`should generate assertions for ${caseName.replace(/-/g, " ")}`, () => {
            const fixtureDir = path.join(fixturesDir, caseName);
            const actualPath = path.join(fixtureDir, "input.json");
            const actual = toPLSJSON(require(actualPath));
            const expected = require(path.join(fixtureDir, "output.json"));
            assert.deepStrictEqual(actual, expected);
        });
    });
});
