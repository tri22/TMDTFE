import { CategoryCount } from "@/models/CategoryCount";

const API_BASE = "http://localhost:8080/api/v1";
const SERVER_URL_BASE = "http://localhost:8080";

export async function getCategoryCount(): Promise<CategoryCount[]> {
//   console.log("getCategoryCount");
  const url = new URL(`${API_BASE}/categories/count`);

  const response = await fetch(url.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Không thể tải category");
  }

//   console.log("getCategoryCount: ok");
  const data: CategoryCount[] = await response.json();
//   console.log("data: " + JSON.stringify(data, null, 2));
  return data;
}
