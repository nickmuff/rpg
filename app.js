// ====================== app.js - NECTOFLORA RPG COMPLETO ======================

let currentUser = null;
let isMaster = false; // Mude para "true" quando quiser acessar como Mestre

// ==================== DADOS DO SISTEMA ====================

const races = [
  { nome: "Humano", bonus: "+2 em qualquer, +1 em outro", hab: "Persuasão", habilidade: "+1 perícia treinada extra" },
  { nome: "Elfo", bonus: "+2 AGI, +1 MAG", hab: "Conhecimento Arcano", habilidade: "Vantagem em Percepção em florestas/ruínas" },
  { nome: "Anão", bonus: "+2 FOR, +1 ESP", hab: "Ofícios / Engenhosaria", habilidade: "Resistência +3 contra veneno" },
  { nome: "Halfling", bonus: "+2 AGI, +1 INT", hab: "Acrobacia", habilidade: "Vantagem em Furtividade quando menor" },
  { nome: "Gnomo", bonus: "+2 INT, +1 MAG", hab: "Alquimia", habilidade: "1x/dia crie ilusão pequena" },
  { nome: "Goblin", bonus: "+2 AGI, +1 INT", hab: "Furtividade", habilidade: "Use objetos como arma +1d4 dano" },
  { nome: "Povo-Rato", bonus: "+2 AGI, +1 ESP", hab: "Rastreamento", habilidade: "Escala paredes/tetos" },
  { nome: "Tiefling", bonus: "+2 MAG, +1 ESP", hab: "Intimidação", habilidade: "1x/combate lance chamas (2d6)" },
  { nome: "Draconato", bonus: "+2 FOR, +1 MAG", hab: "Luta Desarmada", habilidade: "Sopra elemento 1x/combate (2d8)" },
  { nome: "Meio-Orc", bonus: "+2 FOR, +1 ESP", hab: "Intimidação", habilidade: "Volte com 1 PV ao cair 1x/dia" },
  { nome: "Centauro", bonus: "+2 FOR, +1 AGI", hab: "Atletismo", habilidade: "Movimento +4 e carregar aliado" },
  { nome: "Lagarto", bonus: "+2 FOR, +1 ESP", hab: "Sobrevivência", habilidade: "Regenera 1d6 PV em água/sombra" },
  { nome: "Povo-Gato (Tabaxi)", bonus: "+2 AGI, +1 INT", hab: "Acrobacia", habilidade: "Queda sem dano + visão noturna" },
  { nome: "Aasimar", bonus: "+2 MAG, +1 ESP", hab: "Persuasão", habilidade: "1x/dia luz sagrada (cura ou 2d6 dano)" },
  { nome: "Kenku", bonus: "+2 INT, +1 AGI", hab: "Blefe", habilidade: "Copie perfeitamente qualquer som" },
  { nome: "Tritão", bonus: "+2 AGI, +1 MAG", hab: "Pilotagem Flutuante", habilidade: "Respira em água + dobro de velocidade" },
  { nome: "Genasi do Fogo", bonus: "+2 MAG, +1 FOR", hab: "Magia", habilidade: "Imune a fogo + +1d6 dano fogo" },
  { nome: "Fada", bonus: "+2 AGI, +1 MAG", hab: "Conhecimento Arcano", habilidade: "1x/dia fique minúsculo e voe" },
  { nome: "Minotauro", bonus: "+2 FOR, +1 ESP", hab: "Intimidação", habilidade: "Investida poderosa +2d6 dano" },
  { nome: "Povo-Raposa (Scarfox)", bonus: "+2 INT, +1 AGI", hab: "Blefe", habilidade: "1x/dia crie ilusão de si mesmo" }
];

const professions = [
  { nome: "Guerreiro", p1: "Luta Desarmada", p2: "Intimidação / Liderança", bonus: "+1 dano corpo a corpo" },
  { nome: "Ladrão / Batedor", p1: "Furtividade", p2: "Acrobacia", bonus: "Vantagem em abrir fechaduras" },
  { nome: "Explorador", p1: "Sobrevivência", p2: "Rastreamento", bonus: "+2 em testes de orientação" },
  { nome: "Mago de Rua", p1: "Magia", p2: "Conhecimento Arcano", bonus: "+1 Mana máximo" },
  { nome: "Alquimista", p1: "Alquimia", p2: "Ofícios / Engenhosaria", bonus: "Começa com 2 poções simples" },
  { nome: "Curandeiro / Herbalista", p1: "Herborismo / Medicina", p2: "Intuição", bonus: "Cura +1d4 extra" },
  { nome: "Mercador / Diplomata", p1: "Persuasão / Diplomacia", p2: "Blefe / Dissimulação", bonus: "+10% em barganhas" },
  { nome: "Caçador", p1: "Rastreamento", p2: "Percepção", bonus: "+1d4 dano em ataques surpresa" },
  { nome: "Ferreiro / Artífice", p1: "Ofícios / Engenhosaria", p2: "Atletismo", bonus: "Conserta itens mais rápido" },
  { nome: "Guarda / Soldado", p1: "Intimidação / Liderança", p2: "Atletismo", bonus: "+1 Resistência Física" },
  { nome: "Investigador", p1: "Investigação", p2: "Percepção", bonus: "Vantagem em achar pistas" },
  { nome: "Menestrel / Bardo", p1: "Blefe / Dissimulação", p2: "Persuasão / Diplomacia", bonus: "+1d4 em rolagem de aliado" },
  { nome: "Marinheiro / Piloto", p1: "Pilotagem Flutuante", p2: "Sobrevivência", bonus: "+2 em testes em veículos" },
  { nome: "Bandido / Mercenário", p1: "Intimidação / Liderança", p2: "Furtividade", bonus: "+1d4 dano em emboscada" },
  { nome: "Erudito", p1: "Conhecimento Arcano", p2: "Investigação", bonus: "+2 em testes de conhecimento" },
  { nome: "Lenhador / Brutamontes", p1: "Atletismo", p2: "Sobrevivência", bonus: "+2 PV máximo" },
  { nome: "Escriba Rúnico", p1: "Decifração Rúnica", p2: "Conhecimento Arcano", bonus: "+1 em testes de Magia" },
  { nome: "Batedor Urbano", p1: "Percepção", p2: "Furtividade", bonus: "Vantagem em cidades/ruínas" }
];

