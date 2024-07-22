export const fetchData = async (coinName: string) => {
  try {
    const res = await fetch(
      `/api/getCoinData?coinName=${encodeURIComponent(coinName)}`,
      {
        method: "GET",
        // body: coinName,
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const result = await res.json();
    return result || [];
  } catch (error) {
    return error;
  }
};

export const saveSelectedCoin = async (name: string, code: string) => {
  try {
    const response = await fetch("/api/currentCoin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, code }),
    });
    const data = await response.json();
    if (response.ok) {
      console.log("Selected coin saved successfully:", data);
    } else {
      console.error("Error saving selected coin:", data.message);
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

export const updateBackendData = async () => {
  try {
    const response = await fetch("/api/coins", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log("error");
  }
};
