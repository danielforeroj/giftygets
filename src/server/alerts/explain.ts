export function explainAlert(input: { title: string; why: string[]; verifiedPrice: number; verifiedAvailability: boolean }) {
  if (!input.verifiedAvailability) return 'No alert sent because availability was not verified.';
  return `${input.title} is verified in stock at ${input.verifiedPrice} cents. ${input.why.join('; ')}`;
}
