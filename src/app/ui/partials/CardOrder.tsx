"use client";
import { Checkout } from "./Checkout";
import { Radio } from "../components/Radio";
import { Checkbox } from "../components/Checkbox";
import { IntroSelectProdutc } from "../components/IntroSelectProdutc";
import { Banana, Cherry, Grape, IceCream2, Milk, Nut } from "lucide-react";
import styles from "../styles/cardOrder.module.css";
import Image from "next/image";
import Actions from "./Actions";
import useDataContext from "../../data/hooks/UseContextData";
import Loading from "./Loading";

export function CardOrder() {
  const {
    valueSelectInfo,
    activeTab,
    setDataSelectInfo,
    pedidosData,
    setValueSelectInfo,
    dataSelectInfo,
  } = useDataContext();

  //Array de icones lucide
  const iconesFruit = {
    Banana: <Banana />,
    Cherry: <Cherry />,
    Grape: <Grape />,
  };
  const iconesDoces = {
    Bean: <Nut />,
    IceCream2: <IceCream2 />,
    Milk: <Milk />,
  };
  const iconesArray = [
    ...Object.values(iconesFruit),
    ...Object.values(iconesDoces),
  ];

  function handleValuesInput(
    event: React.ChangeEvent<HTMLInputElement>,
    textInfo: string
  ) {
    const { type, checked, value } = event.target;
    const numericValue = parseFloat(value);

    // Verifica se é um radio ou checkbox
    if (type === "radio") {
      // Se for radio, substitui o valor no array
      setValueSelectInfo([numericValue]);
      setDataSelectInfo([textInfo]);
    } else if (type === "checkbox") {
      // Se for checkbox, verifica se está marcado ou desmarcado
      if (checked) {
        // Adiciona valor ao array se estiver marcado
        setValueSelectInfo([...valueSelectInfo, numericValue]);
        setDataSelectInfo([...dataSelectInfo, textInfo]);
      } else {
        // Remove valor do array se estiver desmarcado
        setValueSelectInfo(
          valueSelectInfo.filter((val) => val !== numericValue)
        );
        setDataSelectInfo(dataSelectInfo.filter((data) => data !== textInfo));
      }
    }
  }

  return (
    <div className="containerMain">
      <div className={styles.card}>
        {activeTab !== "checkout" ? (
          <div className={styles.container}>
            <div className={styles.content}>
              <span className={styles.wrapperImg}>
                <Image
                  src="/assets/produto.png"
                  width={412}
                  height={352}
                  alt="Produto"
                />
              </span>
              <article>
                <div className={styles.introView}>
                  <h2>Açaí Natural</h2>
                  <div className={styles.avaliation}>
                    <Image
                      src="/assets/estrela.png"
                      width={17}
                      height={15}
                      alt="estrela"
                    />
                    <span className={styles.avaliationInfo}>
                      <p className={styles.avaliationValue}>4.5</p>
                      <p className={styles.avaliationCount}>(30+)</p>
                      <a href="">Ver Avaliações</a>
                    </span>
                  </div>
                </div>
                <p className={styles.description}>
                  Super Copo de 500 ml de Açaí Tradicional - Atenção: Contém
                  somente açaí puro! Ideal para quem gosta de aproveitar um açaí
                  puro ou rechear do seu jeito! Obs: não trocamos nem
                  adicionamos itens a esse copo!
                </p>
                <>
                  {pedidosData ? (
                    <div>
                      {pedidosData?.sizes && activeTab === "sizes" && (
                        <>
                          <IntroSelectProdutc
                            labelText="Selecione o tamanho"
                            descriptionOption="Escolha pelo menos um tamanho."
                            stepOption="1/3"
                          />
                          <form className={styles.selectionsForm}>
                            {pedidosData.sizes.options.map((size, index) => (
                              <Radio
                                key={index}
                                index={index}
                                htmlFor={size}
                                contentText={size}
                                price={pedidosData.sizes.prices[index]}
                                name="size"
                                idValue={size}
                                value={pedidosData.sizes.prices[index]}
                                onChange={(event) =>
                                  handleValuesInput(event, size)
                                }
                              />
                            ))}
                          </form>
                        </>
                      )}
                      {pedidosData?.fruits && activeTab === "fruits" && (
                        <>
                          <IntroSelectProdutc
                            labelText="Escolha suas frutas"
                            descriptionOption="Selecione até três opções."
                            stepOption="2/3"
                          />
                          <form className={styles.selectionsForm}>
                            {pedidosData.fruits.options.map((fruit, index) => (
                              <Checkbox
                                key={index}
                                index={index}
                                htmlFor={fruit}
                                contentText={fruit}
                                price={pedidosData.fruits.prices[index]}
                                name={`fruit_${index}`}
                                idValue={fruit}
                                value={pedidosData.fruits.prices[index]}
                                icon={iconesArray[index]}
                                onChange={(event) =>
                                  handleValuesInput(event, fruit)
                                }
                              />
                            ))}
                          </form>
                        </>
                      )}
                      {pedidosData?.complements &&
                        activeTab === "complements" && (
                          <>
                            <IntroSelectProdutc
                              labelText="Escolha os complementos."
                              descriptionOption="Escolha até três opções."
                              stepOption="3/3"
                            />
                            <form className={styles.selectionsForm}>
                              {pedidosData.complements.options.map(
                                (complement, index) => (
                                  <Checkbox
                                    key={index}
                                    index={index}
                                    htmlFor={complement}
                                    contentText={complement}
                                    price={
                                      pedidosData.complements.prices[index]
                                    }
                                    name={`complement_${index}`}
                                    idValue={complement}
                                    value={
                                      pedidosData.complements.prices[index]
                                    }
                                    icon={
                                      iconesArray[
                                        index +
                                          Object.values(iconesFruit).length
                                      ]
                                    }
                                    onChange={(event) =>
                                      handleValuesInput(event, complement)
                                    }
                                  />
                                )
                              )}
                            </form>
                          </>
                        )}
                    </div>
                  ) : (
                    <Loading />
                  )}
                </>
              </article>
            </div>
            <Actions />
          </div>
        ) : (
          <Checkout />
        )}
      </div>
    </div>
  );
}
