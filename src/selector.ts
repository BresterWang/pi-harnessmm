/**
 * Reply parsing for the one-label selector.
 *
 * pi exposes no logprobs, so the selector cannot read a probability: it offers the
 * eligible labels and accepts only a label the reply actually names. Anything else
 * is an abstention, which returns the step to slow reasoning.
 */

/** The label a selector reply names, or `?` when it names none it was offered. */
export function pickLabel(reply: string, labels: readonly string[]): string {
  // A standalone letter, optionally wrapped in punctuation or prose: `ABORT` must not read as `A`.
  const match = /(?:^|[^A-Z])([A-P])(?![A-Z])/.exec(reply.trim().toUpperCase());
  return match && labels.includes(match[1]) ? match[1] : "?";
}
