// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { backendUrl, currency } from '../App'
// import { toast } from 'react-toastify'

// const List = () => {
//   const [list,setList] = useState([])

//   const fetchList = async () => {
//     try {
//       const response = await axios.get(backendUrl + '/api/product/list')
//       console.log(response.data);

//       if (response.data.success) {
//         setList(response.data.products)
//       }
//       else {
//         toast.error(response.data.message)
//       }
//       // console.log(response.data);

//     } catch (error) {
//       console.log(error);
//       toast.error(error.message)
//     }
//   }

//   useEffect(()=>{
//     fetchList()
//   }, [])

//   return (
//     <>
//       <p className='mb-2'>All Products List</p>
//       <div className='flex flex-col gap-2'>
//         {/* List table title */}
//         <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
//           <b>Image</b>
//           <b>Name</b>
//           <b>Category</b>
//           <b>Price</b>
//           <b className='text-center'>Action</b>
//         </div>

//         {/* product list */}

//         {
//           list.map((item,index) => (
//             <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-1 border text-sm' key={index}>
//               <img className='w-12' src={item.image[0]} alt='' />
//               <p>{item.name}</p>
//               <p>{item.category}</p>
//               <p>{currency}{item.price}</p>
//               <p className='text-right md:text-center cursor-pointer text-lg'>X</p>
//               </div>
//           ))
//         }
//       </div>
//     </>
//   )
// }

// export default List


import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const List = ({token}) => {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchList = async () => {
    try {
      setLoading(true)
      console.log('Fetching products from:', backendUrl + '/api/product/list')
      
      const response = await axios.get(backendUrl + '/api/product/list')
      console.log('Full API response:', response.data)

      // Handle both possible success spellings
      if (response.data.success || response.data.sucess) {
        const products = response.data.products || []
        console.log('Products received:', products)
        setList(products)
      } else {
        toast.error(response.data.message || 'Failed to load products')
      }
    } catch (error) {
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        config: error.config
      })
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setLoading(false)
    }
  }


const removeProduct = async (id) =>{
try {
  const response = await axios.post(backendUrl + '/api/product/remove' , {id} , {headers: {token}})
if(response.data.success){
  toast.success(response.data.message)
  await fetchList();
}else{
  toast.error(response.data.message)
}
} catch (error) {
  console.log(error);
  toast.error(response.data.message)
}
}

  useEffect(() => {
    fetchList()
  }, [])

  // Debug current state
  useEffect(() => {
    console.log('Current list state:', list)
  }, [list])

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Products List</h2>
      
      {loading ? (
        <div className="text-center py-8">Loading products...</div>
      ) : list.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {list.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img 
                      src={item.image?.[0] || 'https://via.placeholder.com/50'} 
                      alt={item.name}
                      className="h-12 w-12 object-cover rounded"
                      onError={(e) => e.target.src = 'https://via.placeholder.com/50'}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{currency}{item.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button onClick={()=>removeProduct(item._id)} className="text-red-500 hover:text-red-700 cursor-pointer">✕</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No products found. Please check:
          <ul className="list-disc inline-block text-left mt-2">
            <li>Backend API response</li>
            <li>Network connection</li>
            <li>Database records</li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default List