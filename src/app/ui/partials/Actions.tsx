import useDataContext from "../../data/hooks/UseContextData";
import styles from '../styles/actions.module.css';

function Actions() {
  const {quantityValue, setQuantityValue, totalValue, valueSelectInfo, activeTab, setActiveTab } = useDataContext()

    //Funções para acrescentar mais de um pedido(item)
    function decreaseQuantity() {
      setQuantityValue(Math.max(1, quantityValue - 1));
    }
  
    function increaseQuantity() {
      setQuantityValue(quantityValue + 1);
    }


    const tabs = ["sizes", "fruits", "complements", "checkout"];
    function nextTab() {
      //Verifica se foram definidos os valores na tab.
      const isValidTab = (value: number[] | number | undefined) =>
        value !== undefined;
      //Define o valor atual do index dentro de activeTab
      //Lógica de próxima tab adicionado ao próximo item na lista.
      const currentIndex = tabs.indexOf(activeTab);
      const nextIndex = (currentIndex + 1) % tabs.length;
      const nextTab = tabs[nextIndex];
  
      //Switch opções para tab que quando é chamado verifica se a lógica permite que a próxima tab seja chamada.
      switch (activeTab) {
        case "sizes":
          checkAndSetNextTab(valueSelectInfo[0], nextTab);
          break;
        case "fruits":
          checkAndSetNextTab(valueSelectInfo[1], nextTab);
          break;
        case "complements":
          checkAndSetNextTab(valueSelectInfo[1], nextTab);
          break;
        case "checkout":
          checkAndSetNextTab(totalValue, nextTab);
          break;
        default:
          console.log("Tab inválida");
      }
  
      //Verifica e seta nova tab verificando se isValidTab existe e é true permitindo a set da próxima tab
      function checkAndSetNextTab(
        value: number[] | number | undefined,
        nextTab: string
      ) {
        if (isValidTab(value)) {
          setActiveTab(nextTab);
        } else {
          console.log("selecione um valor para avançar o pedido");
        }
      }
    }
  

  return (
    <div className={styles.actions}>
      <div className={styles.quantityControl}>
        <button onClick={decreaseQuantity}>-</button>
        <input
          type="number"
          id="quantity"
          name="quantity"
          min="1"
          value={quantityValue}
          onChange={(e) => setQuantityValue(parseInt(e.target.value, 10) || 1)}
        />
        <button onClick={increaseQuantity}>+</button>
      </div>
      <button onClick={nextTab} className={styles.btnNext}>
        Avançar
        {totalValue ? <p>R${totalValue}</p> : <p>R$0</p>}
      </button>
    </div>
  );
}

export default Actions;
