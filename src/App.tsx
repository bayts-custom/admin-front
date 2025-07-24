import './App.css';
import { Orders } from './Orders/Orders';
import SmartForm from './Orders/EditOrder';

function App() {
    return (
        <div className="App">
            <Orders></Orders>
            <SmartForm/>
        </div>
    );
}

export default App;
