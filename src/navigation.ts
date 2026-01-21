export function setupNavigation() {
  // Mapeamento: ID do botão -> ID da seção
  const links = [
    { btnId: 'btn-inicio', secId: 'sec-inicio' },
    { btnId: 'btn-resumo', secId: 'sec-resumo' },
    { btnId: 'btn-formacao', secId: 'sec-formacao' },
    { btnId: 'btn-habilidades', secId: 'sec-habilidades' },
  ];

  links.forEach(link => {
    const btn = document.getElementById(link.btnId);
    
    btn?.addEventListener('click', () => {
      // 1. Remove classe 'active' de TODOS os botões e seções
      document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));
      document.querySelectorAll('.page-section').forEach(el => {
        el.classList.add('hidden');
        el.classList.remove('active');
      });

      // 2. Adiciona classe 'active' APENAS no alvo clicado
      btn.classList.add('active');
      const section = document.getElementById(link.secId);
      section?.classList.remove('hidden');
      section?.classList.add('active');
    });
  });
}