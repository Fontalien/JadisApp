import './Header.css';

export default function Header() {
  return (
    <header className="header">  
        <nav className="nav-items">
          <a href="accueil">Accueil</a> <a href="message">Message</a> <a href="contact">Contact</a>
        </nav>
    </header>
  );
}
