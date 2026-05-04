export default function Header({ title }) {

  const status = import.meta.env.VITE_APP_STATUS;
  
  return (
    <header>
      <h1>{title}</h1>
      <span className="env-badge">{status}</span>
    </header>
  );
}
