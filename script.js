// Portfolio data - Optimized
const portfolioData = {
    name: "Ajal Rajan",
    title: "Software Developer",
    experience: "3+ Years",
    email: "ajalrajan007@gmail.com",
    github: "github.com/ajal-rp",
    linkedin: "www.linkedin.com/in/ajal-rajan-63b180234/",
    location: "Kattappana, Idukki, Kerala",
    about: `I'm a passionate Software Developer with 3+ years of experience in delivering robust web applications. I specialize in Python, Django, Flask, and full-stack development with modern frameworks. My expertise includes building scalable microservice architectures, RESTful APIs, and optimizing application performance.`,
    skills: {
        "Languages": ["Python", "JavaScript", "HTML/CSS"],
        "Frameworks": ["Django", "Flask", "Django REST Framework", "Angular"],
        "Databases": ["MySQL", "MongoDB", "PostgreSQL"],
        "Tools": ["Git", "GitHub", "BitBucket", "POSTMAN", "JIRA", "VS Code", "PyCharm"],
        "Backend": ["RESTful APIs", "Microservices", "API Development"],
        "AI/ML": ["Machine Learning", "Deep Learning", "NLP"],
        "Other": ["SDLC", "Performance Optimization", "Testing", "Agile Methodologies"]
    },
    projects: [
        {
            name: "EDU Management ERP",
            tech: "Django, Flask, Angular, PostgreSQL",
            description: "Developed a comprehensive student management system with Django core and Flask microservices. Built scalable microservice architecture with RESTful APIs, implemented secure authentication, and optimized database queries for better performance",
            link: "github.com/ajalrajan/edu-management"
        },
        {
            name: "Recruitment Application",
            tech: "Django, REST Framework, PostgreSQL",
            description: "Created a Django-based recruitment platform automating the hiring process. Features include candidate registration, job postings, application tracking, role-based access control, and optimized backend workflows",
            link: "github.com/ajalrajan/recruitment-app"
        },
        {
            name: "Job Fair Platform",
            tech: "Django, Angular, REST APIs",
            description: "Built a virtual job fair platform connecting candidates with employers. Implemented candidate dashboards, profile management, application tracking, and real-time notifications",
            link: "github.com/ajalrajan/job-fair"
        },
        {
            name: "Vessel Management System",
            tech: "Django, PostgreSQL, REST APIs",
            description: "Developed complete vessel management platform with booking system and financial records. Features include MIS reports, employee data organization by vessel, and comprehensive tracking",
            link: "github.com/ajalrajan/vessel-management"
        }
    ],
    experience_details: [
        {
            role: "Software Developer",
            company: "Cydez Technologies",
            period: "Sep 2022 - Present",
            responsibilities: [
                "Collaborated on web applications across full SDLC with measurable performance gains",
                "Implemented front-end and back-end enhancements for improved user experience",
                "Wrote clean, testable code reducing defect rates significantly",
                "Built scalable microservice architectures using Django and Flask",
                "Developed and maintained RESTful APIs for multiple projects"
            ]
        }
    ],
    education: {
        degree: "Bachelor of Computer Application (BCA)",
        university: "MES College, Nedukkandam",
        year: "2019 - 2021",
        gpa: "7.5/10"
    },
    certifications: ["Django Full Stack Developer - Aspire IT Academy (Mar 2022 - Sep 2022)"],
    leadership: [
        "Actively contributed to team projects and code reviews",
        "Mentored junior developers on Django best practices",
        "Collaborated across teams to deliver quality software solutions",
        "Focused on writing maintainable, scalable code"
    ]
};

// Optimized terminal state
let commandHistory = [];
let historyIndex = -1;
let chatMode = false;
let chatContext = [];
let isTyping = false;

// Cache DOM elements
const output = document.getElementById('output');
const input = document.getElementById('terminal-input');

