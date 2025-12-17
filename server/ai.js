function generateMemoryResponse(name, description) {
    if (!name || !description) return "Please enter a name and a description!";
    const desc = description.toLowerCase();

    const personalityInsights = [
        { keywords: ["kind", "friendly", "caring"], responses: [
                `${name} seems to have a heart of gold. Truly a warm and caring person!`,
                `From what you said, ${name} is someone who spreads positivity wherever they go.`
            ]},
        { keywords: ["smart", "intelligent", "clever"], responses: [
                `${name} sounds brilliant! Their mind must be sharp and curious.`,
                `Clearly, ${name} has a remarkable intellect. Impressive!`
            ]},
        { keywords: ["funny", "humorous", "fun"], responses: [
                `${name} seems like a joy to be around! A sense of humor always makes life brighter.`,
                `From your description, ${name} can make anyone smile. Hilarious and charming!`
            ]},
        { keywords: ["creative", "artistic", "imaginative"], responses: [
                `${name} seems like a true creative soul. So much imagination!`,
                `I can tell ${name} has a unique way of seeing the world. Very inspiring!`
            ]}
    ];

    const defaultResponses = [
        `${name} seems like a fascinating person with qualities that are truly unique.`,
        `From your words, ${name} appears to have a personality that stands out in a wonderful way.`,
        `Wow! ${name} is described as ${description}. Sounds like someone worth knowing deeply.`
    ];

    for (let insight of personalityInsights) {
        for (let keyword of insight.keywords) {
            if (desc.includes(keyword)) {
                const responses = insight.responses;
                return responses[Math.floor(Math.random() * responses.length)];
            }
        }
    }

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

function createMemory() {
    const name = document.getElementById("person").value.trim();
    const description = document.getElementById("memory").value.trim();
    const response = generateMemoryResponse(name, description);

    let output = document.getElementById("aiResponse");
    if (!output) {
        output = document.createElement("p");
        output.id = "aiResponse";
        output.style.marginTop = "20px";
        output.style.fontSize = "1.2rem";
        output.style.fontFamily = "'Poppins', sans-serif";
        output.style.color = "#ff6f61";
        document.body.appendChild(output);
    }

    output.textContent = response;
}
