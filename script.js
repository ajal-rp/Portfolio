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

// Configuration constants
const CONFIG = {
    MAX_INPUT_LENGTH: 500,
    RATE_LIMIT_WINDOW: 1000, // 1 second
    RATE_LIMIT_MAX: 10,
    TYPEWRITER_SPEED: 1,
    HACK_EASTER_EGG_DELAY: 200, // 200ms
    HACK_ANIMATION_INTERVAL: 400, // 400ms
    CURSOR_INIT_DELAY: 100 // 100ms
};

// Security module
const Security = {
    sanitizeHTML: (html) => {
        if (typeof DOMPurify !== 'undefined') {
            return DOMPurify.sanitize(html, {
                ALLOWED_TAGS: ['span', 'a', 'br', 'img'],
                ALLOWED_ATTR: ['class', 'href', 'target', 'src', 'alt', 'style'],
                ALLOW_DATA_ATTR: false
            });
        }
        return html.replaceAll(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    },
    
    sanitizeInput: (input) => {
        return String(input)
            .trim()
            .substring(0, CONFIG.MAX_INPUT_LENGTH)
            .replaceAll(/[<>]/g, '');
    },
    
    validateURL: (url) => {
        try {
            const fullUrl = url.startsWith('http') ? url : `https://${url}`;
            const parsed = new URL(fullUrl);
            return ['http:', 'https:'].includes(parsed.protocol) ? parsed.href : '#';
        } catch (error) {
            // Invalid URL format - return safe default
            if (typeof console !== 'undefined' && console.warn) {
                console.warn('Invalid URL format:', url, error.message);
            }
            return '#';
        }
    },
    
    rateLimit: (() => {
        let count = 0;
        let lastTime = Date.now();
        return () => {
            const now = Date.now();
            if (now - lastTime < CONFIG.RATE_LIMIT_WINDOW) {
                count++;
                return count <= CONFIG.RATE_LIMIT_MAX;
            }
            count = 0;
            lastTime = now;
            return true;
        };
    })()
};

// Utility functions
const getRandomElement = (array) => {
    if (!Array.isArray(array) || array.length === 0) {
        return null;
    }
    return array[Math.floor(Math.random() * array.length)];
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
            const safeLink = Security.validateURL(p.link);
            r += `<span class="warning">${i + 1}. ${p.name}</span>\n   <span class="info">Tech:</span> ${p.tech}\n   ${p.description}\n   <span class="info">Link:</span> <a href="${safeLink}" target="_blank" rel="noopener noreferrer">${p.link}</a>\n\n`;
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
        
        return hackAnimation(anims);
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

// Helper function for hack animation
function hackAnimation(anims) {
    return new Promise(resolve => {
        let frame = 0;
        const div = document.createElement('div');
        div.className = 'hack-animation';
        output.appendChild(div);
        
        const int = setInterval(() => {
            div.innerHTML = anims[frame++];
            if (frame >= anims.length) {
                clearInterval(int);
                showEasterEgg(div, resolve);
            }
        }, CONFIG.HACK_ANIMATION_INTERVAL);
    });
}

function showEasterEgg(div, resolve) {
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
    }, CONFIG.HACK_EASTER_EGG_DELAY);
}

// Optimized initialization
function init() {
    printOutput(commands.welcome(), false);
    input.focus();
    updateClock();
    setInterval(updateClock, 1000);
}

