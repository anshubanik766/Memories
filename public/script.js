
function toggleTheme() {
    document.body.classList.toggle("light");
}

function toggleSound() {
    const sound = document.getElementById("ambientSound");
    if (!sound) return;

    if (sound.paused) {
        sound.volume = 0.5;
        sound.play();
    } else {
        sound.pause();
    }
}


function scrollDown() {
    window.scrollBy({ top: window.innerHeight * 0.6, behavior: "smooth" });
}

window.addEventListener("scroll", () => {
    const indicator = document.querySelector(".scroll-indicator");
    if (indicator && window.scrollY > 100) {
        indicator.style.opacity = "0";
        indicator.style.pointerEvents = "none";
    }
});


const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedY = Math.random() * 0.3 + 0.1;
        this.alpha = Math.random() * 0.6 + 0.2;
    }
    update() { this.y -= this.speedY; if (this.y < 0) this.y = canvas.height; }
    draw() { ctx.fillStyle = `rgba(255,120,180,${this.alpha})`; ctx.beginPath(); ctx.arc(this.x,this.y,this.size,0,Math.PI*2); ctx.fill(); }
}

function initParticles(count=80) {
    particles = []; for(let i=0;i<count;i++) particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

function createMemory() {
    const name = document.getElementById("person").value.trim();
    const desc = document.getElementById("memory").value.trim();
    if (!name || !desc) return alert("Please fill in both fields");

    localStorage.setItem("memory", JSON.stringify({ name, desc }));

    const btn = document.getElementById("createMemoryBtn");
    btn.innerText = "Creating memories...";
    btn.disabled = true;

    setTimeout(() => window.location.href="memory.html", 1200);
}

function openMessage() {
    const box = document.getElementById("messageBox");
    if (box) box.classList.toggle("show");
}

function saveMessage() {
    const msg = document.getElementById("userMessage").value.trim();
    if (!msg) return;

    let messages = JSON.parse(localStorage.getItem("userMessages")||"[]");
    messages.push(msg);
    localStorage.setItem("userMessages", JSON.stringify(messages));

    document.getElementById("userMessage").value="";
    addTimelineCard(msg);
}

function addTimelineCard(text) {
    const timeline = document.getElementById("timeline");
    if (!timeline) return;
    const card = document.createElement("div");
    card.className="timeline-card visible";
    card.innerText=text;
    timeline.appendChild(card);
}


JSON.parse(localStorage.getItem("userMessages")||"[]").forEach(addTimelineCard);

const memoryData = JSON.parse(localStorage.getItem("memory"));

if (memoryData) {
    const {name, desc} = memoryData;

    const personEl = document.getElementById("personName");
    if (personEl) personEl.innerText = `Echoes of ${name}`;

    const aiMemory = `
${name} was remembered for their presence rather than appearance.
${desc}

Moments they created still breathe in memory.
Their laughter, warmth, and small gestures continue to echo.
Some people never leave—they become part of us.
`;

    showMemoryText(aiMemory);
}

function showMemoryText(text) {
    const container = document.getElementById("memoryCard");
    if (!container) return;

    container.innerHTML="";
    const sentences = text.match(/[^.!?]+[.!?]*/g);
    let index=0;

    function addSentence() {
        if (index >= sentences.length) return;
        const p = document.createElement("p");
        p.className="memory-line";
        p.innerText=sentences[index];
        container.appendChild(p);
        setTimeout(()=>p.classList.add("visible"),80);
        index++;
        setTimeout(addSentence,900);
    }

    addSentence();
}