const skills = [
  "Luta Desarmada", "Intimidação / Liderança", "Furtividade", "Acrobacia", "Sobrevivência",
  "Rastreamento", "Magia", "Conhecimento Arcano", "Alquimia", "Ofícios / Engenhosaria",
  "Herborismo / Medicina", "Intuição", "Persuasão", "Blefe / Dissimulação", "Percepção",
  "Investigação", "Pilotagem Flutuante", "Atletismo", "Decifração Rúnica"
];

const items = [
  // Custo 1
  { nome: "Adaga", custo: 1, peso: 0.5, descricao: "Pequena lâmina versátil para combate próximo ou lançamento" },
  { nome: "Machado Leve", custo: 1, peso: 1, descricao: "Arma prática para combate e tarefas de acampamento" },
  { nome: "Espada Curta", custo: 1, peso: 1, descricao: "Arma equilibrada, ideal para iniciantes" },
  { nome: "Arco Curto + 10 Flechas", custo: 1, peso: 1.5, descricao: "Arma à distância confiável para caçadores" },
  { nome: "Escudo de Madeira", custo: 1, peso: 2, descricao: "Oferece +2 de Defesa por 1 cena de combate" },
  { nome: "Armadura de Couro", custo: 1, peso: 2, descricao: "Proteção básica que oferece +1 de Resistência Física" },
  { nome: "Mochila + 3 dias de Ração", custo: 1, peso: 1, descricao: "Suprimentos essenciais para viagens curtas" },
  { nome: "Kit de Herbalismo", custo: 1, peso: 0.5, descricao: "5 usos para criar poções e remédios naturais" },
  { nome: "Kit de Alquimia Simples", custo: 1, peso: 1, descricao: "Ferramentas básicas para trabalhos alquímicos" },
  { nome: "Corda 15m + Gancho", custo: 1, peso: 1, descricao: "Equipamento essencial para escalada e resgate" },
  { nome: "5 Tochas + Isqueiro", custo: 1, peso: 0.5, descricao: "Iluminação confiável para exploração" },
  { nome: "Bandagens Medicinais", custo: 1, peso: 0.3, descricao: "Cura 1d4 PV, possui 3 usos" },
  { nome: "Poção de Cura", custo: 1, peso: 0.2, descricao: "Bebida que restaura 1d6 PV quando consumida" },
  // Custo 2
  { nome: "Espada Longa", custo: 2, peso: 2, descricao: "Arma poderosa e versátil para guerreiros experientes" },
  { nome: "Machado de Batalha", custo: 2, peso: 2.5, descricao: "Arma pesada que causa grande dano em combate" },
  { nome: "Arco Reforçado", custo: 2, peso: 1.5, descricao: "Versão melhorada que oferece +1 de dano" },
  { nome: "Cota de Malha Leve", custo: 2, peso: 3, descricao: "Proteção superior que oferece +2 de Resistência Física" },
  { nome: "Poção de Cura Maior", custo: 2, peso: 0.3, descricao: "Bebida potente que restaura 2d6 PV" },
  { nome: "Botas de Viagem", custo: 2, peso: 0.5, descricao: "Calçado mágico que aumenta seu Movimento em +1" },
  { nome: "Anel de Mana", custo: 2, peso: 0.1, descricao: "Artefato que aumenta sua Mana máxima em +2" },
  // Custo 3
  { nome: "Arma de Qualidade", custo: 3, peso: 1.5, descricao: "Arma refinada que oferece +1 para acertar ou +1 de dano" },
  { nome: "Armadura de Placas Leves", custo: 3, peso: 4, descricao: "Proteção excelente que oferece +3 de Resistência Física" },
  { nome: "Foco Arcano", custo: 3, peso: 0.5, descricao: "Artefato que oferece +1 em testes de Magia" }
];

// ==================== INICIALIZAÇÃO ====================

window.addEventListener('load', () => {
  initializeApp();
});

function initializeApp() {
  // Preencher dropdowns
  populateRaces();
  populateProfessions();
  populateSkills();
  populateItems();
  
  // Preencher grids nas páginas de info
  populateRacesGrid();
  populateProfessionsGrid();
  
  // Escutar autenticação
  firebase.auth().onAuthStateChanged(user => {
    currentUser = user;
    updateUserPanel();
    
    if (user) {
      loadCharacters();
      updateExclusiveContent();
    }
  });
}

// ==================== AUTENTICAÇÃO ====================

function updateUserPanel() {
  const panel = document.getElementById('user-panel');
  
  if (currentUser) {
    panel.innerHTML = `
      <div class="flex items-center gap-4">
        <span class="text-emerald-400 text-sm">👤 ${currentUser.email}</span>
        <button onclick="goToMyCharacters()" class="text-emerald-400 hover:text-emerald-300 transition text-sm">📋 Meus Personagens</button>
        ${isMaster ? `<button onclick="goToMasterPanel()" class="text-amber-400 hover:text-amber-300 transition text-sm">👑 Painel Mestre</button>` : ''}
        <button onclick="logout()" class="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-lg transition text-sm">🚪 Sair</button>
      </div>
    `;
  } else {
    panel.innerHTML = `
      <div class="flex gap-4">
        <button onclick="showLoginModal()" class="text-emerald-400 hover:text-emerald-300 transition text-sm">Entrar</button>
        <button onclick="showRegisterModal()" class="text-emerald-400 hover:text-emerald-300 transition text-sm">Registrar</button>
      </div>
    `;
  }
}

