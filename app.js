// ====================== app.js - COMPLETO ======================

let currentUser = null;
let isMaster = false;  // ← MUDE PARA "true" quando quiser acessar como Mestre

// ==================== DADOS DO SISTEMA ====================
const races = [
  { nome: "Humano", bonus: "+2 em qualquer, +1 em outro", hab: "Persuasão" },
  { nome: "Elfo", bonus: "+2 AGI, +1 MAG", hab: "Conhecimento Arcano" },
  { nome: "Anão", bonus: "+2 FOR, +1 ESP", hab: "Ofícios / Engenhosaria" },
  { nome: "Halfling", bonus: "+2 AGI, +1 INT", hab: "Acrobacia" },
  { nome: "Gnomo", bonus: "+2 INT, +1 MAG", hab: "Alquimia" },
  { nome: "Goblin", bonus: "+2 AGI, +1 INT", hab: "Furtividade" },
  { nome: "Tiefling", bonus: "+2 MAG, +1 ESP", hab: "Intimidação" },
  { nome: "Draconato", bonus: "+2 FOR, +1 MAG", hab: "Luta Desarmada" },
  { nome: "Meio-Orc", bonus: "+2 FOR, +1 ESP", hab: "Intimidação" },
  { nome: "Povo-Gato (Tabaxi)", bonus: "+2 AGI, +1 INT", hab: "Acrobacia" },
  { nome: "Aasimar", bonus: "+2 MAG, +1 ESP", hab: "Persuasão" },
  { nome: "Minotauro", bonus: "+2 FOR, +1 ESP", hab: "Intimidação" },
  { nome: "Fada", bonus: "+2 AGI, +1 MAG", hab: "Conhecimento Arcano" }
];

const professions = [
  { nome: "Guerreiro", p1: "Luta Desarmada", p2: "Intimidação" },
  { nome: "Ladrão / Batedor", p1: "Furtividade", p2: "Acrobacia" },
  { nome: "Explorador", p1: "Sobrevivência", p2: "Rastreamento" },
  { nome: "Mago de Rua", p1: "Magia", p2: "Conhecimento Arcano" },
  { nome: "Alquimista", p1: "Alquimia", p2: "Ofícios / Engenhosaria" },
  { nome: "Curandeiro", p1: "Herborismo / Medicina", p2: "Intuição" },
  { nome: "Diplomata", p1: "Persuasão", p2: "Blefe / Dissimulação" },
  { nome: "Caçador", p1: "Rastreamento", p2: "Percepção" },
  { nome: "Ferreiro", p1: "Ofícios / Engenhosaria", p2: "Atletismo" },
  { nome: "Investigador", p1: "Investigação", p2: "Percepção" }
];

