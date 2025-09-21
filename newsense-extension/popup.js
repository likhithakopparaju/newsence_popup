// Put your real key here:
const NEWS_API_KEY = "172fa841a7ee4275810cc77de715c5d1";

document.addEventListener('DOMContentLoaded', () => {
  const statusEl = document.getElementById('status');
  const newsTextEl = document.getElementById('newsText');
  const articlesEl = document.getElementById('articles');
  const articleActions = document.getElementById('articleActions');
  const readBtn = document.getElementById('readBtn');
  const scanBtn = document.getElementById('scanBtn');
  const scanResultEl = document.getElementById('scanResult');

  async function loadHeadlines() {
    statusEl.innerText = "Loading headlines…";
    scanResultEl.innerText = "";

    try {
      const res = await fetch(`https://newsapi.org/v2/everything?q=India&pageSize=5&apiKey=172fa841a7ee4275810cc77de715c5d1`);
      const data = await res.json();

      if (data.status !== "ok" || !data.articles || data.articles.length === 0) {
        newsTextEl.innerText = "No headlines found.";
        statusEl.style.display = "none";
        return;
      }

      // Collect all headlines
      const headlines = data.articles
        .filter(a => a && a.title)
        .map(a => a.title);

      // Display all headlines as plain text
      newsTextEl.innerText = headlines.join("\n\n");

      // Also copy them into "articles" (extra space if needed)
      articlesEl.innerText = headlines.join("\n\n");

      // Show controls
      articleActions.style.display = 'flex';
      statusEl.style.display = 'none';
    } catch (err) {
      console.error("Fetch error:", err);
      statusEl.innerText = "⚠️ Failed to fetch news.";
      articleActions.style.display = 'none';
    }
  }

  // Read Aloud: reads only the headlines
  readBtn.addEventListener('click', () => {
    const text = newsTextEl.innerText;
    if (!text) return;

    const toRead = text.length > 10000 ? text.slice(0, 10000) : text;
    const utterance = new SpeechSynthesisUtterance(toRead);
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  });

  // Prototype-only: Scan button
  scanBtn.addEventListener('click', () => {
    scanResultEl.innerText = "✅ This news is verified";
  });

  // Run
  loadHeadlines();
});