function showLoginModal() {
  const email = prompt("Digite seu email:");
  if (!email) return;
  
  const password = prompt("Digite sua senha:");
  if (!password) return;
  
  firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(e => alert("Erro ao entrar: " + e.message));
}

function showRegisterModal() {
  const email = prompt("Digite seu email:");
  if (!email) return;
  
  const password = prompt("Crie uma senha (mínimo 6 caracteres):");
  if (!password) return;
  
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch(e => alert("Erro ao registrar: " + e.message));
}

function logout() {
  firebase.auth().signOut().then(() => {
    window.location.href = 'login.html';
  });
}

// ==================== NAVEGAÇÃO ====================

function goHome() {
  showSection('home');
}

function goToCreator() {
  if (!currentUser) {
    alert("Você precisa estar logado para criar um personagem!");
    showLoginModal();
    return;
  }
  showSection('creator');
  setTimeout(initializeCreator, 100);
}

function goToMyCharacters() {
  if (!currentUser) {
    alert("Você precisa estar logado!");
    return;
  }
  showSection('my-characters');
}

function goToMasterPanel() {
  if (!isMaster) {
    alert("Apenas mestres podem acessar este painel!");
    return;
  }
  showSection('master-panel');
  loadAllCharacters();
  showMasterTab('characters');
}

function showSection(sectionId) {
  document.querySelectorAll('section').forEach(section => {
    section.classList.add('hidden');
  });
  document.getElementById(sectionId).classList.remove('hidden');
  window.scrollTo(0, 0);
}

// ==================== POPULAÇÃO DE DADOS ====================

function populateRaces() {
  const select = document.getElementById('char-race');
  races.forEach(race => {
    const option = document.createElement('option');
    option.value = race.nome;
    option.textContent = race.nome;
    select.appendChild(option);
  });
}

function populateProfessions() {
  const select = document.getElementById('char-prof');
  professions.forEach(prof => {
    const option = document.createElement('option');
    option.value = prof.nome;
    option.textContent = prof.nome;
    select.appendChild(option);
  });
}

function populateSkills() {
  const select = document.getElementById('specialist-skill');
  skills.forEach(skill => {
    const option = document.createElement('option');
    option.value = skill;
    option.textContent = skill;
    select.appendChild(option);
  });
}

function populateItems() {
  const grid = document.getElementById('items-grid');
  if (!grid) return;
  
  grid.innerHTML = '';
  
  const categories = {
    '1 Ponto': items.filter(i => i.custo === 1),
    '2 Pontos': items.filter(i => i.custo === 2),
    '3 Pontos': items.filter(i => i.custo === 3)
  };
  
  Object.entries(categories).forEach(([category, categoryItems]) => {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'bg-zinc-800 rounded-lg overflow-hidden';
    
    const header = document.createElement('div');
    header.className = 'p-4 bg-zinc-700 cursor-pointer hover:bg-zinc-600 transition flex justify-between items-center';
    header.innerHTML = `
      <span class="font-bold text-emerald-400">${category}</span>
      <span class="text-xs text-zinc-400">${categoryItems.length} itens</span>
    `;
    
    const itemsContainer = document.createElement('div');
    itemsContainer.className = 'hidden space-y-2 p-4';
    itemsContainer.id = `category-${category}`;
    
    categoryItems.forEach(item => {
      const itemDiv = document.createElement('label');
      itemDiv.className = 'flex items-center gap-3 p-3 bg-zinc-700 rounded hover:bg-zinc-600 cursor-pointer transition';
      itemDiv.innerHTML = `
        <input type="checkbox" class="item-checkbox" data-cost="${item.custo}" data-weight="${item.peso}" data-name="${item.nome}" onchange="updateItemsRemaining()">
        <div class="flex-1">
          <p class="font-bold text-emerald-300 text-sm">${item.nome}</p>
          <p class="text-xs text-zinc-400">${item.descricao}</p>
        </div>
        <span class="text-emerald-400 font-bold text-sm">${item.custo}pt</span>
      `;
      itemsContainer.appendChild(itemDiv);
    });
    
    header.addEventListener('click', () => {
      itemsContainer.classList.toggle('hidden');
      header.classList.toggle('bg-emerald-700');
    });
    
    categoryDiv.appendChild(header);
    categoryDiv.appendChild(itemsContainer);
    grid.appendChild(categoryDiv);
  });
}

function populateRacesGrid() {
  const grid = document.getElementById('races-grid');
  if (!grid) return;
  
  grid.innerHTML = '';
  races.forEach(race => {
    const div = document.createElement('div');
    div.className = 'bg-zinc-800 rounded-lg p-6 hover:bg-zinc-700 transition';
    div.innerHTML = `
      <h4 class="text-xl font-bold text-emerald-400 mb-3">${race.nome}</h4>
      <p class="text-sm text-zinc-300 mb-2"><strong>Bônus:</strong> ${race.bonus}</p>
      <p class="text-sm text-zinc-300 mb-2"><strong>Habilidade:</strong> ${race.habilidade}</p>
      <p class="text-sm text-emerald-400"><strong>Perícia:</strong> ${race.hab}</p>
    `;
    grid.appendChild(div);
  });
}

function populateProfessionsGrid() {
  const grid = document.getElementById('professions-grid');
  if (!grid) return;
  
  grid.innerHTML = '';
  professions.forEach(prof => {
    const div = document.createElement('div');
    div.className = 'bg-zinc-800 rounded-lg p-6 hover:bg-zinc-700 transition';
    div.innerHTML = `
      <h4 class="text-xl font-bold text-emerald-400 mb-3">${prof.nome}</h4>
      <p class="text-sm text-zinc-300 mb-2"><strong>Perícias:</strong> ${prof.p1} e ${prof.p2}</p>
      <p class="text-sm text-emerald-400"><strong>Bônus:</strong> ${prof.bonus}</p>
    `;
    grid.appendChild(div);
  });
}

// ==================== CRIADOR DE PERSONAGEM ====================