// Optimized commands with lazy loading
const commands = {
    help: () => `
<span class="success">Available Commands</span>
${'─'.repeat(60)}

  <span class="warning">about</span>         Learn about me
  <span class="warning">skills</span>        View technical skills
  <span class="warning">projects</span>      See my projects
  <span class="warning">experience</span>    Work experience
  <span class="warning">education</span>     Educational background
  <span class="warning">certifications</span> View certifications
  <span class="warning">leadership</span>    Leadership & community
  <span class="warning">contact</span>       Contact information
  <span class="warning">resume</span>        Download resume
  <span class="warning">chat</span>          Chat with AI assistant
  <span class="warning">hack</span>          Try something fun
  <span class="warning">clear</span>         Clear terminal
  <span class="warning">help</span>          Show this message

<span class="info">Tip: Use ↑ ↓ arrow keys to navigate command history</span>
    `,
    
    about: () => `
<span class="success">About Me</span>
${'─'.repeat(60)}

<span class="info">Name:</span>       ${portfolioData.name}
<span class="info">Title:</span>      ${portfolioData.title}
<span class="info">Experience:</span> ${portfolioData.experience}
<span class="info">Location:</span>   ${portfolioData.location}

${portfolioData.about}
    `,
    
    skills: () => {
        let r = `\n<span class="success">Technical Skills</span>\n${'─'.repeat(60)}\n\n`;
        for (const [k, v] of Object.entries(portfolioData.skills)) {
            r += `<span class="warning">${k}:</span>\n  ${v.join(', ')}\n\n`;
        }
        return r;
    },
    
    projects: () => {
        let r = `\n<span class="success">Featured Projects</span>\n${'─'.repeat(60)}\n\n`;
        portfolioData.projects.forEach((p, i) => {
            r += `<span class="warning">${i + 1}. ${p.name}</span>\n   <span class="info">Tech:</span> ${p.tech}\n   ${p.description}\n   <span class="info">Link:</span> <a href="https://${p.link}" target="_blank">${p.link}</a>\n\n`;
        });
        return r;
    },
    
    experience: () => {
        let r = `\n<span class="success">Work Experience</span>\n${'─'.repeat(60)}\n\n`;
        portfolioData.experience_details.forEach(j => {
            r += `<span class="warning">${j.role}</span>\n<span class="info">${j.company}</span> | ${j.period}\n\n<span class="info">Key Responsibilities:</span>\n`;
            j.responsibilities.forEach(resp => r += `  • ${resp}\n`);
            r += '\n';
        });
        return r;
    },
    
    education: () => {
        const e = portfolioData.education;
        return `
<span class="success">Education</span>
${'─'.repeat(60)}

<span class="warning">${e.degree}</span>
${e.university}
Graduated: ${e.year} | GPA: ${e.gpa}
        `;
    },
    
    certifications: () => {
        let r = `\n<span class="success">Certifications</span>\n${'─'.repeat(60)}\n\n`;
        portfolioData.certifications.forEach((c, i) => r += `  ${i + 1}. ${c}\n`);
        return r;
    },
    
    leadership: () => {
        let r = `\n<span class="success">Leadership & Community</span>\n${'─'.repeat(60)}\n\n`;
        portfolioData.leadership.forEach(item => r += `  • ${item}\n`);
        return r;
    },
    
    contact: () => `
<span class="success">Contact Information</span>
${'─'.repeat(60)}

<span class="info">Email:</span>     <a href="mailto:${portfolioData.email}">${portfolioData.email}</a>
<span class="info">GitHub:</span>    <a href="https://${portfolioData.github}" target="_blank">${portfolioData.github}</a>
<span class="info">LinkedIn:</span>  <a href="https://${portfolioData.linkedin}" target="_blank">${portfolioData.linkedin}</a>

<span class="warning">Feel free to reach out for collaboration or opportunities!</span>
    `,
    
    resume: () => `
<span class="success">Resume Download</span>
${'─'.repeat(60)}

<span class="info">To download my resume, click the link below:</span>
<a href="pdf/resume.pdf" download>📄 Download Resume (PDF)</a>

<span class="warning">Note: You can also contact me directly for the latest version!</span>
    `,
    
    hack: async () => {
        const anims = [
            '<span class="warning">[▓▓░░░░░░░░] Initializing quantum entanglement...</span>',
            '<span class="warning">[▓▓▓▓░░░░░░] Bypassing Gibson firewall (hack the planet!)...</span>',
            '<span class="warning">[▓▓▓▓▓▓░░░░] Accessing mainframe via GUI interface in Visual Basic...</span>',
            '<span class="warning">[▓▓▓▓▓▓▓▓░░] Decrypting using blockchain AI neural network...</span>',
            '<span class="warning">[▓▓▓▓▓▓▓▓▓░] Downloading more RAM...</span>',
            '<span class="success">[▓▓▓▓▓▓▓▓▓▓] ACCESS GRANTED! (Just kidding, you had it all along)</span>'
        ];
        
        return new Promise(resolve => {
            let frame = 0;
            const div = document.createElement('div');
            div.className = 'hack-animation';
            output.appendChild(div);
            
            const int = setInterval(() => {
                div.innerHTML = anims[frame++];
                if (frame >= anims.length) {
                    clearInterval(int);
                    setTimeout(() => {
                        div.remove();
                        const egg = `
<span class="success">🎉 CONGRATULATIONS! You've unlocked the Developer's Secret Vault!</span>
${'═'.repeat(60)}

<span class="info">💡 "Any fool can write code that a computer can understand. Good programmers write code that humans can understand." - Martin Fowler</span>

<span class="warning">⚡ Behind the Scenes:</span>
<span class="info">• ☕ Coffee consumed during this project: ~47 cups (and counting)</span>
<span class="info">• 🐛 Bugs fixed: 127 (introduced: 128, net progress: -1)</span>
<span class="info">• 🔥 Stack Overflow visits: Too many to count (we don't talk about it)</span>
<span class="info">• ⏰ Time spent centering divs: 3 hours, 42 minutes, 17 seconds</span>
<span class="info">• 🎯 Code reviews survived: All of them (barely)</span>
<span class="info">• 🚀 Deployment anxiety level: It works on my machine ¯\\_(ツ)_/¯</span>

<span class="warning">🏆 Developer Achievement Unlocked:</span>
<span class="success">» "The Curious One" - You typed 'hack' because why not?</span>
<span class="success">» "Easter Egg Hunter" - Welcome to the 1% who found this!</span>

<span class="info">🎮 Pro Tip: Real hackers use 'sudo apt-get install coffee' before coding.</span>

<span class="warning">Type 'help' to return to the matrix... I mean, normal commands.</span>
                        `;
                        printOutput(egg, false).then(() => resolve(null));
                    }, 200);
                }
            }, 400);
        });
    },
    
    chat: () => {
        chatMode = true;
        chatContext = [];
        return `
<span class="success"><img src="images/jiraya.jpg" alt="Jiraya" style="width:24px;height:24px;vertical-align:middle;border-radius:50%;"> Jiraya AI Assistant Activated!</span>
${'─'.repeat(60)}

<span class="info">Hi! I'm <span class="warning">Jiraya</span>, Ajal's AI assistant. Ask me about:</span>
<span class="info">• Projects & technical work</span>
<span class="info">• Skills & technologies</span>
<span class="info">• Work experience</span>
<span class="info">• Contact information</span>

<span class="warning">Type 'exit' to return to normal terminal mode.</span>
        `;
    },
    
    exit: () => {
        if (chatMode) {
            chatMode = false;
            return `<span class="success">Exited chat mode. Welcome back!</span>\n\n<span class="info">Type 'help' to see available commands.</span>`;
        }
        return `<span class="error">Error: Not in chat mode. Use 'chat' to start.</span>`;
    },
    
    clear: () => {
        output.innerHTML = '';
        return null;
    },
    
    welcome: () => `
<span class="success">╔════════════════════════════════════════════════════════════╗</span>
<span class="success">║    Hi, I'm ${portfolioData.name}, a ${portfolioData.title}        ║</span>
<span class="success">╚════════════════════════════════════════════════════════════╝</span>

<span class="info">Welcome to my interactive portfolio terminal!</span>
<span class="info">Type <span class="warning">'help'</span> to see available commands.</span>
<span class="info">Try <span class="warning">'chat'</span> to talk with my AI assistant!</span>
    `
};

