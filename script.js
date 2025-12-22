// Portfolio data
const portfolioData = {
    name: "Ajal Rajan",
    title: "Software Developer",
    experience: "3+ Years",
    email: "ajalrajan007@gmail.com",
    github: "github.com/ajal-rp",
    linkedin: "www.linkedin.com/in/ajal-rajan-63b180234/",
    location: "Kattappana, Idukki, Kerala",
    
    about: `I'm a passionate Software Developer with 3+ years of experience in delivering robust 
web applications. I specialize in Python, Django, Flask, and full-stack development with 
modern frameworks. My expertise includes building scalable microservice architectures, 
RESTful APIs, and optimizing application performance. I'm committed to writing clean, 
maintainable code and delivering high-quality solutions.`,
    
    skills: {
        "Languages": ["Python", "JavaScript", "HTML/CSS"],
        "Frameworks": ["Django", "Flask", "Django REST Framework", "Angular"],
        "Databases": ["MySQL", "MongoDB", "PostgreSQL"],
        "Tools": ["Git", "GitHub", "BitBucket", "POSTMAN", "JIRA", "VS Code", "PyCharm"],
        "Backend": ["RESTful APIs", "Microservices", "API Development"],
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
        gpa: ""
    },
    
    certifications: [
        "Django Full Stack Developer - Aspire IT Academy (Mar 2022 - Sep 2022)"
    ],
    
    leadership: [
        "Actively contributed to team projects and code reviews",
        "Mentored junior developers on Django best practices",
        "Collaborated across teams to deliver quality software solutions",
        "Focused on writing maintainable, scalable code"
    ]
};

// Terminal state
let commandHistory = [];
let historyIndex = -1;
let chatMode = false;
let chatContext = [];

// DOM elements
const output = document.getElementById('output');
const input = document.getElementById('terminal-input');