function initializeCreator() {
  const grid = document.getElementById('attributes-grid');
  if (!grid) return;
  
  grid.innerHTML = '';
  
  ['FOR', 'AGI', 'INT', 'MAG', 'ESP'].forEach(attr => {
    const div = document.createElement('div');
    div.className = 'text-center';
    div.innerHTML = `
      <label class="block text-xs mb-2 text-emerald-400 font-bold">${attr}</label>
      <input type="number" id="${attr}" value="0" min="-2" max="4" 
             oninput="updatePreview(); updatePointsRemaining()" 
             class="w-full bg-zinc-900 border border-emerald-700 text-center text-2xl rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500">
    `;
    grid.appendChild(div);
  });

  // Inicializar perícias livres
  const skillsGrid = document.getElementById('free-skills-grid');
  if (skillsGrid) {
    skillsGrid.innerHTML = '';
    skills.forEach(skill => {
      const label = document.createElement('label');
      label.className = 'flex items-center gap-2 p-3 bg-zinc-800 rounded-lg hover:bg-zinc-700 cursor-pointer';
      label.innerHTML = `
        <input type="checkbox" class="free-skill-checkbox" value="${skill}" onchange="updatePreview()">
        <span>${skill}</span>
      `;
      skillsGrid.appendChild(label);
    });
  }
}

function updatePointsRemaining() {
  const FOR = parseInt(document.getElementById('FOR').value) || 0;
  const AGI = parseInt(document.getElementById('AGI').value) || 0;
  const INT = parseInt(document.getElementById('INT').value) || 0;
  const MAG = parseInt(document.getElementById('MAG').value) || 0;
  const ESP = parseInt(document.getElementById('ESP').value) || 0;
  
  const total = FOR + AGI + INT + MAG + ESP;
  const remaining = 6 - total;
  
  document.getElementById('points-remaining').innerHTML = `Pontos restantes: <strong>${remaining}</strong>`;
  
  if (remaining < 0) {
    document.getElementById('points-remaining').classList.add('text-red-400');
    document.getElementById('points-remaining').classList.remove('text-emerald-400');
  } else {
    document.getElementById('points-remaining').classList.remove('text-red-400');
    document.getElementById('points-remaining').classList.add('text-emerald-400');
  }
}

function updateItemsRemaining() {
  const checkboxes = document.querySelectorAll('.item-checkbox:checked');
  let totalCost = 0;
  let totalWeight = 0;
  
  checkboxes.forEach(cb => {
    totalCost += parseInt(cb.dataset.cost);
    totalWeight += parseFloat(cb.dataset.weight) || 0;
  });
  
  const remaining = 8 - totalCost;
  document.getElementById('items-remaining').innerHTML = `Pontos restantes: <strong>${remaining}</strong>`;
  
  if (remaining < 0) {
    document.getElementById('items-remaining').classList.add('text-red-400');
    document.getElementById('items-remaining').classList.remove('text-emerald-400');
  } else {
    document.getElementById('items-remaining').classList.remove('text-red-400');
    document.getElementById('items-remaining').classList.add('text-emerald-400');
  }
}

