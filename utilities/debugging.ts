export function getCardIdentifierString(card?: Card) {
  return card ? `${card.id}: ${card.title}` : 'none'
}