// Available commands
const commands = {
    help: () => {
        return `
<span class="success">Available Commands:</span>

  <span class="warning">about</span>            - Learn more about me
  <span class="warning">skills</span>           - View my technical skills
  <span class="warning">projects</span>         - See my portfolio projects
  <span class="warning">experience</span>       - View my work experience
  <span class="warning">education</span>        - See my educational background
  <span class="warning">certifications</span>   - View my certifications
  <span class="warning">leadership</span>       - See leadership experience
  <span class="warning">contact</span>          - Get my contact information
  <span class="warning">resume</span>           - Download my resume
  <span class="warning">chat</span>             - Start AI-powered chat
  <span class="warning">exit</span>             - Exit chat mode
  <span class="warning">hack</span>             - Unlock hidden features
  <span class="warning">clear</span>            - Clear the terminal
  <span class="warning">help</span>             - Display this help message

<span class="info">Tip: Use ↑ ↓ arrow keys to navigate command history</span>
        `;
    },

    about: () => {
        return `
<span class="success">About Me</span>
${'─'.repeat(60)}

<span class="info">Name:</span>        ${portfolioData.name}
<span class="info">Title:</span>       ${portfolioData.title}
<span class="info">Experience:</span>  ${portfolioData.experience}
<span class="info">Location:</span>    ${portfolioData.location}

${portfolioData.about}
        `;
    },

    skills: () => {
        let result = `\n<span class="success">Technical Skills</span>\n${'─'.repeat(60)}\n\n`;

        for (const [category, skillList] of Object.entries(portfolioData.skills)) {
            result += `<span class="warning">${category}:</span>\n`;
            result += `  ${skillList.join(', ')}\n\n`;
        }

        return result;
    },

    projects: () => {
        let result = `\n<span class="success">Featured Projects</span>\n${'─'.repeat(60)}\n\n`;

        portfolioData.projects.forEach((project, index) => {
            result += `<span class="warning">${index + 1}. ${project.name}</span>\n`;
            result += `   <span class="info">Tech Stack:</span> ${project.tech}\n`;
            result += `   ${project.description}\n`;
            result += `   <span class="info">Link:</span> <a href="https://${project.link}" target="_blank">${project.link}</a>\n\n`;
        });

        return result;
    },

    experience: () => {
        let result = `\n<span class="success">Work Experience</span>\n${'─'.repeat(60)}\n\n`;

        portfolioData.experience_details.forEach((job, index) => {
            result += `<span class="warning">${job.role}</span>\n`;
            result += `<span class="info">${job.company}</span> | ${job.period}\n\n`;
            job.responsibilities.forEach(resp => {
                result += `  • ${resp}\n`;
            });
            result += '\n';
        });

        return result;
    },

    education: () => {
        const edu = portfolioData.education;
        return `
<span class="success">Education</span>
${'─'.repeat(60)}

<span class="warning">${edu.degree}</span>
${edu.university}
Graduated: ${edu.year} | GPA: ${edu.gpa}
        `;
    },

    certifications: () => {
        let result = `\n<span class="success">Certifications</span>\n\n${'─'.repeat(60)}\n\n`;
        portfolioData.certifications.forEach((cert, index) => {
            result += `  ${index + 1}. ${cert}\n`;
        });
        return result;
    },

    leadership: () => {
        let result = `\n<span class="success">Leadership & Community</span>\n${'─'.repeat(60)}\n\n`;
        portfolioData.leadership.forEach((item, index) => {
            result += `  • ${item}\n`;
        });
        return result;
    },

    contact: () => {
        return `
<span class="success">Contact Information</span>
${'─'.repeat(60)}

<span class="info">Email:</span>     <a href="mailto:${portfolioData.email}">${portfolioData.email}</a>
<span class="info">GitHub:</span>    <a href="https://${portfolioData.github}" target="_blank">${portfolioData.github}</a>
<span class="info">LinkedIn:</span>  <a href="https://${portfolioData.linkedin}" target="_blank">${portfolioData.linkedin}</a>

<span class="warning">Feel free to reach out for collaboration or opportunities!</span>
        `;
    },

    resume: () => {
        return `
<span class="success">Resume Download</span>
${'─'.repeat(60)}

<span class="info">To download my resume, click the link below:</span>
<a href="resume.pdf" download>📄 Download Resume (PDF)</a>

<span class="warning">Note: You can also contact me directly for the latest version!</span>
        `;
    },

    hack: async () => {
        // Show hacking animation
        const animations = [
            '<span class="warning">[▓▓▓░░░░░░░] Initializing breach protocol...</span>',
            '<span class="warning">[▓▓▓▓▓░░░░░] Bypassing firewall...</span>',
            '<span class="warning">[▓▓▓▓▓▓▓░░░] Accessing mainframe...</span>',
            '<span class="warning">[▓▓▓▓▓▓▓▓▓░] Decrypting data...</span>',
            '<span class="success">[▓▓▓▓▓▓▓▓▓▓] ACCESS GRANTED!</span>'
        ];
        
        return new Promise((resolve) => {
            let frame = 0;
            const animContainer = document.createElement('div');
            animContainer.className = 'hack-animation';
            output.appendChild(animContainer);
            
            const interval = setInterval(() => {
                animContainer.innerHTML = animations[frame];
                frame++;
                
                if (frame >= animations.length) {
                    clearInterval(interval);
                    setTimeout(() => {
                        animContainer.remove();
                        const easterEgg = `
<span class="success">🎮 Easter Egg Unlocked!</span>
${'═'.repeat(60)}

<span class="info">"Code is like humor. When you have to explain it, it's bad." - Cory House</span>

<span class="warning">Fun Facts:</span>
<span class="info">• I've written over 500,000 lines of code</span>
<span class="info">• My first program was a "Hello World" in Python</span>
<span class="info">• I debug with console.log() and I'm not ashamed</span>
<span class="info">• Coffee: 90% of my productivity</span>
<span class="info">• Vim or VS Code? Both! (but mostly VS Code 😄)</span>

<span class="warning">Type 'help' to return to normal commands.</span>
                        `;
                        printOutput(easterEgg, false).then(() => resolve(null));
                    }, 200);
                }
            }, 600);
        });
    },

    chat: () => {
        chatMode = true;
        chatContext = [];
        return `
<span class="success"><img src="images/jiraya.jpg" alt="Jiraya" style="width:24px;height:24px;vertical-align:middle;border-radius:50%;"> Jiraya AI Assistant Activated!</span>
${'─'.repeat(60)}

<span class="info">Hi! I'm <span class="warning">Jiraya</span>, Ajal's AI assistant. Ask me anything about:
• Projects and portfolio work
• Technical skills and expertise
• Work experience and education
• Contact information

Type <span class="warning">'exit'</span> to return to terminal mode.</span>
        `;
    },

    exit: () => {
        if (chatMode) {
            chatMode = false;
            chatContext = [];
            return `
<span class="success">Exited chat mode.</span>
<span class="info">Type 'help' to see available commands.</span>
            `;
        }
        return `<span class="error">Not in chat mode.</span>`;
    },

    clear: () => {
        output.innerHTML = '';
        return null;
    },

    welcome: () => {
        return `
<span class="success">Hi, I'm ${portfolioData.name}, a ${portfolioData.title} & AI Enthusiast.</span>

<span class="info">Welcome to my interactive 'AI powered' portfolio terminal! haha!
Type 'help' to see available commands.</span>
        `;
    }
};

