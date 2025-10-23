/*
EXAMPLES: 

GET : const users = await fetchDatas("http://localhost:3000/api/users");

POST : const newUser = await fetchDatas("http://localhost:3000/api/users", "POST", {
  email: "alice@gmail.com",
  name: "Alice",
});
*/

const fetchDatas = async (url, method = "GET", data = null) => {
  try {
    // Build fetch options
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    // If data is provided, attach it to the body
    if (data) {
      options.body = JSON.stringify(data);
    }

    // Perform the fetch
    const response = await fetch(url, options);

    // Check if the response is not ok (status 400 - 500)
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Unknown fetch error");
    }

    // Parse and return JSON
    const res = await response.json();
    console.info("Fetch success:", res);
    return res;
  } catch (error) {
    console.error("Fetch error:", error.message);
    return null;
  }
};

export default fetchDatas;

