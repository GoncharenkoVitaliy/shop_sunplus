import styles from './Main.module.css';
import MainMenu from './MainMenu/MainMenu';
import MainContent from './MainContent/MainContent';
import Decor from '../Decor/Decor';
import { useEffect, useState } from 'react';

export interface ISetDate {
   id: number,
   manufacturer: string,
   image: string,
   categories: string,
   prace: number,
   popular: boolean,
   title: string,
   description: {
      discOn?: string,
      discTwo?: string,
      discThree?: string,
      discFour?: string,
      discFive?: string,
      discSix?: string,
      discSeven?: string,
      discEight?: string
   }
}

const Main = () => {
   const [filter, setFilter] = useState(false);
   const [loading, setLoading] = useState(true);
   const [data, setData] = useState<ISetDate[]>([]);
   
   const getProducts = async() => {
      try{
         const response = await fetch('db.json');
         const res = await response.json();
         
         setData(res.products);
         setLoading(false);
         
      }
      catch(error) {
         setLoading(false);
         console.error('Ошибка при загрузке данных:', error);
         return null;
      }
   };
         
   useEffect(() => {
      getProducts();
   }, []);

   return (
      <main className={`${styles.main} container`}>
         <button
            className={styles.filter__button}
            onClick={() => setFilter(!filter)}
         >
            Фильтр
         </button>
         <div className={styles.wrapper__decor}>
            <Decor />
         </div>
         <div
            className={`
            ${styles.wrapper__menu} 
            ${filter
               ? styles.active__wrapper_menu
               : styles.wrapper__menu
            }`}
         >
            <p className={styles.burger_filter}></p>
            <MainMenu data={data}/>
         </div>
         <MainContent loading={loading} data={data}/>
      </main>
   )
}

export default Main
