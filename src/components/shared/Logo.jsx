import logoImage from "../../assets/logo.png";

export default function Logo({ className = "" }) {
  return (
    <img
      src={logoImage}
      alt="Faithly"
      className={className}
    />
  );
}