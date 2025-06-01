document.addEventListener('DOMContentLoaded', async () => {
  const navContainer = document.getElementById('navbar');
  if (navContainer) {
    try {
      const response = await fetch('/views/components/navbar.html');
      const html = await response.text();
      navContainer.innerHTML = html;
    } catch (error) {
      console.error('Error al cargar la navbar:', error);
    }
  }
});