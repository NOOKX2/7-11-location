'use client'
import { useEffect, useState } from 'react';

export default function Home() {

  const [stores, setStores] = useState([])
  console.log("store", stores.name)

  const GetStoreBySearch = async () => {
    const response = await fetch("https://web-api-ro.7eleven.co.th/v1/Store/GetStoreBySearch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Origin": "https://www.7eleven.co.th",
        "User-Agent": "Mozilla/5.0",
        "X-Channel": "web"
      },
      body: JSON.stringify({
        "keyword": "กรุงเทพ"
      })
    })
    const data = await response.json();
    setStores(data.data)

    console.log("data", data.data[0].name);

  }


  useEffect(() => {
    GetStoreBySearch();
  }, [])

  return (
    <div className='my-[10px] mx-[10px] '>
      <table className='text-left'>
        <thead>
          <tr className='bg-red-400 border '>
            <th className='p-1 border'>ชื่อร้าน</th>
            <th className='p-1 border'>id</th>
            <th className='p-1 border'>lat</th>
            <th className='p-1 border'>lng</th>
            <th className='p-1 border'>ที่อยู่</th>
            <th className='p-1 border'>แขวง</th>
            <th className='p-1 border'>เขต</th>
            <th className='p-1 border'>จังหวัด</th>
            <th className='p-1 border'>รหัสไปรษณีย์</th>
            <th className='p-1 border'>สินค้า</th>
            <th className='p-1 border'>Product Group</th>
            <th className='p-1 border'>Link</th>
          </tr>
        </thead>
        <tbody>

          {stores.map((store) => (
            <tr className='bg-yellow-100' key={store.id}>
              <td className='p-1 border'>{store.name}</td>
              <td className='p-1 border'>{store.id}</td>
              <td className='p-1 border'>{store.lat}</td>
              <td className='p-1 border'>{store.lng}</td>
              <td className='p-1 border'>{store.address}</td>
              <td className='p-1 border'>{store.subdistrict}</td>
              <td className='p-1 border'>{store.district}</td>
              <td className='p-1 border'>{store.province}</td>
              <td className='p-1 border'>{store.postcode}</td>
              <td className='p-1 border'><ul>
                {store.products && store.products.map((product, index) => (
                  <li key={product.id}>{index+1}.{product.name}</li>
                ))}
              </ul></td>
              <td className='p-1 border'>{store.productGroup}</td>
              <td className='p-1 border'>
                <a className="text-blue-500" href={store.direction} target="_blank" rel="noopener noreferrer">แผนที่</a>
              </td>
            </tr>
          ))}


        </tbody>
      </table>
    </div>
  );
}
