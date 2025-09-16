// Koşul listesi
let notTogetherPairs = [];
let mustTogetherPairs = [];

// Karanlık mod (Tailwind dark mode için önerilen yöntem)
// <html> etiketine dark class'ı eklenmeli
const darkBtn = document.getElementById('toggleDark');
darkBtn.addEventListener('click', function() {
  document.documentElement.classList.toggle('dark');
  localStorage.setItem('darkMode', document.documentElement.classList.contains('dark'));
});
// Sayfa açılışında dark mode'u uygula
if (localStorage.getItem('darkMode') === 'true') {
  document.documentElement.classList.add('dark');
}

// Takımda olması gerekenler ekleme
if (document.getElementById('addMustTogether')) {
  document.getElementById('addMustTogether').addEventListener('click', function() {
    const p1 = document.getElementById('mustTogether1').value.trim();
    const p2 = document.getElementById('mustTogether2').value.trim();
    if (p1 && p2 && p1 !== p2) {
      mustTogetherPairs.push([p1, p2]);
      updateMustTogetherList();
      document.getElementById('mustTogether1').value = '';
      document.getElementById('mustTogether2').value = '';
    }
  });
}

// Takımda olmaması gerekenler ekleme
if (document.getElementById('addNotTogether')) {
  document.getElementById('addNotTogether').addEventListener('click', function() {
    const p1 = document.getElementById('notTogether1').value.trim();
    const p2 = document.getElementById('notTogether2').value.trim();
    if (p1 && p2 && p1 !== p2) {
      notTogetherPairs.push([p1, p2]);
      updateNotTogetherList();
      document.getElementById('notTogether1').value = '';
      document.getElementById('notTogether2').value = '';
    }
  });
}

function updateMustTogetherList() {
  const list = document.getElementById('mustTogetherList');
  list.innerHTML = mustTogetherPairs.map((pair, i) =>
    `<div class='flex items-center gap-2'><span class='text-blue-600 font-semibold'>${pair[0]} & ${pair[1]}</span> <button onclick='removeMustPair(${i})' class='text-xs text-gray-500 hover:text-blue-700'>Kaldır</button></div>`
  ).join('');
}

function updateNotTogetherList() {
  const list = document.getElementById('notTogetherList');
  list.innerHTML = notTogetherPairs.map((pair, i) =>
    `<div class='flex items-center gap-2'><span class='text-red-600 font-semibold'>${pair[0]} & ${pair[1]}</span> <button onclick='removeNotPair(${i})' class='text-xs text-gray-500 hover:text-red-700'>Kaldır</button></div>`
  ).join('');
}

window.removeMustPair = function(idx) {
  mustTogetherPairs.splice(idx, 1);
  updateMustTogetherList();
}

window.removeNotPair = function(idx) {
  notTogetherPairs.splice(idx, 1);
  updateNotTogetherList();
}

// Takım isimleri inputlarını güncelle (artık sadece 2 takım)
function updateTeamNamesInputs() {
  const container = document.getElementById('teamNamesInputs');
  container.innerHTML = '';
  for (let i = 0; i < 2; i++) {
    container.innerHTML += `<input type="text" class="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400 text-sm sm:text-base" placeholder="Takım ${i+1} İsmi (isteğe bağlı)" id="teamNameInput${i}">`;
  }
}
updateTeamNamesInputs();

// Takım karıştırıcı ana script

document.getElementById('teamForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const names = document.getElementById('playerNames').value.split('\n').map(x => x.trim()).filter(x => x);
  const teamCount = 2;
  const minPlayers = parseInt(document.getElementById('minPlayers').value);
  // Takım isimleri
  let teamNames = [];
  for (let i = 0; i < teamCount; i++) {
    const val = document.getElementById('teamNameInput'+i)?.value.trim();
    teamNames.push(val ? val : `Takım ${i+1}`);
  }
  if (names.length < teamCount * minPlayers) {
    document.getElementById('result').innerHTML = `<div class='text-red-600 font-semibold'>Yeterli oyuncu yok!</div>`;
    return;
  }
  // Karıştırma animasyonu başlat
  document.getElementById('result').innerHTML = `
    <div class="flex flex-col items-center justify-center">
      <div class="w-16 h-16 border-4 border-green-400 border-dashed rounded-full animate-spin mb-4"></div>
      <div class="text-green-700 font-semibold text-lg animate-pulse">Takımlar karıştırılıyor...</div>
    </div>
  `;
  await new Promise(r => setTimeout(r, 1200));
  // Karıştır ve koşulları uygula
  let attempts = 0, maxAttempts = 1000, teams, valid = false;
  do {
    const shuffled = names.slice().sort(() => Math.random() - 0.5);
    teams = Array.from({length: teamCount}, () => []);
    let idx = 0;
    for (const name of shuffled) {
      teams[idx % teamCount].push(name);
      idx++;
    }
    attempts++;
    // Koşulları kontrol et
    valid = notTogetherPairs.every(pair => {
      return !teams.some(team => team.includes(pair[0]) && team.includes(pair[1]));
    }) && mustTogetherPairs.every(pair => {
      return teams.some(team => team.includes(pair[0]) && team.includes(pair[1]));
    });
  } while (!valid && attempts < maxAttempts);
  if (!valid) {
    document.getElementById('result').innerHTML = `<div class='text-red-600 font-semibold'>Koşullara uygun takım bulunamadı!</div>`;
    return;
  }
  // Sonuçları animasyonlu göster
  let html = '<div class="grid grid-cols-1 md:grid-cols-2 gap-6">';
  teams.forEach((team, i) => {
    html += `<div class="bg-green-100 dark:bg-gray-800 rounded-lg shadow p-4 team-card opacity-0 translate-y-6 transition-all duration-700" style="transition-delay:${i*200}ms">
      <h2 class="text-xl font-bold text-green-700 dark:text-green-300 mb-2">${teamNames[i]}</h2>
      <ul class="list-disc list-inside space-y-1">`;
    team.forEach(player => {
      html += `<li>${player}</li>`;
    });
    html += '</ul></div>';
  });
  html += '</div>';
  document.getElementById('result').innerHTML = html;
  setTimeout(() => {
    document.querySelectorAll('.team-card').forEach((el, idx) => {
      setTimeout(() => {
        el.classList.remove('opacity-0','translate-y-6');
        el.classList.add('opacity-100','translate-y-0');
      }, idx*200);
    });
  }, 100);
});
