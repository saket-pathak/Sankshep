document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('summarizeForm');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const summaryResult = document.getElementById('summaryResult');
    const summaryText = document.getElementById('summaryText');
    const historySection = document.getElementById('historySection');
    const historyContainer = document.getElementById('historyContainer');

    const downloadBtn = document.getElementById('downloadBtn');
    const copyBtn = document.getElementById('copyBtn');
    const historyBtn = document.getElementById('historyBtn');
    const themeToggle = document.getElementById('themeToggle');

    const inputModeRadios = document.querySelectorAll('input[name="input_mode"]');
    const textContainer = document.getElementById("textContainer");
    const fileContainer = document.getElementById("fileContainer");

    const inputText = document.getElementById("inputText");
    const charCount = document.getElementById("charCount");

    const lengthSlider = document.getElementById("lengthSlider");
    const lengthValue = document.getElementById("lengthValue");

    let summaryHistory = [];
    let currentSummary = "";
    let typingActive = false;

    /* =========================
       DARK MODE (STABLE)
    ========================== */

    function applySavedTheme() {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            document.body.classList.add("dark-mode");
            if (themeToggle) themeToggle.innerText = "☀️ Light Mode";
        } else {
            if (themeToggle) themeToggle.innerText = "🌙 Dark Mode";
        }
    }

    applySavedTheme();

    if (themeToggle) {
        themeToggle.addEventListener("click", function () {

            document.body.classList.toggle("dark-mode");

            const isDark = document.body.classList.contains("dark-mode");

            if (isDark) {
                themeToggle.innerText = "☀️ Light Mode";
                localStorage.setItem("theme", "dark");
            } else {
                themeToggle.innerText = "🌙 Dark Mode";
                localStorage.setItem("theme", "light");
            }

            // 🔥 RESTORE SUMMARY SAFELY
            if (currentSummary !== "") {
                summaryText.innerText = currentSummary;
            }
        });
    }

    /* =========================
       INPUT MODE TOGGLE
    ========================== */

    inputModeRadios.forEach(radio => {
        radio.addEventListener("change", function () {
            if (this.value === "text") {
                textContainer.classList.remove("d-none");
                fileContainer.classList.add("d-none");
            } else {
                textContainer.classList.add("d-none");
                fileContainer.classList.remove("d-none");
            }
        });
    });

    /* =========================
       CHARACTER COUNTER
    ========================== */

    if (inputText && charCount) {
        inputText.addEventListener("input", function () {
            charCount.textContent =
                `${this.value.length} characters (Limit: 15,000)`;
        });
    }

    /* =========================
       SLIDER
    ========================== */

    if (lengthSlider && lengthValue) {
        lengthSlider.addEventListener("input", function () {
            lengthValue.textContent = this.value;
        });
    }

    /* =========================
       TYPING ANIMATION (SAFE)
    ========================== */

    function typeEffect(text, element, speed = 10) {

        typingActive = true;
        element.innerHTML = "";
        let i = 0;
        element.classList.add("typing");

        function typing() {
            if (!typingActive) return;

            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(typing, speed);
            } else {
                element.classList.remove("typing");
                typingActive = false;
            }
        }

        typing();
    }

    /* =========================
       FORM SUBMIT
    ========================== */

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(form);

        loadingIndicator.classList.remove('d-none');
        summaryResult.classList.add('d-none');

        fetch('/summarize', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {

            loadingIndicator.classList.add('d-none');

            if (data.success) {

                const fullSummary =
`${data.summary}

----------------------------------

Original Words: ${data.original_words}
Summary Words: ${data.summary_words}
Reduction: ${data.reduction}%`;

                currentSummary = fullSummary;

                summaryResult.classList.remove('d-none');

                // Stop any previous animation
                typingActive = false;

                // Start new animation
                typeEffect(currentSummary, summaryText);

                // Save history
                summaryHistory.unshift(data.summary);
                if (summaryHistory.length > 5) summaryHistory.pop();

            } else {
                alert(data.message);
            }
        })
        .catch(() => {
            loadingIndicator.classList.add('d-none');
            alert("Unexpected error occurred.");
        });
    });

    /* =========================
       DOWNLOAD
    ========================== */

    if (downloadBtn) {
        downloadBtn.addEventListener("click", function () {

            const now = new Date();
            const fileName =
                `summary_${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}.txt`;

            const blob = new Blob([currentSummary], { type: "text/plain" });
            const link = document.createElement("a");

            link.href = URL.createObjectURL(blob);
            link.download = fileName;
            link.click();
        });
    }

    /* =========================
       COPY
    ========================== */

    if (copyBtn) {
        copyBtn.addEventListener("click", function () {
            navigator.clipboard.writeText(currentSummary);

            copyBtn.innerText = "Copied!";
            setTimeout(() => {
                copyBtn.innerText = "Copy";
            }, 1500);
        });
    }

    /* =========================
       HISTORY
    ========================== */

    if (historyBtn) {
        historyBtn.addEventListener("click", function () {

            historySection.classList.toggle("d-none");
            historyContainer.innerHTML = "";

            summaryHistory.forEach((item, index) => {
                historyContainer.innerHTML += `
                    <div class="mb-3 p-3 border rounded">
                        <strong>Summary ${index + 1}</strong>
                        <p style="white-space: pre-line; margin-top:8px;">
                            ${item}
                        </p>
                    </div>
                `;
            });
        });
    }

});
