document.addEventListener('DOMContentLoaded', async () => {
  const profileContainer = document.getElementById('perfil');
  if (profileContainer) {
    try {
      const response = await fetch('/views/components/perfil.html');
      const html = await response.text();
      profileContainer.innerHTML = html;
    } catch (error) {
      console.error('Error al cargar el perfil:', error);
    }
  }
});