const cards: Card[] = [
  {
    id: 1,
    cardType: "mastercard",
    cardNumber: "1579",
    ownerName: "Amanda Morgan",
    expiry: "12/22",
  },
  {
    id: 2,
    cardType: "visa",
    cardNumber: "4234",
    ownerName: "John Doe",
    expiry: "08/25",
  },
];
type Card = {
  id: number;
  cardType: "mastercard" | "visa";
  cardNumber: string;
  ownerName: string;
  expiry: string;
};
export type { Card };
export default cards;
