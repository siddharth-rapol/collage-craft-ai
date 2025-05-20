document.addEventListener('DOMContentLoaded', () => {
  const getStartedBtn = document.getElementById('getStartedBtn');
  const heroSection = document.getElementById('hero');
  const uploadSection = document.getElementById('uploadSection');
  const photoInput = document.getElementById('photoInput');
  const preview = document.getElementById('preview');
  const suggestBtn = document.getElementById('suggestBtn');
  const themeInput = document.getElementById('themeInput');
  const suggestionsDiv = document.getElementById('suggestions');

  getStartedBtn.addEventListener('click', () => {
    heroSection.classList.add('hidden');
    uploadSection.classList.remove('hidden');
    window.scrollTo(0,0);
  });

  photoInput.addEventListener('change', () => {
    preview.innerHTML = '';
    const files = photoInput.files;
    if(files.length === 0) return;

    for(let file of files) {
      if(!file.type.startsWith('image/')) continue;

      const reader = new FileReader();
      reader.onload = e => {
        const img = document.createElement('img');
        img.src = e.target.result;
        img.alt = 'Uploaded photo';
        preview.appendChild(img);
      };
      reader.readAsDataURL(file);
    }
  });

  suggestBtn.addEventListener('click', () => {
    const text = themeInput.value.trim();
    if(!text) {
      alert('Please enter a theme idea');
      return;
    }

    // Mock AI suggestions based on theme keywords
    let colors = [];
    let templates = [];

    if(/love|heart|romantic/i.test(text)) {
      colors = ['#ff6699', '#ffb3c6', '#fff0f5'];
      templates = ['templates/heart1.jpg', 'templates/heart2.jpg', 'templates/heart3.jpg'];
    } else if(/friend|fun|party/i.test(text)) {
      colors = ['#66ccff', '#99ddff', '#ccf0ff'];
      templates = ['templates/fun1.jpg', 'templates/fun2.jpg', 'templates/fun3.jpg'];
    } else if(/travel|vacation/i.test(text)) {
      colors = ['#66cc99', '#99d9cc', '#ccf0e6'];
      templates = ['templates/travel1.jpg', 'templates/travel2.jpg', 'templates/travel3.jpg'];
    } else {
      colors = ['#cccccc', '#eeeeee', '#ffffff'];
      templates = ['templates/default1.jpg', 'templates/default2.jpg'];
    }

    suggestionsDiv.innerHTML = `
      <h3>Suggested Colors:</h3>
      <div class="colors">
        ${colors.map(c => `<div style="background-color:${c}"></div>`).join('')}
      </div>
      <h3>Suggested Templates:</h3>
      <div class="templates">
        ${templates.map(t => `<img src="${t}" alt="${t}">`).join('')}
      </div>
    `;
  });
});
