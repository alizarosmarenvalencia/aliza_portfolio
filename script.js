document.addEventListener('DOMContentLoaded', () => {

  const themeToggleBtns = [
    document.getElementById('themeToggleBtn'),
    document.getElementById('themeToggleBtnMobile')
  ];

  function toggleTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    
    themeToggleBtns.forEach(btn => {
      if (btn) {
        btn.innerHTML = newTheme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
      }
    });
  }

  themeToggleBtns.forEach(btn => {
    if (btn) btn.addEventListener('click', toggleTheme);
  });

  const menuToggleBtn = document.getElementById('menuToggleBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  menuToggleBtn.addEventListener('click', () => {
    mobileDrawer.classList.toggle('open');
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
    });
  });

  const skillTabs = document.querySelectorAll('.skill-tab');
  const skillCards = document.querySelectorAll('.skill-card');

  skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      skillTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      skillCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const chatBody = document.getElementById('chatBody');
  const resetChatBtn = document.getElementById('resetChatBtn');
  const chipBtns = document.querySelectorAll('.chip-btn');

  const knowledgeBase = [
    {
      keywords: ['education', 'degree', 'university', 'college', 'school', 'study', 'berkeley', 'gpa'],
      answer: "I graduated Magna Cum Laude with a B.S. in Computer Science from UC Berkeley in 2024, maintaining a 3.9 GPA!"
    },
    {
      keywords: ['skills', 'tech', 'stack', 'languages', 'code', 'react', 'javascript', 'node', 'python'],
      answer: "My core stack includes JavaScript/TypeScript, React, Next.js, HTML5/CSS3, Node.js, Express, Python, and PostgreSQL."
    },
    {
      keywords: ['hire', 'status', 'available', 'job', 'work', 'opportunity', 'full-time'],
      answer: "Yes! I am actively open for full-time software engineering roles, hybrid, or remote projects."
    },
    {
      keywords: ['project', 'best', 'ecotrack', 'pulse', 'portfolio'],
      answer: "Check out EcoTrack Analytics! It's an enterprise emissions tracking system featuring real-time data visualization."
    },
    {
      keywords: ['leadership', 'hackathon', 'cal hacks', 'award'],
      answer: "I served as Lead Tech Fellow at UC Berkeley and won 1st Place at Cal Hacks by developing an accessible AI speech translation system."
    }
  ];

  function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${sender}`;
    msgDiv.innerHTML = `<div class="msg-content">${text}</div>`;
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function handleQuestion(questionText) {
    appendMessage(questionText, 'user');
    chatInput.value = '';

    setTimeout(() => {
      const qLower = questionText.toLowerCase();
      let match = knowledgeBase.find(kb => kb.keywords.some(k => qLower.includes(k)));

      if (match) {
        appendMessage(match.answer, 'bot');
      } else {
        appendMessage("I'm happy to help! Try asking about my education, skills, hiring status, or projects using the quick buttons above.", 'bot');
      }
    }, 400);
  }

  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (chatInput.value.trim()) {
      handleQuestion(chatInput.value.trim());
    }
  });

  chipBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      handleQuestion(btn.getAttribute('data-q'));
    });
  });

  resetChatBtn.addEventListener('click', () => {
    chatBody.innerHTML = `
      <div class="chat-msg bot">
        <div class="msg-content">
          Chat cleared! Ask me anything about Alex's background or skills. 👋
        </div>
      </div>`;
  });

  const projectModal = document.getElementById('projectModal');
  const modalContent = document.getElementById('modalContent');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalTriggers = document.querySelectorAll('.modal-trigger');

  const projectDetailsMap = {
    ecotrack: {
      title: "EcoTrack Analytics Dashboard",
      role: "Lead Full-Stack Developer",
      desc: "An enterprise platform that visualizes real-time industrial carbon metrics and auto-generates compliance PDFs.",
      tech: ["React.js", "Chart.js", "Node.js", "Express", "PostgreSQL"],
      highlights: ["Built dynamic rendering charts for large time-series datasets.", "Optimized backend aggregation endpoints by 40%."]
    },
    pulseflow: {
      title: "Pulse Flow Workspace",
      role: "Frontend Engineer & UX Designer",
      desc: "A clean collaborative workspace designed for modern remote teams with Kanban boards and live sync.",
      tech: ["JavaScript (ES6+)", "HTML5 / CSS3 Grid", "WebSockets", "LocalStorage API"],
      highlights: ["Implemented zero-latency UI drag-and-drop mechanics.", "Integrated custom focus-sound generator."]
    }
  };

  modalTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-project');
      const details = projectDetailsMap[key];

      if (details) {
        modalContent.innerHTML = `
          <h3 style="font-size: 1.4rem; margin-bottom: 6px;">${details.title}</h3>
          <p style="font-size: 0.85rem; color: var(--accent-sage); font-weight: 700; margin-bottom: 12px;">${details.role}</p>
          <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 15px;">${details.desc}</p>
          <h4 style="font-size: 0.95rem; margin-bottom: 6px;">Key Tech:</h4>
          <p style="font-size: 0.85rem; margin-bottom: 15px;">${details.tech.join(" • ")}</p>
          <h4 style="font-size: 0.95rem; margin-bottom: 6px;">Highlights:</h4>
          <ul style="padding-left: 20px; font-size: 0.88rem; color: var(--text-muted);">
            ${details.highlights.map(h => `<li style="margin-bottom: 4px;">${h}</li>`).join('')}
          </ul>
        `;
        projectModal.classList.add('open');
      }
    });
  });

  modalCloseBtn.addEventListener('click', () => {
    projectModal.classList.remove('open');
  });

  projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
      projectModal.classList.remove('open');
    }
  });

  const copyEmailCard = document.getElementById('copyEmailCard');
  copyEmailCard.addEventListener('click', () => {
    const email = "alex.rivera.dev@example.com";
    navigator.clipboard.writeText(email);
    const detailVal = copyEmailCard.querySelector('.detail-val');
    const oldText = detailVal.innerText;
    detailVal.innerText = "Email Copied to Clipboard! ✓";
    setTimeout(() => {
      detailVal.innerText = oldText;
    }, 2000);
  });

  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formFeedback.innerText = "Thank you! Your message has been sent successfully. ✓";
    contactForm.reset();

    setTimeout(() => {
      formFeedback.innerText = "";
    }, 4000);
  });

});