// Initialize terminal
async function init() {
    await printOutput(commands.welcome(), false);
    input.focus();
    updateClock();
    setInterval(updateClock, 1000);
}

// Update clock in prompt
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        timeElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
}

// Print output to terminal with typewriter effect
async function printOutput(text, showCommand = true, command = '') {
    if (text === null) return;

    const line = document.createElement('div');
    line.className = 'output-line';

    if (showCommand && command) {
        const cmdElement = document.createElement('div');
        cmdElement.className = 'command';
        cmdElement.textContent = command;
        line.appendChild(cmdElement);
    }

    const responseElement = document.createElement('div');
    responseElement.className = 'response';
    line.appendChild(responseElement);

    output.appendChild(line);

    // Typewriter effect
    await typeWriter(responseElement, text);

    // Scroll to bottom
    output.parentElement.scrollTop = output.parentElement.scrollHeight;
}

// Typewriter effect function
function typeWriter(element, html, speed = 1) {
    return new Promise((resolve) => {
        // Parse HTML to text with tags
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        
        let currentText = '';
        let index = 0;
        const fullHTML = html;
        
        function addChar() {
            if (index < fullHTML.length) {
                // Check if we're at a tag
                if (fullHTML[index] === '<') {
                    // Find the end of the tag
                    const tagEnd = fullHTML.indexOf('>', index);
                    if (tagEnd !== -1) {
                        currentText += fullHTML.substring(index, tagEnd + 1);
                        index = tagEnd + 1;
                    } else {
                        currentText += fullHTML[index];
                        index++;
                    }
                } else {
                    currentText += fullHTML[index];
                    index++;
                }
                
                element.innerHTML = currentText + '<span class="cursor-blink">▋</span>';
                
                // Scroll to bottom while typing
                output.parentElement.scrollTop = output.parentElement.scrollHeight;
                
                setTimeout(addChar, speed);
            } else {
                element.innerHTML = currentText;
                resolve();
            }
        }
        
        addChar();
    });
}

// Execute command from menu
function executeMenuCommand(cmd) {
    input.value = cmd;
    processCommand(cmd);
    input.value = '';
    input.focus();
}

// Process command
async function processCommand(cmd) {
    const trimmedCmd = cmd.trim();

    if (trimmedCmd === '') return;

    // Add to history
    commandHistory.push(cmd);
    historyIndex = commandHistory.length;

    // Handle chat mode
    if (chatMode) {
        if (trimmedCmd.toLowerCase() === 'exit') {
            chatMode = false;
            chatContext = [];
            const result = commands.exit();
            await printOutput(result, true, cmd);
        } else {
            const response = getAIResponse(trimmedCmd);
            await printOutput(response, true, cmd);
        }
        return;
    }

    // Execute command
    const cmdLower = trimmedCmd.toLowerCase();
    if (commands[cmdLower]) {
        // Show command
        if (cmdLower === 'hack') {
            await printOutput('', true, cmd);
            await commands[cmdLower]();
        } else {
            const result = commands[cmdLower]();
            await printOutput(result, true, cmd);
        }
    } else {
        const errorMsg = `<span class="error">Command not found: ${cmd}</span>\n<span class="info">Type 'help' to see available commands.</span>`;
        await printOutput(errorMsg, true, cmd);
    }
}

