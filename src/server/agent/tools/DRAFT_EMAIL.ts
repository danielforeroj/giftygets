export function DRAFT_EMAIL(input: { title: string; verifiedReasons: string[] }) {
  return {
    subject: `${input.title} is ready`,
    snippet: 'Verified stock alert from Gifty Gets',
    body: `Verified: ${input.verifiedReasons.join(', ')}`
  };
}
