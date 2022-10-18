import { Link } from 'react-router-dom';
import Icon from '../../assets/icon.png';

export default function LogoComponent() {
  return (
    <Link to="/" className="link">
        <div className="logo">
            <img src={Icon} height="50px" alt="Logo" />
            <h1>Books Inventory</h1>
        </div>
    </Link>
  );
}