// Optimized initialization
function init() {
    printOutput(commands.welcome(), false);
    input.focus();
    updateClock();
    setInterval(updateClock, 1000);
}

// Update clock in prompt
function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour12: false });
    const dateEl = document.querySelector('.segment-user .segment-text');
    if (dateEl) dateEl.textContent = portfolioData.name.split(' ')[0].toLowerCase();
}

// Optimized typewriter with requestAnimationFrame
function typeWriter(element, html, speed = 1) {
    return new Promise(resolve => {
        if (!html) {
            resolve();
            return;
        }
        
        let index = 0;
        let currentText = '';
        let lastTime = performance.now();
        
        function addChar(timestamp) {
            const elapsed = timestamp - lastTime;
            
            if (elapsed >= speed) {
                if (index < html.length) {
                    if (html[index] === '<') {
                        const tagEnd = html.indexOf('>', index);
                        if (tagEnd !== -1) {
                            currentText += html.substring(index, tagEnd + 1);
                            index = tagEnd + 1;
                        } else {
                            currentText += html[index++];
                        }
                    } else {
                        currentText += html[index++];
                    }
                    
                    element.innerHTML = currentText + '<span class="cursor-blink">▋</span>';
                    output.parentElement.scrollTop = output.parentElement.scrollHeight;
                    lastTime = timestamp;
                }
            }
            
            if (index < html.length) {
                requestAnimationFrame(addChar);
            } else {
                element.innerHTML = currentText;
                resolve();
            }
        }
        
        requestAnimationFrame(addChar);
    });
}

