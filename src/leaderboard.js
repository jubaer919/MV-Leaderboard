export default function hello() {
  const body = document.querySelector('body');
  const footer = document.createElement('h1');
  footer.innerHTML = '<div class="footer">footer</div>';
  body.appendChild(footer);
}