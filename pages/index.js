import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
// import '../styles/index.css'
import React, { useState,useEffect} from 'react'
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAwVKALvPB54x9_XDW7SfNfyYqPkHtaEbk",
  authDomain: "sham-888d6.firebaseapp.com",
  projectId: "sham-888d6",
  storageBucket: "sham-888d6.appspot.com",
  messagingSenderId: "526071859442",
  appId: "1:526071859442:web:ca89b93df90e434dc0a86b",
  measurementId: "G-GDSJMDWHMG"
};
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const db =firebase.firestore();

function Home() {
  const [itemName, setItemName]=useState('');
  const [payDutch, setPayDutch]=useState('');
  const [countPay, setCountPay]=useState(1);
  const [assetSum, setAssetSum]=useState(0);
  const [assetBox, setAssetBox]=useState([]);
  const [itemsToPay, setItemsToPay]=useState([]);
  const handleItemChange = e => setItemName(e.target.value);
  const handlePayChange = e => setPayDutch(e.target.value);
  const payMoney=itemsToPay.map(value=>{
    assetBox.unshift(Number(value.asset))
  })
  const handleClick = async(e) =>{
    e.preventDefault(); // デフォルトのうざい挙動を防ぐ
    if (!itemName || !payDutch)
    {
      alert('入力してください')
    return
    }else if(!Number(payDutch))
    {
      alert('支払額は半角数字を入力してください')
    return
    }
    setCountPay(countPay+1)
    console.log('COUNT',countPay)
      // itemsToPay.unshift({
      //   id:countPay,
      //   item:itemName,
      //   asset:payDutch
      // })
    await db.collection("pays").doc(String(countPay))
        .set({
          item:itemName,
          asset:payDutch
        })

      // assetBox.unshift(Number(payDutch))
      
      
      
      // let myMoney=Number(payDutch/2)
      // assetBox.unshift(myMoney)
      // let total = assetBox.reduce((sum, element) => sum + element, 0);
      // console.log('sum',assetBox, total)
      // setAssetSum(total)
      
      setItemName('');
      setPayDutch('');
  }


  useEffect(() => {
    const unsubscribe = db.collection('pays').onSnapshot((querySnapshot) => {
      console.log('検知!')
      const _pays = querySnapshot.docs.map(value => {
        // console.log('called')
        return{
          id: value.id,
          ...value.data()
        }
      });
      console.log('called',_pays)
      setItemsToPay(_pays);

      let total = assetBox.reduce((sum, element) => sum + element, 0);
      console.log('sum',assetBox, total)
      setAssetSum(total)
    })
    const snapshot = await db.collection('sum').get();

    return()=>{
      unsubscribe()
    };
},[]);

  let itemsList=
    itemsToPay.map((value)=>{
      let myMoney=Number(value.asset/2)
      var today=new Date(); 
      var year = today.getFullYear()
      var month = today.getMonth()
      var day = today.getDate();
      return(
          <tr align="center" id={value.id} >
            <td> {year}/{month}/{day}</td>
            <td>{value.item}</td>
            <td>{myMoney}円</td>
            <td>-{myMoney}円</td>
            {/* <button>remove</button> */}
          </tr>
      )
    });
  return (
    <div className="container">
      <Layout>
      <Head>
        <title>Dashboard-SHAM</title>
      </Head>
        <section className={utilStyles.headingMd}>
        <h2>ダッシュボード</h2>
        <div className='input-container'>
          <input placeholder='項目' onChange={handleItemChange} />
          <input placeholder='支払額' onChange={handlePayChange} />
          <button onClick={handleClick} >追加</button>
        </div>

        <div className='list-container'>
          <div className='sum-container'>

          </div>
          <div className='list-container'>
            {console.log('item配列',itemsToPay)}
            {/* {console.log(itemsList)} */}

            <table border="1">
              <tr align="center">
                <th>合計</th>
                <th></th>
                <th>つくしが碩介に{assetSum}円払う</th>
                <th></th>
              </tr>
              <tr align="center">
              {/* className={utilStyles.day} */}
                <th>日時</th>
                <th>項目</th>
                <th className="icon hiro">ひろすけ</th>
                <th className="icon tsuku">つくし</th>
              </tr>
              {itemsList}
            </table>
          </div>
        </div>
        
      </section>
      <footer>
        <Link href="/login">
          <a>login</a>
        </Link>
        </footer>
      </Layout>
    </div>
  )
}

export default Home;
