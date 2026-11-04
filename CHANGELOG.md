# Changelog

## [0.1.3] - 2026-11-04

Correct the selector budget with a measurement instead of a guess.

- The selector asked for one output token, then for 256. Against a reasoning model both budgets are consumed by a
  reasoning item and no text is emitted at all, so every multi-candidate bank abstained and paid for a selector call it
  could never use. 1024 output tokens was measured to produce the label after roughly 900 reasoning tokens; a request
  with `reasoning.effort: "none"` needs one, but that effort value is provider-specific and is not exposed by pi, so the
  budget stays provider-neutral.
- The selector reply parsing moved to `src/selector.ts` and is covered: an offered label with surrounding prose, an
  unoffered one, and a word that merely starts with a label letter.
- An abstention now records `jev/selector-abstained` with the reply, its content part types and its usage, because it is
  the one silent path that costs the caller a substitution.

## [0.1.2] - 2026-11-04

Fail closed where the contract said it would.

- A candidate argument containing `${...}`, `{{...}}` or `$(...)` is refused by the parser. The README and the
  tool's own guidance already called it a contract violation, but nothing checked it, so `echo ${HOME}` was executed
  with the placeholder expanded by the shell and certified as a valid substitution. Reserved for arguments only: a
  guard may still compare a literal that looks like a placeholder.
- The selector asks for 1024 tokens rather than 1 and accepts a bare label surrounded by prose or punctuation. A
  reasoning model answers a smaller budget with a reasoning item and no text, which made every multi-candidate bank
  abstain. `ABORT` still reads as an abstention, not as label `A`.

## [0.1.1] - 2026-11-04

Windows support for the terminal adapter.

- The shell is no longer hardcoded to `/bin/bash`: Windows uses the first existing Git Bash install, falling back to
  `bash.exe` from the PATH. Previously every command on Windows returned 127 from a `spawn ENOENT`.
- A timed-out command is killed with `taskkill /T /F` on Windows, so children no longer keep the pipes open and hold
  the turn until they exit on their own.
- The cwd test compares the last path segment, so the suite passes under MSYS and macOS path translation.

## [0.1.0] - 2026-11-02

Initial port of HarnessMM (arXiv 2610.32813) to pi.

- `terminal` tool returning native `{return_code, stdout, stderr}` receipts with separated streams.
- `<CHISEL_PLAN>` Executable Decision Graph contract, byte-identical authoring instruction for policy versions 1-11.
- Guarded decision reuse: `localGuard` and `receiptGuard`, deterministic admission with the 1024-token net-saving
  threshold, priors-based admission for versions 8 and 10 that fails closed without frozen TRAIN medians.
- Certified callback substitution: `certified-native-substitution/v1` certificates binding arguments, receipt and
  the bypassed reasoning callback.
- Bank removal from the slow context, preserving reasoning and native actions.
- `/harnessmm` ledger command.
