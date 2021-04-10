import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
// import '../styles/index.css'
import React, { useState} from 'react'

function Home() {
  const [itemName, setItemName]=useState('');
  const [payDutch, setPayDutch]=useState('');
  const [countPay, setCountPay]=useState(1);
  const [assetSum, setAssetSum]=useState();
  const [assetBox, setAssetBox]=useState([]);
  const [itemsToPay, setItemsToPay]=useState([]);
  const handleItemChange = e => setItemName(e.target.value);
  const handlePayChange = e => setPayDutch(e.target.value);
  const handleClick = (e) =>{
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
    console.log(countPay)
      itemsToPay.unshift({
        id:countPay,
        item:itemName,
        asset:payDutch
      })
      let myMoney=Number(payDutch/2)
      assetBox.unshift(myMoney)
      let total = assetBox.reduce((sum, element) => sum + element, 0);
      console.log('sum',assetBox, total)
      setAssetSum(total)
      // localStorage.setItem(localStorageKey,items)
      // setItemName('');
      // setPayDutch('');
      // setItemsToPay([

      //   {
      //     id:1,
      //     item:'rent',
      //     asset:30000
      //   },
      //   {
      //     id:2,
      //     item:'foods',
      //     asset:2000
      //   },
      //   {
      //     id:3,
      //     item:'foods',
      //     asset:2
      //   }
      // ])
  }

  let itemsList=
    itemsToPay.map((value)=>{
      let myMoney=Number(value.asset/2)
      var today=new Date(); 
      var year = today.getFullYear()
      var month = today.getMonth()
      var day = today.getDate();
      // var hour = today.getHours();
      

      return(
      // <div className='list'>
      
          <tr align="center" id={value.id} >
            <td> {year}/{month}/{day}</td>
            <td>{value.item}</td>
            <td>{myMoney}円</td>
            <td>-{myMoney}円</td>
            {/* <button>remove</button> */}
          </tr>
      // </div>
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
            {console.log(itemsToPay)}
            {console.log(itemsList)}

            <tabel border="1">
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
            </tabel>
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