// Optimized output printing
async function printOutput(text, showCommand = true, command = '') {
    if (text === null || isTyping) return;
    isTyping = true;

    const line = document.createElement('div');
    line.className = 'output-line';

    if (showCommand && command) {
        const cmd = document.createElement('div');
        cmd.className = 'command';
        cmd.textContent = command;
        line.appendChild(cmd);
    }

    const response = document.createElement('div');
    response.className = 'response';
    line.appendChild(response);
    output.appendChild(line);

    await typeWriter(response, text);
    isTyping = false;
}

// Optimized command processing
async function processCommand(cmd) {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    commandHistory.push(cmd);
    historyIndex = commandHistory.length;

    if (chatMode) {
        if (trimmed.toLowerCase() === 'exit') {
            chatMode = false;
            await printOutput(commands.exit(), true, cmd);
        } else {
            await printOutput(getAIResponse(trimmed), true, cmd);
        }
        return;
    }

    const cmdLower = trimmed.toLowerCase();
    if (commands[cmdLower]) {
        if (cmdLower === 'hack') {
            await printOutput('', true, cmd);
            await commands[cmdLower]();
        } else {
            const result = commands[cmdLower]();
            if (result !== null) {
                await printOutput(result, true, cmd);
            }
        }
    } else {
        await printOutput(`<span class="error">Command not found: ${cmd}</span>\n<span class="info">Type 'help' to see available commands.</span>`, true, cmd);
    }
}

