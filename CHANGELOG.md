# Changelog

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
