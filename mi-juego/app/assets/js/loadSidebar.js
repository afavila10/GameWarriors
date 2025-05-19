document.addEventListener('DOMContentLoaded', async () => {
  const sidebarContainer = document.getElementById('sidebar');
  if (sidebarContainer) {
    try {
      const response = await fetch('/mi-juego/app/public/views/components/sidebar.html');
      const html = await response.text();
      sidebarContainer.innerHTML = html;
    } catch (error) {
      console.error('Error al cargar la sidebar:', error);
    }
  }
});
