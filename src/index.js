import { getDoc } from 'firebase/firestore';
import { listProducts, deleteProduct, getProducts } from './service/serviceProduct';
import {renderProducts} from './pages/product';
import { renderStockProducts } from './pages/home';

renderProducts();
renderStockProducts();
