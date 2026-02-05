export function alertEmailTemplate(input: { subject: string; body: string; unsubscribeUrl: string }) {
  return `<h1>${input.subject}</h1><p>${input.body}</p><p><a href="${input.unsubscribeUrl}">Unsubscribe</a></p>`;
}
