let htmlEditor, cssEditor, jsEditor;

document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  const loginForm = document.getElementById("loginForm");

  // Signup
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = signupEmail.value;
      const password = signupPassword.value;
      localStorage.setItem("user", JSON.stringify({ email, password }));
      alert("Account created! Please log in.");
      location.href = "index.html";
    });
  }

  // Login
  
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = loginEmail.value;
      const password = loginPassword.value;
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.email === email && user.password === password) {
        location.href = "editor.html";
      } else alert("Invalid email or password");
    });
  }

  // Editor setup
  if (document.getElementById("html")) {
    htmlEditor = CodeMirror.fromTextArea(document.getElementById("html"), {
      mode: "htmlmixed",
      theme: "dracula",
      lineNumbers: true,
      tabSize: 2,
    });
    cssEditor = CodeMirror.fromTextArea(document.getElementById("css"), {
      mode: "css",
      theme: "dracula",
      lineNumbers: true,
      tabSize: 2,
    });
    jsEditor = CodeMirror.fromTextArea(document.getElementById("js"), {
      mode: "javascript",
      theme: "dracula",
      lineNumbers: true,
      tabSize: 2,
    });

    // Fix CodeMirror sizing
    setTimeout(() => {
      htmlEditor.refresh();
      cssEditor.refresh();
      jsEditor.refresh();
    }, 200);

    // Auto run
    [htmlEditor, cssEditor, jsEditor].forEach(ed => {
      ed.on("change", () => runCode());
    });
  }
});

function openTab(tab) {
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  document.querySelectorAll(".CodeMirror").forEach(cm => cm.parentElement.style.display = "none");

  const editors = { html: htmlEditor, css: cssEditor, js: jsEditor };
  document.querySelector(`.tab:nth-child(${tab === "html" ? 1 : tab === "css" ? 2 : 3})`).classList.add("active");

  editors[tab].getWrapperElement().parentElement.style.display = "flex";
  editors[tab].refresh();
}

function runCode() {
  const output = document.getElementById("output");
  const html = htmlEditor.getValue();
  const css = `<style>${cssEditor.getValue()}</style>`;
  const js = `<script>${jsEditor.getValue()}<\/script>`;
  output.srcdoc = html + css + js;
}

function saveProject() {
  const data = {
    html: htmlEditor.getValue(),
    css: cssEditor.getValue(),
    js: jsEditor.getValue(),
  };
  localStorage.setItem("hahuidesave", JSON.stringify(data));
  alert("Project saved!");
}

function loadProject() {
  const project = JSON.parse(localStorage.getItem("hahuidesave"));
  if (!project) return alert("No saved project found.");
  htmlEditor.setValue(project.html);
  cssEditor.setValue(project.css);
  jsEditor.setValue(project.js);
  alert("Project loaded!");
}

function logout() {
  location.href = "index.html";
}