// Update clock in prompt
function updateClock() {
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
                        if (tagEnd === -1) {
                            // No closing tag found
                            currentText += html[index++];
                        } else {
                            currentText += html.substring(index, tagEnd + 1);
                            index = tagEnd + 1;
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

// Optimized output printing with security
async function printOutput(text, showCommand = true, command = '') {
    if (text === null || isTyping) return;
    isTyping = true;

    const line = document.createElement('div');
    line.className = 'output-line';

    if (showCommand && command) {
        const cmd = document.createElement('div');
        cmd.className = 'command';
        cmd.textContent = Security.sanitizeInput(command);
        line.appendChild(cmd);
    }

    const response = document.createElement('div');
    response.className = 'response';
    line.appendChild(response);
    output.appendChild(line);

    const sanitizedText = Security.sanitizeHTML(text);
    await typeWriter(response, sanitizedText);
    isTyping = false;
}

// Optimized command processing with security
async function processCommand(cmd) {
    // Rate limiting
    if (!Security.rateLimit()) {
        await printOutput('<span class="error">⚠ Rate limit exceeded. Please wait a moment...</span>', false);
        return;
    }

    const trimmed = Security.sanitizeInput(cmd);
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

// Helper functions for AI responses
function getGreetingResponse(img, isReturningUser) {
    const greetings = [
        `Hello! 👋 I'm Jiraya, your guide to Ajal's professional journey. I can share insights about his 3+ years of experience, impressive project portfolio, or technical expertise. What interests you?`,
        `Hey there! ${isReturningUser ? 'Good to see you again!' : 'Welcome to Ajal\'s portfolio.'} I'm here to help you explore his work in Django, Flask, and full-stack development. What would you like to know?`,
        `Greetings! 🎯 Ready to learn about Ajal's software development journey? Ask me about his projects at Cydez Technologies, his tech stack, or any specific area you're curious about!`
    ];
    const greeting = getRandomElement(greetings) || greetings[0];
    return `<span class="success">${img} Jiraya:</span> ${greeting}`;
}

function getProjectResponse(m, img) {
    if (m.match(/what (projects|work)|tell me about (projects|work)|show (projects|work)/)) {
        const projectNames = portfolioData.projects.map(p => p.name).join(', ');
        return `<span class="success">${img} Jiraya:</span> Ajal has built some impressive systems! 🚀 Major projects include: ${projectNames}. Each one showcases different aspects of his full-stack expertise. Want details on a specific project? Just ask, or type <span class="warning">'projects'</span> to see the full breakdown!`;
    }
    if (m.includes('edu management') || m.includes('erp')) {
        const edu = portfolioData.projects[0];
        return `<span class="success">${img} Jiraya:</span> The ${edu.name} is fascinating! 📚 ${edu.description} This project demonstrates expertise in microservice architecture and scalability. Type <span class="warning">'projects'</span> for technical details!`;
    }
    if (m.includes('recruitment') || m.includes('hiring')) {
        const rec = portfolioData.projects[1];
        return `<span class="success">${img} Jiraya:</span> The ${rec.name} streamlines hiring processes! 💼 ${rec.description} This showcases strong backend optimization skills. Check <span class="warning">'projects'</span> for more!`;
    }
    return null;
}

function getSkillsResponse(m, img) {
    if (m.match(/what (skills|technologies|tech stack)|tell me about (skills|expertise)/)) {
        const mainSkills = `${portfolioData.skills.Languages.join(', ')}, ${portfolioData.skills.Frameworks.slice(0, 3).join(', ')}`;
        return `<span class="success">${img} Jiraya:</span> Ajal's core expertise lies in <span class="warning">${mainSkills}</span>. He's particularly strong in building RESTful APIs and microservices. With ${portfolioData.experience} in production environments, he knows how to build scalable, maintainable systems. Type <span class="warning">'skills'</span> for the complete tech arsenal!`;
    }
    if (m.includes('python') || m.includes('django') || m.includes('flask')) {
        return `<span class="success">${img} Jiraya:</span> Python is Ajal's primary language! 🐍 He specializes in Django and Flask frameworks, building everything from microservices to full-scale ERPs. His experience includes RESTful API development, database optimization, and implementing secure authentication systems. Want to see this in action? Check out the <span class="warning">'projects'</span>!`;
    }
    if (m.includes('database') || m.includes('sql') || m.includes('postgresql') || m.includes('mysql')) {
        return `<span class="success">${img} Jiraya:</span> Database expertise includes ${portfolioData.skills.Databases.join(', ')}! 💾 Ajal has experience optimizing complex queries, designing efficient schemas, and managing data integrity across large-scale applications. Type <span class="warning">'projects'</span> to see real-world implementations!`;
    }
    return null;
}

function getFallbackResponse(img) {
    const contextualResponses = [
        `I'm here to showcase Ajal's ${portfolioData.experience} of experience! What aspect interests you most - his <span class="warning">projects</span>, <span class="warning">technical skills</span>, or <span class="warning">work experience</span>?`,
        `Let me help you get to know Ajal better! He's a ${portfolioData.title} specializing in Django and Flask. Want to hear about specific <span class="warning">projects</span> or his <span class="warning">tech stack</span>?`,
        `Great question! As someone with expertise in ${portfolioData.skills.Frameworks.slice(0, 2).join(' and ')}, Ajal has quite a story. Ask me about <span class="warning">projects</span>, <span class="warning">skills</span>, or <span class="warning">experience</span>!`,
        `I can tell you all about Ajal's work at ${portfolioData.experience_details[0].company} and his impressive project portfolio. What would you like to explore first?`
    ];
    const response = getRandomElement(contextualResponses) || contextualResponses[0];
    return `<span class="success">${img} Jiraya:</span> ${response}`;
}

// Enhanced AI responses with better context awareness
function getAIResponse(msg) {
    chatContext.push(msg);
    const m = msg.toLowerCase().trim();
    const img = '<img src="images/jiraya.jpg" alt="Jiraya" style="width:20px;height:20px;vertical-align:middle;border-radius:50%;">';
    
    // Check if this is a returning user (conversation has history)
    const isReturningUser = chatContext.length > 1;
    
    // Greetings
    if (m.match(/^(hi|hello|hey|greetings|good morning|good afternoon|good evening)/)) {
        return getGreetingResponse(img, isReturningUser);
    }
    
    // Project questions
    const projectResponse = getProjectResponse(m, img);
    if (projectResponse) return projectResponse;
    
    // Skills questions
    const skillsResponse = getSkillsResponse(m, img);
    if (skillsResponse) return skillsResponse;
    
    // Experience and career questions
    if (m.match(/how long|years of experience|experience level|when (did|started)/)) {
        return `<span class="success">${img} Jiraya:</span> Ajal has ${portfolioData.experience} of professional software development experience! 📈 Currently working as ${portfolioData.experience_details[0].role} at ${portfolioData.experience_details[0].company} since ${portfolioData.experience_details[0].period}. His journey includes delivering multiple production applications and mentoring junior developers. Type <span class="warning">'experience'</span> for detailed achievements!`;
    }
    
    if (m.includes('cydez') || m.includes('company') || m.includes('current job')) {
        const job = portfolioData.experience_details[0];
        return `<span class="success">${img} Jiraya:</span> At ${job.company}, Ajal works on cutting-edge web applications! 🏢 His role involves full SDLC collaboration, microservice development, and delivering measurable performance improvements. He's known for writing clean, testable code and being a team player. Want more details? Type <span class="warning">'experience'</span>!`;
    }
    
    // Contact and hiring intent
    if (m.match(/hire|recruit|job offer|opportunity|interested in hiring/)) {
        return `<span class="success">${img} Jiraya:</span> Excellent! Ajal is open to exciting opportunities! 💼 For professional inquiries, reach out at <span class="warning">${portfolioData.email}</span> or connect on LinkedIn at <span class="warning">${portfolioData.linkedin}</span>. He's particularly interested in projects involving Django, microservices, or AI integration. You can also type <span class="warning">'resume'</span> to download his full CV!`;
    }
    
    if (m.includes('email') || m.includes('contact') || m.includes('reach')) {
        return `<span class="success">${img} Jiraya:</span> 📧 Best way to reach Ajal: ${portfolioData.email}\n🔗 Connect on LinkedIn: ${portfolioData.linkedin}\n\nType <span class="warning">'contact'</span> for all contact options!`;
    }
    
    // Education questions
    if (m.includes('education') || m.includes('degree') || m.includes('study') || m.includes('college')) {
        return `<span class="success">${img} Jiraya:</span> Ajal holds a ${portfolioData.education.degree} from ${portfolioData.education.university} 🎓 (Graduated: ${portfolioData.education.year}, GPA: ${portfolioData.education.gpa}). He's also certified in Django Full Stack Development. Solid academic foundation combined with hands-on experience! Type <span class="warning">'education'</span> for details.`;
    }
    
    // AI/ML interest
    if (m.includes('ai') || m.includes('machine learning') || m.includes('artificial intelligence') || m.includes('ml')) {
        return `<span class="success">${img} Jiraya:</span> AI & ML are exciting areas for Ajal! 🤖 He's experienced with ${portfolioData.skills['AI/ML'].join(', ')} and actively explores generative AI applications. He's built this very chat interface and is keen on integrating AI into web applications. The future is intelligent software!`;
    }
    
    // Remote work questions
    if (m.includes('remote') || m.includes('location') || m.includes('where') || m.includes('relocate')) {
        return `<span class="success">${img} Jiraya:</span> 🌍 Currently based in ${portfolioData.location}, but fully equipped for remote work! Ajal has experience collaborating with distributed teams and is open to both remote opportunities and relocation for the right role. Modern development knows no boundaries!`;
    }
    
    // Strengths and expertise
    if (m.match(/what makes|why hire|strengths|what's special|best at/)) {
        return `<span class="success">${img} Jiraya:</span> What sets Ajal apart? 🌟\n• ${portfolioData.experience} building scalable production systems\n• Strong in Django/Flask microservice architectures\n• Focus on clean, maintainable code\n• Team player who mentors juniors\n• Proven track record of delivering measurable results\n\nType <span class="warning">'experience'</span> or <span class="warning">'projects'</span> to see this in action!`;
    }
    
    // Who/what questions
    if (m.match(/who (is|are) (you|ajal)|tell me about (yourself|ajal)/)) {
        return `<span class="success">${img} Jiraya:</span> ${portfolioData.about}\n\nThat's Ajal in a nutshell! ${portfolioData.experience} of turning complex problems into elegant solutions. Want to dive deeper? Ask about <span class="warning">projects</span>, <span class="warning">skills</span>, or <span class="warning">experience</span>!`;
    }
    
    // Help and commands
    if (m.includes('what can you') || m.includes('help me') || m.includes('how to use')) {
        return `<span class="success">${img} Jiraya:</span> I can help you explore Ajal's professional profile! Try asking:\n\n💡 "What projects have you built?"\n💡 "Tell me about your skills"\n💡 "What's your experience?"\n💡 "How can I contact you?"\n💡 "Are you available for hire?"\n\nOr type <span class="warning">'help'</span> to see all available commands!`;
    }
    
    return getFallbackResponse(img);
}

// Event handlers with security
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !isTyping) {
        // Input validation
        const inputValue = input.value.trim();
        if (inputValue.length > 500) {
            printOutput('<span class="error">⚠ Input too long (max 500 characters)</span>', false);
            input.value = '';
            return;
        }
        processCommand(inputValue);
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
        const partial = Security.sanitizeInput(input.value.toLowerCase());
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

// Dynamic cursor positioning
const cursor = document.querySelector('.input-cursor');
const terminalInput = document.getElementById('terminal-input');

if (cursor && terminalInput) {
    // Create a hidden span to measure text width
    const measureSpan = document.createElement('span');
    measureSpan.style.visibility = 'hidden';
    measureSpan.style.position = 'absolute';
    measureSpan.style.whiteSpace = 'pre';
    measureSpan.style.fontFamily = 'Roboto Mono, monospace';
    measureSpan.style.fontSize = '14px';
    measureSpan.style.fontWeight = '400';
    document.body.appendChild(measureSpan);

    function updateCursorPosition() {
        const inputValue = terminalInput.value;
        const cursorPosition = terminalInput.selectionStart || 0;
        
        // Measure text width up to cursor position
        measureSpan.textContent = inputValue.substring(0, cursorPosition);
        const textWidth = measureSpan.offsetWidth;
        
        // Position cursor relative to input field start
        cursor.style.left = `${textWidth}px`;
    }

    // Update cursor position on various events
    terminalInput.addEventListener('input', updateCursorPosition);
    terminalInput.addEventListener('keyup', updateCursorPosition);
    terminalInput.addEventListener('keydown', updateCursorPosition);
    terminalInput.addEventListener('click', updateCursorPosition);
    terminalInput.addEventListener('focus', updateCursorPosition);
    
    // Initial position
    setTimeout(updateCursorPosition, CONFIG.CURSOR_INIT_DELAY);
}

// Initialize on load
window.addEventListener('load', init);
