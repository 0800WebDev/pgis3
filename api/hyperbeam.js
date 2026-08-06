export default async function handler(req, res) {
  const response = await fetch("https://engine.hyperbeam.com/v0/vm", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.HB_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
  start_url: "https://www.google.com",
  timeout: {
    absolute: 300
  }
})
  });

  const data = await response.json();

  if (!response.ok) {
    return res.status(response.status).json(data);
  }

  res.json({
    embed_url: data.embed_url
  });
}
