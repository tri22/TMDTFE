import creditCardApi from "@/api/creditCardApi";

const bankLogos: { [key: string]: { name: string; logo: string } } = {
  "970436": {
    name: "Vietcombank",
    logo: "https://i.pinimg.com/736x/80/1d/11/801d116027d9523390684fdb860f4199.jpg"
  },
  "970418": {
    name: "BIDV",
    logo: "https://i.pinimg.com/736x/af/48/e8/af48e85232fe63f9b6d064548df6c44e.jpg"
  },
  "970422": {
    name: "Agribank",
    logo: "https://i.pinimg.com/736x/a3/d4/b5/a3d4b5a4fd8f32db689ab50e777025df.jpg"
  },
  "970405": {
    name: "VietinBank",
    logo: "https://i.pinimg.com/736x/1f/b7/d0/1fb7d0cae3f7149d4fc7ffb61fa095e5.jpg"
  },
  "970423": {
    name: "ACB",
    logo: "https://i.pinimg.com/736x/4e/7f/b5/4e7fb57891725caa8347ed29ec0bc993.jpg"
  },
  "970407": {
    name: "Techcombank",
    logo: "https://i.pinimg.com/736x/a2/9a/a8/a29aa86bdaad3c3bdfef3b52064dd390.jpg"
  },
  "970403": {
    name: "Sacombank",
    logo: "https://i.pinimg.com/736x/23/04/2a/23042af6f4c9588163a5d99083f08cf3.jpg"
  },
  "970432": {
    name: "TPBank",
    logo: "https://i.pinimg.com/736x/a8/e9/31/a8e931d65a17267bed9642dfc2f65e8b.jpg"
  },
  "970441": {
    name: "VPBank",
    logo: "https://i.pinimg.com/736x/55/0c/5e/550c5e38096bca994f857e766cc865ca.jpg"
  },
  "970419": {
    name: "MB Bank",
    logo: "https://i.pinimg.com/736x/18/b4/57/18b457a25f54edb34eaf33a38c78d920.jpg"
  },
  "970409": {
    name: "HDBank",
    logo: "https://i.pinimg.com/736x/c0/4a/d9/c04ad9ba1448d6bb75b01c15c530af57.jpg"
  },
  "970428": {
    name: "VIB",
    logo: "https://i.pinimg.com/736x/92/32/bf/9232bfeec3a935b9649d158c89d23d96.jpg"
  },
  "970454": {
    name: "MSB",
    logo: "https://i.pinimg.com/736x/92/dd/9d/92dd9ddf90fef6277a3109f51b03dcbd.jpg"
  },
};
type Card = {
  logo: string,
  id: number;
  cardNumber: string;
  ownerName: string;
  expiry: string;
};

async function fetchCreditCard(id: number): Promise<Card[]> {
  try {
    const object = await creditCardApi.getAllByUserId(id);
    const cards: Card[] = [];

    for (const item of object.data) {
      const { id, number, ownerName, expiryDate } = item;
      const bin = number.substring(0, 6);
      const bank = bankLogos[bin];

      cards.push({
        logo: bank?.logo || "",
        id,
        cardNumber: number,
        ownerName,
        expiry: expiryDate,
      });
    }

    return cards;
  } catch (error) {
    console.error("Lỗi khi lấy data:", error);
    return [];
  }
}

export { fetchCreditCard };
export type { Card };