// ==================== FUNÇÕES ====================
function renderSidebar() {
  const menu = document.getElementById('sidebar-menu');
  menu.innerHTML = `
    <div onclick="loadPage('creator')" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-800 cursor-pointer transition"><i class="fas fa-user-plus w-5"></i><span>Criar Personagem</span></div>
    <div onclick="loadPage('my-characters')" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-800 cursor-pointer transition"><i class="fas fa-scroll w-5"></i><span>Meus Personagens</span></div>
    ${isMaster ? `<div onclick="loadPage('all-characters')" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-800 cursor-pointer transition"><i class="fas fa-users w-5"></i><span>Todos os Personagens</span></div>` : ''}
    <div onclick="loadPage('races')" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-800 cursor-pointer transition"><i class="fas fa-dragon w-5"></i><span>Raças</span></div>
    <div onclick="loadPage('professions')" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-800 cursor-pointer transition"><i class="fas fa-briefcase w-5"></i><span>Profissões</span></div>
    <div onclick="loadPage('rules')" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-800 cursor-pointer transition"><i class="fas fa-book w-5"></i><span>Regras Básicas</span></div>
  `;
}

function loadPage(page) {
  const content = document.getElementById('main-content');
  
  if (page === 'creator') content.innerHTML = creatorHTML();
  else if (page === 'my-characters') {
    content.innerHTML = `<div class="p-8"><h2 class="text-3xl font-bold mb-6">Meus Personagens</h2><div id="my-chars-list" class="grid grid-cols-1 md:grid-cols-2 gap-6"></div></div>`;
    loadMyCharacters();
  }
  else if (page === 'all-characters' && isMaster) {
    content.innerHTML = `<div class="p-8"><h2 class="text-3xl font-bold mb-6">Todos os Personagens (Mestre)</h2><div id="all-chars-list" class="grid grid-cols-1 md:grid-cols-2 gap-6"></div></div>`;
    loadAllCharacters();
  }
  else if (page === 'races') loadRacesPage(content);
  else if (page === 'professions') loadProfessionsPage(content);
  else if (page === 'rules') content.innerHTML = rulesHTML();
}

// ==================== CRIADOR DE PERSONAGEM ====================
function creatorHTML() {
  let attrHTML = '';
  ['FOR','AGI','INT','MAG','ESP'].forEach(at => {
    attrHTML += `
      <div class="text-center">
        <label class="block text-xs mb-1 text-zinc-400">${at}</label>
        <input type="number" id="${at}" value="0" min="-2" max="4" 
               oninput="updatePreview()" 
               class="w-20 bg-zinc-800 text-center text-3xl rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-amber-500">
      </div>`;
  });

  let raceOptions = '<option value="">Selecione uma raça...</option>';
  races.forEach(r => raceOptions += `<option value="${r.nome}">${r.nome}</option>`);

  let profOptions = '<option value="">Selecione uma profissão...</option>';
  professions.forEach(p => profOptions += `<option value="${p.nome}">${p.nome}</option>`);

  return `
    <div class="p-10 max-w-6xl mx-auto">
      <h1 class="text-4xl font-bold mb-10">Criação de Personagem</h1>
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div class="lg:col-span-7 space-y-8">
          <div>
            <label class="block text-sm mb-2">Nome do Personagem</label>
            <input id="char-name" class="w-full bg-zinc-900 border border-zinc-700 rounded-2xl px-6 py-5 text-xl" placeholder="Ex: Thalor Shadowblade">
          </div>
          <div class="grid grid-cols-2 gap-6">
            <div>
              <label class="block text-sm mb-2">Raça</label>
              <select id="char-race" onchange="updatePreview()" class="w-full bg-zinc-900 border border-zinc-700 rounded-2xl px-6 py-5">${raceOptions}</select>
            </div>
            <div>
              <label class="block text-sm mb-2">Profissão</label>
              <select id="char-prof" onchange="updatePreview()" class="w-full bg-zinc-900 border border-zinc-700 rounded-2xl px-6 py-5">${profOptions}</select>
            </div>
          </div>
          <div>
            <label class="block text-sm mb-4">Distribua 6 Pontos nos Atributos</label>
            <div class="grid grid-cols-5 gap-6">${attrHTML}</div>
            <p id="points-remaining" class="text-center mt-6 text-emerald-400 font-medium">Pontos restantes: <strong>6</strong></p>
          </div>
        </div>

        <!-- Preview -->
        <div class="lg:col-span-5">
          <div class="bg-zinc-900 border border-amber-900 rounded-3xl p-8 sticky top-8" id="preview-card">
            <h3 class="text-2xl font-bold mb-6 text-center">Visualização da Ficha</h3>
            <div id="preview-content" class="min-h-[400px]"></div>
            <button onclick="saveCharacter()" class="mt-8 w-full bg-gradient-to-r from-amber-600 to-yellow-600 py-6 rounded-2xl text-xl font-bold">💾 SALVAR PERSONAGEM</button>
          </div>
        </div>
      </div>
    </div>`;
}

function updatePreview() {
  const name = document.getElementById('char-name').value || "Sem Nome";
  const race = document.getElementById('char-race').value;
  const prof = document.getElementById('char-prof').value;

  const forVal = parseInt(document.getElementById('FOR').value) || 0;
  const agiVal = parseInt(document.getElementById('AGI').value) || 0;
  const intVal = parseInt(document.getElementById('INT').value) || 0;
  const magVal = parseInt(document.getElementById('MAG').value) || 0;
  const espVal = parseInt(document.getElementById('ESP').value) || 0;

  const total = forVal + agiVal + intVal + magVal + espVal;
  document.getElementById('points-remaining').innerHTML = `Pontos restantes: <strong>${6 - total}</strong>`;

  const pv = 8 + (forVal * 2);
  const mana = 4 + (magVal * 2);
  const san = 8 + (espVal * 2);
  const def = 10 + agiVal;
  const mov = 3 + agiVal;

  document.getElementById('preview-content').innerHTML = `
    <p class="text-2xl font-bold">${name}</p>
    <p class="text-amber-400">${race} • ${prof}</p>
    <hr class="my-6 border-zinc-700">
    <div class="grid grid-cols-2 gap-y-4 text-lg">
      <p><strong>PV:</strong> ${pv}</p>
      <p><strong>Mana:</strong> ${mana}</p>
      <p><strong>Sanidade:</strong> ${san}</p>
      <p><strong>Defesa:</strong> ${def}</p>
      <p><strong>Movimento:</strong> ${mov}</p>
    </div>
  `;
}

async function saveCharacter() {
  if (!currentUser) return alert("Você precisa estar logado!");

  const character = {
    nome: document.getElementById('char-name').value || "Sem Nome",
    raca: document.getElementById('char-race').value,
    profissao: document.getElementById('char-prof').value,
    atributos: {
      FOR: parseInt(document.getElementById('FOR').value) || 0,
      AGI: parseInt(document.getElementById('AGI').value) || 0,
      INT: parseInt(document.getElementById('INT').value) || 0,
      MAG: parseInt(document.getElementById('MAG').value) || 0,
      ESP: parseInt(document.getElementById('ESP').value) || 0
    },
    userId: currentUser.uid,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  };

  try {
    await db.collection("characters").add(character);
    alert("✅ Personagem salvo com sucesso!");
    loadPage('my-characters');
  } catch (e) {
    alert("Erro ao salvar: " + e.message);
  }
}

// ==================== OUTRAS PÁGINAS ====================
function loadRacesPage(content) {
  let html = '<div class="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">';
  races.forEach(r => {
    html += `
      <div class="bg-zinc-900 rounded-2xl p-6">
        <h3 class="text-xl font-bold text-amber-400">${r.nome}</h3>
        <p><strong>Bônus:</strong> ${r.bonus}</p>
        <p><strong>Perícia:</strong> ${r.hab}</p>
      </div>`;
  });
  html += '</div>';
  content.innerHTML = `<h2 class="text-3xl font-bold p-8">Raças</h2>` + html;
}

function loadProfessionsPage(content) {
  let html = '<div class="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">';
  professions.forEach(p => {
    html += `
      <div class="bg-zinc-900 rounded-2xl p-6">
        <h3 class="text-xl font-bold">${p.nome}</h3>
        <p>${p.p1} (+2) e ${p.p2} (+2)</p>
      </div>`;
  });
  html += '</div>';
  content.innerHTML = `<h2 class="text-3xl font-bold p-8">Profissões</h2>` + html;
}

function rulesHTML() {
  return `
    <div class="p-10 max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold mb-10">Regras Básicas</h1>
      <h2 class="text-2xl font-bold mt-8">Atributos</h2>
      <p>PV = 8 + (FOR × 2)<br>Mana = 4 + (MAG × 2)<br>Sanidade = 8 + (ESP × 2)</p>
      <p>Defesa = 10 + AGI | Movimento = 3 + AGI</p>
      <h2 class="text-2xl font-bold mt-8">Perícias</h2>
      <p>Treinada = +2 | Especialista = +4</p>
    </div>`;
}

async function loadMyCharacters() {
  const container = document.getElementById('my-chars-list');
  container.innerHTML = "<p class='text-zinc-400'>Carregando...</p>";
  // Implementação básica por enquanto
  container.innerHTML = "<p class='text-emerald-400'>Seus personagens aparecerão aqui.</p>";
}

async function loadAllCharacters() {
  const container = document.getElementById('all-chars-list');
  container.innerHTML = "<p class='text-emerald-400'>Todos os personagens dos jogadores aparecerão aqui (Mestre).</p>";
}

function showLogin() {
  document.getElementById('main-content').innerHTML = `
    <div class="h-full flex items-center justify-center rune-bg">
      <div class="bg-zinc-900 p-12 rounded-3xl w-96 text-center">
        <h2 class="text-3xl font-bold mb-8">Bem-vindo ao RPG Creator</h2>
        <button onclick="register()" class="w-full py-5 bg-emerald-600 rounded-2xl mb-4 text-lg">Criar Conta</button>
        <button onclick="login()" class="w-full py-5 border border-zinc-600 rounded-2xl text-lg">Entrar</button>
      </div>
    </div>`;
}

window.login = () => {
  const email = prompt("Digite seu email:");
  const pass = prompt("Digite sua senha:");
  auth.signInWithEmailAndPassword(email, pass).catch(e => alert(e.message));
};

window.register = () => {
  const email = prompt("Digite seu email:");
  const pass = prompt("Crie uma senha (mínimo 6 caracteres):");
  auth.createUserWithEmailAndPassword(email, pass).catch(e => alert(e.message));
};

// ==================== INICIALIZAÇÃO ====================
firebase.auth().onAuthStateChanged(user => {
  currentUser = user;
  if (user) {
    document.getElementById('user-panel').innerHTML = `
      <p class="text-emerald-400">${user.email}</p>
      <button onclick="auth.signOut()" class="text-red-400 text-sm mt-2">Sair</button>`;
    renderSidebar();
    loadPage('creator');
  } else {
    showLogin();
  }
});