function updatePreview() {
  if (!document.getElementById('preview-content')) return;
  
  const name = document.getElementById('char-name').value || "Sem Nome";
  const race = document.getElementById('char-race').value || "—";
  const prof = document.getElementById('char-prof').value || "—";
  
  const FOR = parseInt(document.getElementById('FOR').value) || 0;
  const AGI = parseInt(document.getElementById('AGI').value) || 0;
  const INT = parseInt(document.getElementById('INT').value) || 0;
  const MAG = parseInt(document.getElementById('MAG').value) || 0;
  const ESP = parseInt(document.getElementById('ESP').value) || 0;
  
  const pv = 8 + (FOR * 2);
  const mana = 4 + (MAG * 2);
  const sanidade = 8 + (ESP * 2);
  const defesa = 10 + AGI;
  const defesaMagica = 10 + MAG;
  const movimento = 3 + AGI;
  
  const freeSkills = Array.from(document.querySelectorAll('.free-skill-checkbox:checked')).map(cb => cb.value);
  const specialistSkill = document.getElementById('specialist-skill').value || "—";
  const selectedItems = Array.from(document.querySelectorAll('.item-checkbox:checked')).map(cb => cb.dataset.name);
  
  const preview = `
    <div class="space-y-4">
      <div class="border-b border-emerald-700 pb-4">
        <p class="text-2xl font-bold text-emerald-300">${name}</p>
        <p class="text-sm text-zinc-400">${race} • ${prof}</p>
      </div>
      
      <div class="space-y-2">
        <p class="text-sm"><strong class="text-emerald-400">PV:</strong> ${pv}</p>
        <p class="text-sm"><strong class="text-emerald-400">Mana:</strong> ${mana}</p>
        <p class="text-sm"><strong class="text-emerald-400">Sanidade:</strong> ${sanidade}</p>
        <p class="text-sm"><strong class="text-emerald-400">Defesa:</strong> ${defesa}</p>
        <p class="text-sm"><strong class="text-emerald-400">Defesa Mágica:</strong> ${defesaMagica}</p>
        <p class="text-sm"><strong class="text-emerald-400">Movimento:</strong> ${movimento}</p>
      </div>
      
      <div class="border-t border-emerald-700 pt-4">
        <p class="text-xs font-bold text-emerald-400 mb-2">ATRIBUTOS</p>
        <div class="grid grid-cols-2 gap-2 text-xs">
          <p>FOR: ${FOR}</p>
          <p>AGI: ${AGI}</p>
          <p>INT: ${INT}</p>
          <p>MAG: ${MAG}</p>
          <p>ESP: ${ESP}</p>
        </div>
      </div>
      
      ${freeSkills.length > 0 ? `
        <div class="border-t border-emerald-700 pt-4">
          <p class="text-xs font-bold text-emerald-400 mb-2">PERÍCIAS LIVRES</p>
          <div class="text-xs space-y-1">
            ${freeSkills.map(s => `<p>• ${s}</p>`).join('')}
          </div>
        </div>
      ` : ''}
      
      ${specialistSkill !== "—" ? `
        <div class="border-t border-emerald-700 pt-4">
          <p class="text-xs font-bold text-amber-400">ESPECIALISTA</p>
          <p class="text-xs">• ${specialistSkill}</p>
        </div>
      ` : ''}
      
      ${selectedItems.length > 0 ? `
        <div class="border-t border-emerald-700 pt-4">
          <p class="text-xs font-bold text-emerald-400 mb-2">ITENS</p>
          <div class="text-xs space-y-1">
            ${selectedItems.map(i => `<p>• ${i}</p>`).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `;
  
  document.getElementById('preview-content').innerHTML = preview;
}

async function saveCharacter() {
  if (!currentUser) {
    alert("Você precisa estar logado!");
    return;
  }
  
  const name = document.getElementById('char-name').value;
  if (!name) {
    alert("Digite o nome do personagem!");
    return;
  }
  
  const race = document.getElementById('char-race').value;
  if (!race) {
    alert("Escolha uma raça!");
    return;
  }
  
  const prof = document.getElementById('char-prof').value;
  if (!prof) {
    alert("Escolha uma profissão!");
    return;
  }
  
  const FOR = parseInt(document.getElementById('FOR').value) || 0;
  const AGI = parseInt(document.getElementById('AGI').value) || 0;
  const INT = parseInt(document.getElementById('INT').value) || 0;
  const MAG = parseInt(document.getElementById('MAG').value) || 0;
  const ESP = parseInt(document.getElementById('ESP').value) || 0;
  
  const total = FOR + AGI + INT + MAG + ESP;
  if (total !== 6) {
    alert("Você deve distribuir exatamente 6 pontos nos atributos!");
    return;
  }
  
  const freeSkills = Array.from(document.querySelectorAll('.free-skill-checkbox:checked')).map(cb => cb.value);
  if (freeSkills.length !== 2) {
    alert("Escolha exatamente 2 perícias livres!");
    return;
  }
  
  const specialistSkill = document.getElementById('specialist-skill').value;
  if (!specialistSkill) {
    alert("Escolha uma perícia para ser especialista!");
    return;
  }
  
  const selectedItems = Array.from(document.querySelectorAll('.item-checkbox:checked')).map(cb => ({
    nome: cb.dataset.name,
    custo: parseInt(cb.dataset.cost),
    peso: parseFloat(cb.dataset.weight) || 0
  }));
  
  const itemsTotal = selectedItems.reduce((sum, item) => sum + item.custo, 0);
  if (itemsTotal !== 8) {
    alert("Você deve gastar exatamente 8 pontos em itens!");
    return;
  }
  
  const character = {
    nome: name,
    raca: race,
    profissao: prof,
    idade: document.getElementById('char-age').value || "",
    aparencia: document.getElementById('char-appearance').value || "",
    historia: document.getElementById('char-story').value || "",
    atributos: {
      FOR, AGI, INT, MAG, ESP
    },
    pv: 8 + (FOR * 2),
    mana: 4 + (MAG * 2),
    sanidade: 8 + (ESP * 2),
    defesa: 10 + AGI,
    defesaMagica: 10 + MAG,
    movimento: 3 + AGI,
    periciasLivres: freeSkills,
    especialista: specialistSkill,
    itens: selectedItems,
    userId: currentUser.uid,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  };
  
  try {
    const docRef = await firebase.firestore().collection("characters").add(character);
    alert("✅ Personagem salvo com sucesso!");
    
    character.id = docRef.id;
    
    // Limpar formulário
    document.getElementById('char-name').value = '';
    document.getElementById('char-race').value = '';
    document.getElementById('char-prof').value = '';
    document.getElementById('char-age').value = '';
    document.getElementById('char-appearance').value = '';
    document.getElementById('char-story').value = '';
    document.getElementById('FOR').value = '0';
    document.getElementById('AGI').value = '0';
    document.getElementById('INT').value = '0';
    document.getElementById('MAG').value = '0';
    document.getElementById('ESP').value = '0';
    document.querySelectorAll('.free-skill-checkbox').forEach(cb => cb.checked = false);
    document.querySelectorAll('.item-checkbox').forEach(cb => cb.checked = false);
    document.getElementById('specialist-skill').value = '';
    
    updatePreview();
    updatePointsRemaining();
    updateItemsRemaining();
    
    // Mostrar a ficha do personagem
    displayCharacterSheet(character);
  } catch (e) {
    alert("Erro ao salvar: " + e.message);
  }
}

// ==================== FICHA DE PERSONAGEM (ESTILO C.R.I.S) ====================

function displayCharacterSheet(character) {
  showSection('character-sheet');
  
  // Informações básicas
  document.getElementById('sheet-name').textContent = character.nome || '—';
  document.getElementById('sheet-race').textContent = character.raca || '—';
  document.getElementById('sheet-prof').textContent = character.profissao || '—';
  document.getElementById('sheet-age').textContent = character.idade || '—';
  document.getElementById('sheet-appearance').textContent = character.aparencia || '—';
  
  // Atributos
  document.getElementById('sheet-for').textContent = character.atributos.FOR;
  document.getElementById('sheet-agi').textContent = character.atributos.AGI;
  document.getElementById('sheet-int').textContent = character.atributos.INT;
  document.getElementById('sheet-mag').textContent = character.atributos.MAG;
  document.getElementById('sheet-esp').textContent = character.atributos.ESP;
  
  // Derivados
  document.getElementById('sheet-pv').textContent = character.pv;
  document.getElementById('sheet-mana').textContent = character.mana;
  document.getElementById('sheet-sanity').textContent = character.sanidade;
  document.getElementById('sheet-def').textContent = character.defesa;
  
  // História
  document.getElementById('sheet-story').textContent = character.historia || '—';
  
  // Perícias
  const freeSkillsText = character.periciasLivres && character.periciasLivres.length > 0 
    ? character.periciasLivres.join(', ')
    : '—';
  document.getElementById('sheet-free-skills').textContent = freeSkillsText;
  document.getElementById('sheet-specialist').textContent = character.especialista || '—';
  
  // Inventário
  const inventoryDiv = document.getElementById('sheet-inventory');
  if (character.itens && character.itens.length > 0) {
    inventoryDiv.innerHTML = character.itens.map(item => 
      `<div class="p-2 bg-zinc-800 rounded"><p class="text-emerald-300">• ${item.nome}</p></div>`
    ).join('');
  } else {
    inventoryDiv.innerHTML = '<p class="text-zinc-400">—</p>';
  }
  
  // Peso
  const totalWeight = character.itens ? character.itens.reduce((sum, item) => sum + (item.peso || 0), 0) : 0;
  const maxWeight = 10 + (character.atributos.FOR * 2);
  document.getElementById('sheet-weight').textContent = `${totalWeight.toFixed(1)} / ${maxWeight}`;
}

function uploadCharacterPhoto(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      document.getElementById('char-photo').src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

function downloadCharacterSheet() {
  const name = document.getElementById('char-name').value || 'Personagem';
  const content = document.getElementById('preview-content').innerText;
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
  element.setAttribute('download', `${name}_Ficha.txt`);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

// ==================== CARREGAMENTO DE PERSONAGENS ====================

async function loadCharacters() {
  if (!currentUser) return;
  
  try {
    const snapshot = await firebase.firestore()
      .collection("characters")
      .where("userId", "==", currentUser.uid)
      .get();
    
    const characters = [];
    snapshot.forEach(doc => {
      characters.push({ id: doc.id, ...doc.data() });
    });
    
    return characters;
  } catch (e) {
    console.error("Erro ao carregar personagens:", e);
    return [];
  }
}

async function loadAllCharacters() {
  if (!isMaster) return;
  
  try {
    const snapshot = await firebase.firestore()
      .collection("characters")
      .get();
    
    const container = document.getElementById('all-characters-list');
    container.innerHTML = '';
    
    if (snapshot.empty) {
      container.innerHTML = '<p class="text-zinc-400 col-span-full">Nenhum personagem criado ainda.</p>';
      return;
    }
    
    snapshot.forEach(doc => {
      const char = doc.data();
      const card = document.createElement('div');
      card.className = 'bg-zinc-800 rounded-lg p-6 border border-emerald-700 hover:border-emerald-500 transition';
      card.innerHTML = `
        <h3 class="text-xl font-bold text-emerald-400 mb-2">${char.nome}</h3>
        <p class="text-sm text-zinc-400 mb-4">${char.raca} • ${char.profissao}</p>
        <div class="grid grid-cols-2 gap-2 text-sm mb-4">
          <p><strong class="text-emerald-300">PV:</strong> ${char.pv}</p>
          <p><strong class="text-emerald-300">Mana:</strong> ${char.mana}</p>
          <p><strong class="text-emerald-300">Defesa:</strong> ${char.defesa}</p>
          <p><strong class="text-emerald-300">Sanidade:</strong> ${char.sanidade}</p>
        </div>
        <button onclick="editCharacter('${doc.id}')" class="w-full bg-emerald-600 hover:bg-emerald-500 text-black font-bold py-2 rounded transition">
          ✏️ Editar
        </button>
      `;
      container.appendChild(card);
    });
  } catch (e) {
    console.error("Erro ao carregar todos os personagens:", e);
  }
}

function editCharacter(characterId) {
  alert("Funcionalidade de edição em desenvolvimento!");
}


// ==================== SISTEMA DE PAPÉIS E PERMISSÕES ====================

// Papéis pré-definidos
const defaultRoles = [
  { 
    id: 'leader', 
    nome: 'Líder da Guilda', 
    descricao: 'Líder supremo da guilda com acesso total',
    permissions: ['view_guild', 'manage_guild', 'view_powerups', 'manage_powerups', 'manage_members']
  },
  { 
    id: 'treasurer', 
    nome: 'Tesoureiro', 
    descricao: 'Gerencia recursos e tesouro da guilda',
    permissions: ['view_guild', 'view_powerups']
  },
  { 
    id: 'member', 
    nome: 'Membro', 
    descricao: 'Membro comum da guilda',
    permissions: ['view_guild']
  }
];

// Árvore de Power-ups padrão
const defaultPowerups = [
  {
    id: 'powerup-1',
    nome: 'Força Coletiva',
    descricao: '+1 em todos os atributos dos membros',
    nivel: 1,
    custo: 100,
    adquirido: false,
    requerimentos: []
  },
  {
    id: 'powerup-2',
    nome: 'Sabedoria Ancestral',
    descricao: '+2 em testes de conhecimento',
    nivel: 1,
    custo: 150,
    adquirido: false,
    requerimentos: []
  },
  {
    id: 'powerup-3',
    nome: 'Proteção da Guilda',
    descricao: '+1 de Resistência Física para todos',
    nivel: 2,
    custo: 250,
    adquirido: false,
    requerimentos: ['powerup-1']
  },
  {
    id: 'powerup-4',
    nome: 'Magia Unificada',
    descricao: '+2 de Mana para todos os membros',
    nivel: 2,
    custo: 300,
    adquirido: false,
    requerimentos: ['powerup-2']
  }
];

// Obter papéis do usuário
async function getUserRoles(userId) {
  try {
    const snapshot = await firebase.firestore()
      .collection("user_roles")
      .where("userId", "==", userId)
      .get();
    
    const roles = [];
    snapshot.forEach(doc => {
      roles.push(doc.data().roleId);
    });
    
    return roles;
  } catch (e) {
    console.error("Erro ao obter papéis:", e);
    return [];
  }
}

// Verificar se usuário tem permissão
async function hasPermission(userId, permission) {
  const userRoles = await getUserRoles(userId);
  
  for (let roleId of userRoles) {
    const role = defaultRoles.find(r => r.id === roleId);
    if (role && role.permissions.includes(permission)) {
      return true;
    }
  }
  
  return false;
}

// Atualizar visibilidade de conteúdo exclusivo
async function updateExclusiveContent() {
  if (!currentUser) return;
  
  const hasGuildAccess = await hasPermission(currentUser.uid, 'view_guild');
  const navExclusive = document.getElementById('nav-exclusive');
  const navGuild = document.getElementById('nav-guild');
  
  if (hasGuildAccess) {
    navGuild.classList.remove('hidden');
    loadGuildPanel();
  } else {
    navGuild.classList.add('hidden');
  }
}

// ==================== PAINEL DA GUILDA ====================

async function loadGuildPanel() {
  try {
    const guildSnapshot = await firebase.firestore()
      .collection("guild")
      .limit(1)
      .get();
    
    let guildData = null;
    if (!guildSnapshot.empty) {
      guildData = guildSnapshot.docs[0].data();
    }
    
    if (guildData) {
      document.getElementById('guild-name').textContent = guildData.nome || '—';
      document.getElementById('guild-leader').textContent = guildData.lider || '—';
      document.getElementById('guild-level').textContent = guildData.nivel || 1;
    }
    
    // Carregar membros
    const membersSnapshot = await firebase.firestore()
      .collection("characters")
      .get();
    
    const membersList = document.getElementById('guild-members-list');
    membersList.innerHTML = '';
    
    let memberCount = 0;
    membersSnapshot.forEach(doc => {
      const char = doc.data();
      memberCount++;
      
      const memberCard = document.createElement('div');
      memberCard.className = 'bg-zinc-800 rounded-lg p-4 border border-emerald-700';
      memberCard.innerHTML = `
        <p class="font-bold text-emerald-400">${char.nome}</p>
        <p class="text-xs text-zinc-400">${char.raca} • ${char.profissao}</p>
        <p class="text-xs text-emerald-300 mt-2">PV: ${char.pv} | Mana: ${char.mana}</p>
      `;
      membersList.appendChild(memberCard);
    });
    
    document.getElementById('guild-members-count').textContent = memberCount;
    
    // Carregar árvore de power-ups
    loadPowerupsTree();
    
  } catch (e) {
    console.error("Erro ao carregar painel da guilda:", e);
  }
}

async function loadPowerupsTree() {
  try {
    const powerupsSnapshot = await firebase.firestore()
      .collection("guild_powerups")
      .get();
    
    let powerups = [];
    if (powerupsSnapshot.empty) {
      // Se não houver power-ups, usar os padrões
      powerups = defaultPowerups;
    } else {
      powerupsSnapshot.forEach(doc => {
        powerups.push({ id: doc.id, ...doc.data() });
      });
    }
    
    const treeContainer = document.getElementById('guild-powerups-tree');
    treeContainer.innerHTML = '';
    
    // Agrupar por nível
    const levels = {};
    powerups.forEach(pu => {
      if (!levels[pu.nivel]) levels[pu.nivel] = [];
      levels[pu.nivel].push(pu);
    });
    
    Object.keys(levels).sort().forEach(nivel => {
      const levelDiv = document.createElement('div');
      levelDiv.className = 'p-4 bg-zinc-800 rounded-lg';
      
      let html = `<p class="font-bold text-amber-400 mb-3">Nível ${nivel}</p>`;
      html += '<div class="space-y-2">';
      
      levels[nivel].forEach(pu => {
        const statusClass = pu.adquirido ? 'text-emerald-400' : 'text-zinc-400';
        const statusText = pu.adquirido ? '✓ Adquirido' : '○ Não adquirido';
        
        html += `
          <div class="p-3 bg-zinc-700 rounded">
            <p class="font-bold text-emerald-300">${pu.nome}</p>
            <p class="text-xs text-zinc-400">${pu.descricao}</p>
            <p class="text-xs mt-2"><strong>Custo:</strong> ${pu.custo} pontos</p>
            <p class="text-xs ${statusClass}"><strong>Status:</strong> ${statusText}</p>
          </div>
        `;
      });
      
      html += '</div>';
      levelDiv.innerHTML = html;
      treeContainer.appendChild(levelDiv);
    });
    
  } catch (e) {
    console.error("Erro ao carregar árvore de power-ups:", e);
  }
}

// ==================== PAINEL DO MESTRE - GERENCIAMENTO ====================

function showMasterTab(tabName) {
  // Ocultar todas as abas
  document.querySelectorAll('[id^="master-tab-"]').forEach(tab => {
    tab.classList.add('hidden');
  });
  
  // Mostrar aba selecionada
  document.getElementById(`master-tab-${tabName}`).classList.remove('hidden');
  
  // Atualizar botões
  document.querySelectorAll('[onclick^="showMasterTab"]').forEach(btn => {
    btn.classList.remove('bg-emerald-700', 'text-black');
    btn.classList.add('bg-zinc-800', 'text-emerald-400');
  });
  
  event.target.classList.remove('bg-zinc-800', 'text-emerald-400');
  event.target.classList.add('bg-emerald-700', 'text-black');
  
  // Carregar dados da aba
  if (tabName === 'roles') {
    loadRolesManagement();
  } else if (tabName === 'guild') {
    loadGuildManagement();
  }
}

async function loadRolesManagement() {
  // Carregar papéis existentes
  const rolesList = document.getElementById('roles-list');
  rolesList.innerHTML = '';
  
  defaultRoles.forEach(role => {
    const roleCard = document.createElement('div');
    roleCard.className = 'bg-zinc-800 rounded-lg p-4 border border-emerald-700';
    roleCard.innerHTML = `
      <p class="font-bold text-emerald-400">${role.nome}</p>
      <p class="text-xs text-zinc-400">${role.descricao}</p>
      <p class="text-xs text-emerald-300 mt-2">Permissões: ${role.permissions.length}</p>
      <button onclick="deleteRole('${role.id}')" class="mt-3 w-full bg-red-600 hover:bg-red-500 text-white font-bold py-1 rounded text-xs">Deletar</button>
    `;
    rolesList.appendChild(roleCard);
  });
  
  // Carregar atribuição de papéis
  const assignContainer = document.getElementById('assign-roles-container');
  assignContainer.innerHTML = '';
  
  try {
    const charactersSnapshot = await firebase.firestore()
      .collection("characters")
      .get();
    
    charactersSnapshot.forEach(doc => {
      const char = doc.data();
      const assignDiv = document.createElement('div');
      assignDiv.className = 'p-4 bg-zinc-800 rounded-lg border border-emerald-700';
      
      let html = `
        <div class="flex justify-between items-center mb-3">
          <p class="font-bold text-emerald-400">${char.nome}</p>
          <p class="text-xs text-zinc-400">${char.raca}</p>
        </div>
        <select onchange="assignRoleToPlayer('${char.userId}', this.value)" class="w-full bg-zinc-900 border border-emerald-700 rounded px-3 py-2 text-emerald-300 text-sm">
          <option value="">Selecione um papel...</option>
      `;
      
      defaultRoles.forEach(role => {
        html += `<option value="${role.id}">${role.nome}</option>`;
      });
      
      html += '</select>';
      assignDiv.innerHTML = html;
      assignContainer.appendChild(assignDiv);
    });
  } catch (e) {
    console.error("Erro ao carregar jogadores:", e);
  }
}

async function createRole() {
  const name = document.getElementById('new-role-name').value;
  const description = document.getElementById('new-role-description').value;
  
  if (!name) {
    alert("Digite o nome do papel!");
    return;
  }
  
  try {
    await firebase.firestore().collection("roles").add({
      nome: name,
      descricao: description,
      permissions: [],
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    
    alert("✅ Papel criado com sucesso!");
    document.getElementById('new-role-name').value = '';
    document.getElementById('new-role-description').value = '';
    loadRolesManagement();
  } catch (e) {
    alert("Erro ao criar papel: " + e.message);
  }
}

async function assignRoleToPlayer(userId, roleId) {
  if (!roleId) return;
  
  try {
    // Remover papéis antigos
    const oldRoles = await firebase.firestore()
      .collection("user_roles")
      .where("userId", "==", userId)
      .get();
    
    oldRoles.forEach(doc => doc.ref.delete());
    
    // Atribuir novo papel
    await firebase.firestore().collection("user_roles").add({
      userId: userId,
      roleId: roleId,
      assignedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    
    alert("✅ Papel atribuído com sucesso!");
    updateExclusiveContent();
  } catch (e) {
    alert("Erro ao atribuir papel: " + e.message);
  }
}

function deleteRole(roleId) {
  if (confirm("Tem certeza que deseja deletar este papel?")) {
    firebase.firestore().collection("roles").doc(roleId).delete()
      .then(() => {
        alert("✅ Papel deletado!");
        loadRolesManagement();
      })
      .catch(e => alert("Erro: " + e.message));
  }
}

// ==================== GERENCIAMENTO DA GUILDA ====================

async function loadGuildManagement() {
  try {
    const guildSnapshot = await firebase.firestore()
      .collection("guild")
      .limit(1)
      .get();
    
    let guildData = null;
    if (!guildSnapshot.empty) {
      guildData = guildSnapshot.docs[0].data();
      document.getElementById('guild-name-input').value = guildData.nome || '';
    }
    
    // Preencher select de líderes
    const leaderSelect = document.getElementById('guild-leader-select');
    leaderSelect.innerHTML = '<option value="">Selecione um líder...</option>';
    
    const charactersSnapshot = await firebase.firestore()
      .collection("characters")
      .get();
    
    charactersSnapshot.forEach(doc => {
      const char = doc.data();
      const option = document.createElement('option');
      option.value = char.nome;
      option.textContent = char.nome;
      leaderSelect.appendChild(option);
    });
    
    if (guildData && guildData.lider) {
      leaderSelect.value = guildData.lider;
    }
    
    // Carregar power-ups para gerenciamento
    loadPowerupsManagement();
    
  } catch (e) {
    console.error("Erro ao carregar gerenciamento da guilda:", e);
  }
}

async function saveGuildInfo() {
  const nome = document.getElementById('guild-name-input').value;
  const lider = document.getElementById('guild-leader-select').value;
  
  if (!nome || !lider) {
    alert("Preencha todos os campos!");
    return;
  }
  
  try {
    const guildSnapshot = await firebase.firestore()
      .collection("guild")
      .limit(1)
      .get();
    
    const guildData = {
      nome: nome,
      lider: lider,
      nivel: 1,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    if (guildSnapshot.empty) {
      await firebase.firestore().collection("guild").add(guildData);
    } else {
      await guildSnapshot.docs[0].ref.update(guildData);
    }
    
    alert("✅ Informações da guilda salvas!");
    loadGuildPanel();
  } catch (e) {
    alert("Erro ao salvar: " + e.message);
  }
}

async function loadPowerupsManagement() {
  const container = document.getElementById('powerups-manager');
  container.innerHTML = '';
  
  defaultPowerups.forEach(pu => {
    const card = document.createElement('div');
    card.className = 'p-4 bg-zinc-800 rounded-lg border border-emerald-700';
    card.innerHTML = `
      <div class="flex justify-between items-start mb-2">
        <p class="font-bold text-emerald-400">${pu.nome}</p>
        <input type="checkbox" ${pu.adquirido ? 'checked' : ''} onchange="togglePowerup('${pu.id}', this.checked)" class="accent-emerald-500">
      </div>
      <p class="text-xs text-zinc-400 mb-2">${pu.descricao}</p>
      <p class="text-xs text-amber-400">Custo: ${pu.custo} pontos</p>
    `;
    container.appendChild(card);
  });
}

function togglePowerup(powerupId, acquired) {
  // Aqui você pode salvar o estado do power-up no Firebase
  console.log(`Power-up ${powerupId} - Adquirido: ${acquired}`);
}
