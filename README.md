# 🚀 Sankshep

An AI-Powered Smart Text Summarizer built with Flask and NLP.

“Main Baat Yeh Hai” focuses on extracting the core idea from long text efficiently using intelligent sentence scoring and optional file upload support.

---

## ✨ Features

- 🔹 Extractive Text Summarization (NLTK-based)
- 🔹 Adjustable Summary Length (2–15 sentences)
- 🔹 Paragraph or Bullet Point Output
- 🔹 Upload .txt File Support (up to 1MB)
- 🔹 Auto-trimming for large content (15,000 characters limit)
- 🔹 Word Count & Reduction Percentage Metrics
- 🔹 Download Summary as .txt
- 🔹 Copy to Clipboard
- 🔹 Summary History (last 5 summaries)
- 🔹 Animated Typing Effect
- 🔹 Light / Dark Mode with Smooth Transitions
- 🔹 Responsive Glassmorphism UI

---

## 🛠️ Tech Stack

**Backend**
- Python
- Flask
- NLTK (Natural Language Toolkit)

**Frontend**
- HTML5
- CSS3 (Animated Gradients + Glassmorphism)
- JavaScript (Vanilla JS)
- Bootstrap 5

---

## 🧠 How It Works

The application uses an extractive summarization approach:

1. Tokenizes text into sentences and words.
2. Removes stopwords and punctuation.
3. Scores sentences based on word frequency.
4. Selects top N highest-scoring sentences.
5. Formats output as paragraph or bullet points.

Optional Advanced Mode (LLM-ready architecture prepared).

---

## 📂 Project Structure

```
MAIN-BAAT-YEH-HAI/
│
├── app.py
├── summarizer.py
├── templates/
│   └── index.html
├── static/
│   ├── styles.css
│   └── script.js
└── requirements.txt
```

---

## ⚙️ Installation (Local Setup)

```bash
git clone https://github.com/saket-pathak/MAIN-BAAT-YEH-HAI.git
cd MAIN-BAAT-YEH-HAI

python -m venv venv
venv\Scripts\activate  # Windows

pip install -r requirements.txt
python app.py
```

Open:
```
http://127.0.0.1:5000
```

---

## 📊 Example Capabilities

- Summarize large academic text
- Extract key points from articles
- Generate structured bullet summaries
- Analyze compression percentage

---

## 🌗 UI Highlights

- Animated gradient background
- Smooth theme transitions
- Typing animation effect
- Modern glass card layout

---

## 🚀 Future Improvements

- Deploy Advanced AI (LLM) Mode
- PDF file support
- Authentication & user accounts
- Database-based summary storage
- API version for integration

---

## 👨‍💻 Author

**Saket Pathak**  
B.Tech CSE | AI & Full-Stack Enthusiast  
GitHub: https://github.com/saket-pathak  

---

## 📜 License

This project is open-source for learning and educational purposes.
