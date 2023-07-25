import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import HomePage from './Pages/HomePage';
import CoinPage from './Pages/CoinPage';
import { makeStyles } from '@material-ui/core';
import Alert from './Components/Alert'

const useStyles=makeStyles(()=>({
  App: {
    backgroundColor:"#14161a",
    color:"white",
    minHeight:"100vh",
  },
}));


function App() {

  const classes=useStyles();

  return (
    <Router>
      <div className={classes.App}>
        <Header/>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/coins/:id' element={<CoinPage/>}/>
        </Routes>
      </div>
      <Alert/>
    </Router>
  );
}

export default App;