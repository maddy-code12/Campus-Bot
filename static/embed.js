(function () {
  if (window.__PDACampusBotEmbedLoaded) return;
  window.__PDACampusBotEmbedLoaded = true;

  // Resolve base URL from script src
  var scriptOrigin = "https://campus-bot-lnwe.onrender.com";
  if (document.currentScript && document.currentScript.src) {
    try {
      scriptOrigin = new URL(document.currentScript.src).origin;
    } catch (e) {}
  }

  // Inject Styles
  var style = document.createElement("style");
  style.id = "pda-embed-styles";
  style.textContent = `
    .pda-embed-launcher {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 58px;
      height: 58px;
      border-radius: 50%;
      background: linear-gradient(135deg, #311068, #4c1d95);
      border: 2px solid #f59e0b;
      box-shadow: 0 6px 24px rgba(0, 0, 0, 0.4), 0 0 12px rgba(245, 158, 11, 0.35);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2147483647;
      transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }
    .pda-embed-launcher:hover {
      transform: scale(1.08);
      box-shadow: 0 8px 28px rgba(0, 0, 0, 0.5), 0 0 18px rgba(245, 158, 11, 0.6);
    }
    .pda-embed-launcher:active {
      transform: scale(0.96);
    }
    .pda-embed-launcher img {
      width: 36px;
      height: 36px;
      object-fit: contain;
      pointer-events: none;
    }
    .pda-embed-tooltip {
      position: absolute;
      right: 70px;
      background: rgba(15, 23, 42, 0.95);
      color: #f8fafc;
      font-family: system-ui, -apple-system, sans-serif;
      font-size: 12px;
      font-weight: 600;
      padding: 6px 12px;
      border-radius: 8px;
      white-space: nowrap;
      border: 1px solid rgba(245, 158, 11, 0.4);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);
      pointer-events: none;
      opacity: 0;
      transform: translateX(8px);
      transition: opacity 0.2s ease, transform 0.2s ease;
    }
    .pda-embed-launcher:hover .pda-embed-tooltip {
      opacity: 1;
      transform: translateX(0);
    }
    .pda-embed-panel {
      position: fixed;
      bottom: 92px;
      right: 24px;
      width: 380px;
      height: 600px;
      max-width: calc(100vw - 32px);
      max-height: calc(100vh - 110px);
      background: #090d16;
      border-radius: 18px;
      border: 1px solid rgba(124, 58, 237, 0.35);
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6), 0 0 20px rgba(76, 29, 149, 0.3);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      z-index: 2147483646;
      opacity: 0;
      transform: translateY(18px) scale(0.96);
      pointer-events: none;
      transition: opacity 0.28s cubic-bezier(0.16, 1, 0.3, 1), transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .pda-embed-panel.pda-open {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: auto;
    }
    .pda-embed-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 14px;
      background: linear-gradient(135deg, #1e113a, #2e1065);
      border-bottom: 1px solid rgba(124, 58, 237, 0.25);
    }
    .pda-embed-header-left {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .pda-embed-header-left img {
      width: 24px;
      height: 24px;
      object-fit: contain;
    }
    .pda-embed-header-title {
      font-family: system-ui, -apple-system, sans-serif;
      font-size: 13px;
      font-weight: 700;
      color: #f8fafc;
      line-height: 1.2;
    }
    .pda-embed-header-sub {
      font-family: system-ui, -apple-system, sans-serif;
      font-size: 10.5px;
      color: #cbd5e1;
      display: block;
    }
    .pda-embed-close-btn {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: none;
      background: rgba(255, 255, 255, 0.1);
      color: #e2e8f0;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 700;
      transition: background 0.2s ease, color 0.2s ease;
    }
    .pda-embed-close-btn:hover {
      background: rgba(239, 68, 68, 0.3);
      color: #ffffff;
    }
    .pda-embed-iframe {
      flex: 1;
      width: 100%;
      height: 100%;
      border: none;
      background: #090d16;
    }
    @media (max-width: 480px) {
      .pda-embed-panel {
        bottom: 0;
        right: 0;
        width: 100vw;
        height: 100vh;
        max-width: 100vw;
        max-height: 100vh;
        border-radius: 0;
      }
      .pda-embed-launcher {
        bottom: 16px;
        right: 16px;
      }
    }
  `;
  document.head.appendChild(style);

  // Floating Launcher Button
  var launcher = document.createElement("div");
  launcher.className = "pda-embed-launcher";
  launcher.setAttribute("role", "button");
  launcher.setAttribute("aria-label", "Ask Campus Bot");
  launcher.innerHTML = `
    <img src="${scriptOrigin}/static/pda_logo.png" alt="PDA College of Engineering" />
    <span class="pda-embed-tooltip">Ask Campus Bot</span>
  `;

  // Chat Panel with Iframe
  var panel = document.createElement("div");
  panel.className = "pda-embed-panel";
  panel.innerHTML = `
    <div class="pda-embed-header">
      <div class="pda-embed-header-left">
        <img src="${scriptOrigin}/static/pda_logo.png" alt="PDA Logo" />
        <div>
          <span class="pda-embed-header-title">PDA Campus Bot</span>
          <span class="pda-embed-header-sub">Poojya Doddappa Appa College of Engg.</span>
        </div>
      </div>
      <button class="pda-embed-close-btn" aria-label="Close Chat">✕</button>
    </div>
    <iframe class="pda-embed-iframe" src="${scriptOrigin}/" title="PDA Campus Bot"></iframe>
  `;

  document.body.appendChild(launcher);
  document.body.appendChild(panel);

  var isOpen = false;

  function toggleChat() {
    isOpen = !isOpen;
    if (isOpen) {
      panel.classList.add("pda-open");
    } else {
      panel.classList.remove("pda-open");
    }
  }

  launcher.addEventListener("click", function (e) {
    e.stopPropagation();
    toggleChat();
  });

  var closeBtn = panel.querySelector(".pda-embed-close-btn");
  if (closeBtn) {
    closeBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      isOpen = false;
      panel.classList.remove("pda-open");
    });
  }
})();