// AI Response Generator
function getAIResponse(message) {
    chatContext.push(message);
    const lowerMsg = message.toLowerCase();

    // Greeting responses
    if (lowerMsg.match(/^(hi|hello|hey|greetings)/)) {
        return `<span class="success"><img src="images/jiraya.jpg" alt="Jiraya" style="width:20px;height:20px;vertical-align:middle;border-radius:50%;"> Jiraya:</span> Hello! I'm Jiraya, Ajal's AI assistant. How can I help you learn about him today? Feel free to ask about projects, skills, or anything else!`;
    }

    // Project-related questions
    if (lowerMsg.includes('project') || lowerMsg.includes('work') || lowerMsg.includes('built')) {
        const project = portfolioData.projects[Math.floor(Math.random() * portfolioData.projects.length)];
        return `<span class="success"><img src="images/jiraya.jpg" alt="Jiraya" style="width:20px;height:20px;vertical-align:middle;border-radius:50%;"> Jiraya:</span> Great question! One of the exciting projects is "${project.name}" built with ${project.tech}. ${project.description}\n\nType 'projects' to see all projects, or ask me something else!`;
    }

    // Skills-related questions
    if (lowerMsg.includes('skill') || lowerMsg.includes('technology') || lowerMsg.includes('tech stack')) {
        const categories = Object.keys(portfolioData.skills);
        const randomCat = categories[Math.floor(Math.random() * categories.length)];
        return `<span class="success"><img src="images/jiraya.jpg" alt="Jiraya" style="width:20px;height:20px;vertical-align:middle;border-radius:50%;"> Jiraya:</span> ${portfolioData.name} has strong expertise in ${randomCat}: ${portfolioData.skills[randomCat].join(', ')}. \n\nType 'skills' to see the complete skill set!`;
    }

    // Experience-related questions
    if (lowerMsg.includes('experience') || lowerMsg.includes('worked') || lowerMsg.includes('job')) {
        const job = portfolioData.experience_details[0];
        return `<span class="success"><img src="images/jiraya.jpg" alt="Jiraya" style="width:20px;height:20px;vertical-align:middle;border-radius:50%;"> Jiraya:</span> Currently working as ${job.role} at ${job.company} since ${job.period}. Key achievements include ${job.responsibilities[0].toLowerCase()}.\n\nType 'experience' for full work history!`;
    }

    // Contact-related questions
    if (lowerMsg.includes('contact') || lowerMsg.includes('email') || lowerMsg.includes('reach') || lowerMsg.includes('hire')) {
        return `<span class="success"><img src="images/jiraya.jpg" alt="Jiraya" style="width:20px;height:20px;vertical-align:middle;border-radius:50%;"> Jiraya:</span> You can reach out at ${portfolioData.email} or connect on LinkedIn: ${portfolioData.linkedin}. \n\nType 'contact' for all contact information!`;
    }

    // AI/ML related questions
    if (lowerMsg.includes('ai') || lowerMsg.includes('machine learning') || lowerMsg.includes('artificial intelligence')) {
        return `<span class="success"><img src="images/jiraya.jpg" alt="Jiraya" style="width:20px;height:20px;vertical-align:middle;border-radius:50%;"> Jiraya:</span> ${portfolioData.name} is passionate about AI & ML! Experienced with ${portfolioData.skills['AI/ML'].join(', ')}. Currently working on AI-powered projects and exploring the latest in generative AI!`;
    }

    // Location/availability questions
    if (lowerMsg.includes('location') || lowerMsg.includes('where') || lowerMsg.includes('available')) {
        return `<span class="success"><img src="images/jiraya.jpg" alt="Jiraya" style="width:20px;height:20px;vertical-align:middle;border-radius:50%;"> Jiraya:</span> Based in ${portfolioData.location}, but open to remote opportunities worldwide. Available for exciting projects and collaborations!`;
    }

    // Generic helpful response
    const responses = [
        `<span class="success"><img src="images/jiraya.jpg" alt="Jiraya" style="width:20px;height:20px;vertical-align:middle;border-radius:50%;"> Jiraya:</span> That's an interesting question! With ${portfolioData.experience} of experience, I can help answer questions about projects, skills, or career. What would you like to know?`,
        `<span class="success"><img src="images/jiraya.jpg" alt="Jiraya" style="width:20px;height:20px;vertical-align:middle;border-radius:50%;"> Jiraya:</span> I'd love to help! Try asking about specific projects, technical skills, or work experience. You can also type 'help' to see all available commands.`,
        `<span class="success"><img src="images/jiraya.jpg" alt="Jiraya" style="width:20px;height:20px;vertical-align:middle;border-radius:50%;"> Jiraya:</span> Great question! ${portfolioData.name} specializes in ${portfolioData.title} with expertise in modern web technologies and AI. What specific area interests you?`,
        `<span class="success"><img src="images/jiraya.jpg" alt="Jiraya" style="width:20px;height:20px;vertical-align:middle;border-radius:50%;"> Jiraya:</span> I can provide information about projects, skills, experience, and more. Try asking something like "What projects have you built?" or "What are your skills?"`
    ];

    return responses[Math.floor(Math.random() * responses.length)];
}

// Handle input
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const command = input.value;
        processCommand(command);
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
        const currentInput = input.value.toLowerCase();
        const matchingCommands = Object.keys(commands).filter(cmd =>
            cmd.startsWith(currentInput)
        );

        if (matchingCommands.length === 1) {
            input.value = matchingCommands[0];
        } else if (matchingCommands.length > 1) {
            const suggestions = matchingCommands.join('  ');
            printOutput(`<span class="info">${suggestions}</span>`, false);
        }
    }
});

// Keep input focused
document.addEventListener('click', () => {
    input.focus();
});

// 3D Card Effect
const card = document.querySelector('.interactive-card');
if (card) {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
}

// Initialize on load
window.addEventListener('load', init);
