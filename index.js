const handleSearch = async (event) => {
  event.preventDefault();

  const message = document.querySelector('#message');
  message.innerHTML = 'buscando resultados...';

  const showsList = document.querySelector('#shows');
  showsList.innerHTML = '';

  const searchBox = document.querySelector('#query');
  const search = searchBox.value;

  const url = `https://api.tvmaze.com/search/shows?q=${search}`;

  const response = await fetch(url);
  const programs = await response.json();

  if (programs.length == 0) {
    message.innerHTML = 'Nenhum resultado encontrado.';
    return;
  }

  message.innerHTML = '';

  programs.forEach((program) => {
    const title = program?.show?.name || '';
    const image =
      program?.show?.image?.medium ||
      'https://canseideserpop.com/wp-content/uploads/2023/07/matue-e-o-1o-trapper-com-mais-de-20-musicas-acima-de-100-milhoes-de-streams-site-conteudo-postagem-cansei-de-ser-pop-trap-maquina-do-tempo-02-682x1024.jpg';

    console.log(title, image);
    showsList.insertAdjacentHTML(
      'beforeend',
      `
    <li>
      <img src="${image}" class="poster">
      <span class="show-name">${title}</span>
    </li>
    `
    );
  });

  message.innerHTML = '';
};

document.addEventListener('DOMContentLoaded', () => {
  document
    .querySelector('#search-form')
    .addEventListener('submit', handleSearch);
});
