document.addEventListener('DOMContentLoaded', async () => {
  const profileContainer = document.getElementById('perfil');
  if (profileContainer) {
    try {
      const response = await fetch('/mi-juego/app/public/views/components/perfil.html');
      const html = await response.text();
      profileContainer.innerHTML = html;
    } catch (error) {
      console.error('Error al cargar el perfil:', error);
    }
  }
});