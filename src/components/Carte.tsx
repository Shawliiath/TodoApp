
function Carte({ titre = "Titre", texte = "Description" }) {
  return (
    <div style={{ 
      border: '1px solid #ddd', 
      borderRadius: '8px',
      padding: '16px',
      maxWidth: '200px'
    }}>
      <h3>{titre}</h3>
      <p>{texte}</p>
      <button onClick={() => alert('info')}>
        Cliquer
      </button>
    </div>
  );
}

export default Carte;