// Optimized AI responses
function getAIResponse(msg) {
    chatContext.push(msg);
    const m = msg.toLowerCase();
    
    const img = '<img src="images/jiraya.jpg" alt="Jiraya" style="width:20px;height:20px;vertical-align:middle;border-radius:50%;">';
    
    if (m.match(/^(hi|hello|hey|greetings)/)) {
        return `<span class="success">${img} Jiraya:</span> Hello! I'm Jiraya, Ajal's AI assistant. How can I help you learn about him today? Feel free to ask about projects, skills, or anything else!`;
    }
    
    if (m.includes('project') || m.includes('work') || m.includes('built')) {
        const p = portfolioData.projects[Math.floor(Math.random() * portfolioData.projects.length)];
        return `<span class="success">${img} Jiraya:</span> Great question! One of the exciting projects is "${p.name}" built with ${p.tech}. ${p.description}\n\nType 'projects' to see all projects, or ask me something else!`;
    }
    
    if (m.includes('skill') || m.includes('technology') || m.includes('tech stack')) {
        const cats = Object.keys(portfolioData.skills);
        const cat = cats[Math.floor(Math.random() * cats.length)];
        return `<span class="success">${img} Jiraya:</span> ${portfolioData.name} has strong expertise in ${cat}: ${portfolioData.skills[cat].join(', ')}. \n\nType 'skills' to see the complete skill set!`;
    }
    
    if (m.includes('experience') || m.includes('worked') || m.includes('job')) {
        const j = portfolioData.experience_details[0];
        return `<span class="success">${img} Jiraya:</span> Currently working as ${j.role} at ${j.company} since ${j.period}. Key achievements include ${j.responsibilities[0].toLowerCase()}.\n\nType 'experience' for full work history!`;
    }
    
    if (m.includes('contact') || m.includes('email') || m.includes('reach') || m.includes('hire')) {
        return `<span class="success">${img} Jiraya:</span> You can reach out at ${portfolioData.email} or connect on LinkedIn: ${portfolioData.linkedin}. \n\nType 'contact' for all contact information!`;
    }
    
    if (m.includes('ai') || m.includes('machine learning') || m.includes('artificial intelligence')) {
        return `<span class="success">${img} Jiraya:</span> ${portfolioData.name} is passionate about AI & ML! Experienced with ${portfolioData.skills['AI/ML'].join(', ')}. Currently working on AI-powered projects and exploring the latest in generative AI!`;
    }
    
    if (m.includes('location') || m.includes('where') || m.includes('available')) {
        return `<span class="success">${img} Jiraya:</span> Based in ${portfolioData.location}, but open to remote opportunities worldwide. Available for exciting projects and collaborations!`;
    }
    
    const responses = [
        `<span class="success">${img} Jiraya:</span> That's an interesting question! With ${portfolioData.experience} of experience, I can help answer questions about projects, skills, or career. What would you like to know?`,
        `<span class="success">${img} Jiraya:</span> I'd love to help! Try asking about specific projects, technical skills, or work experience. You can also type 'help' to see all available commands.`,
        `<span class="success">${img} Jiraya:</span> Great question! ${portfolioData.name} specializes in ${portfolioData.title} with expertise in modern web technologies and AI. What specific area interests you?`,
        `<span class="success">${img} Jiraya:</span> I can provide information about projects, skills, experience, and more. Try asking something like "What projects have you built?" or "What are your skills?"`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
}

// Event handlers
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !isTyping) {
        processCommand(input.value);
        input.value = '';
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            input.value = commandHistory[historyIndex];
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            input.value = commandHistory[historyIndex];
        } else {
            historyIndex = commandHistory.length;
            input.value = '';
        }
    } else if (e.key === 'Tab') {
        e.preventDefault();
        const partial = input.value.toLowerCase();
        const matches = Object.keys(commands).filter(c => c.startsWith(partial));
        if (matches.length === 1) {
            input.value = matches[0];
        } else if (matches.length > 1) {
            printOutput(`<span class="info">Possible commands: ${matches.join('  ')}</span>`, false);
        }
    }
});

// Keep input focused
document.addEventListener('click', () => input.focus());

// Optimized 3D card effect
const card = document.querySelector('.interactive-card');
if (card) {
    let ticking = false;
    card.addEventListener('mousemove', (e) => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width / 2) / 10;
                const y = (e.clientY - rect.top - rect.height / 2) / 10;
                card.style.transform = `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg) scale3d(1.05, 1.05, 1.05)`;
                ticking = false;
            });
            ticking = true;
        }
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
}

// Initialize on load
window.addEventListener('load', init);
