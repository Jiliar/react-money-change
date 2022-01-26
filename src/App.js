import './App.css';
import Dinero from 'dinero.js';
import RatesPromise from './rates';
import { useEffect, useState } from 'react';


Dinero.globalExchangeRatesApi = {
  currency: 'EUR',
  endpoint: RatesPromise
}

let CurrencySelector = ({rates, onChange}) =>{
 return <select onChange={onChange}>{rates.map((rate)=><option key={rate}>{rate}</option>)}</select>
}

function App() {

  let [rates, setRates] = useState([]);

  let [originCurrency, setOriginCurrency] = useState([]);
  let [targetCurrency, setTargetCurrency] = useState([]);
  let [finalAmount, setFinalAmount] = useState([]);
  let [originalAmount, SetOriginalAmount] = useState([]);

  useEffect((rates)=>{
    let ratesData;
    RatesPromise.then((value)=>{
      ratesData = value;
      let ratesArray = Object.keys(ratesData.rates);
      setRates(ratesArray)
    })
    //Init Components

  }, []);

  let convert = async () =>{
    let amount = Dinero(
      {amount: parseFloat(originalAmount) * 100,
       currency: originCurrency
      });

      let result = await amount.convert(targetCurrency);

      setFinalAmount(result.toFormat())
  }

  return (
    <div className="container">
      <div className="card">
        <h1>Conversión de monedas</h1>
        <div className='flex-container'>
          <div>
            <p>Origen: {originCurrency}</p>
              <CurrencySelector 
              onChange={(ev)=> setOriginCurrency(ev.target.value)}
              rates={rates}/>
          </div>
          <div>
            <p>Destino: {targetCurrency}</p>
            <CurrencySelector 
             onChange={(ev)=> setTargetCurrency(ev.target.value)}
            rates={rates}/>
          </div>
        </div>

        <input type="number" 
        className='form-control' 
        placeholder="Monto en centavos" 
        onChange={(ev)=>SetOriginalAmount(ev.target.value)}/>
        <p>El resultado es: {finalAmount}</p>

        <button onClick={ convert} className='app-button'></button>
      </div>
    </div>
  );
}

export default App;
