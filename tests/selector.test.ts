/**
 * Selector reply parsing: only an offered label is a decision, everything else abstains.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { pickLabel } from "../src/selector.ts";

const labels = ["A", "B"];

test("a bare label is the decision, with any surrounding whitespace or case", () => {
  assert.equal(pickLabel("A", labels), "A");
  assert.equal(pickLabel(" b\n", labels), "B");
  assert.equal(pickLabel("B.", labels), "B");
  assert.equal(pickLabel("Answer: A", labels), "A");
});

test("a label the selector did not offer is an abstention", () => {
  assert.equal(pickLabel("C", labels), "?");
  assert.equal(pickLabel("", labels), "?");
  assert.equal(pickLabel("   ", labels), "?");
  assert.equal(pickLabel("?", labels), "?");
});

test("a word that only starts with a label letter is an abstention", () => {
  assert.equal(pickLabel("ABORT", labels), "?");
  assert.equal(pickLabel("BOTH", labels), "?");
  assert.equal(pickLabel("A or B", labels), "A");
});
