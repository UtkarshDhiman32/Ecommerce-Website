import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios from "axios";
import { toast } from 'react-toastify';
const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setorderData] = useState([])

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null
      }
      const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } })
      // console.log(response.data);
      if (response.data.success) {
        let allOrdersItem = []
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })
        // console.log(allOrdersItem);
        setorderData(allOrdersItem.reverse())
      }
    } catch (error) {
      console.error("Failed to load orders:", error);
toast.error(error.message)
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [token])
  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>
      <div>
        {
          orderData.map((item, index) => (
            <div key={index} className='border-gray-300 py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='border-gray-300 flex items-start gap-6 text-sm'>
                <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
                <div>
                  <p className='sm:text-base font-medium'>{item.name}</p>
                  <div className='flex item-center gap-3 mt-1 text-base text-gray-700'>
                    <p>{currency}{item.price}</p>
                    <p>Quantity:{item.quantity}</p>
                    <p>Size:{item.size}</p>
                  </div>
                  <p className='mt-1'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                  <p className='mt-1'>Payment: <span className='text-gray-400'>{item.paymentMethod}</span></p>

                </div>
              </div>
              <div className='md:w-1/2 flex justify-between'>
                <div className='flex items-center gap-2'>
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                  <p className='text-sm md:text-base'>{item.status}</p>
                </div>
                <button onClick={loadOrderData} className='border-gray-400 border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders


// import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import Title from '../components/Title'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'

// const Orders = () => {
//   const { backendUrl, token, currency } = useContext(ShopContext)
//   const [orderData, setOrderData] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const navigate = useNavigate()

//   const loadOrderData = async () => {
//     try {
//       if (!token) {
//         setError('Please login to view your orders')
//         setLoading(false)
//         return
//       }

//       setLoading(true)
//       const response = await axios.post(
//         `${backendUrl}/api/order/userorders`,
//         {},
//         { headers: { token } }
//       )

//       if (response.data.success) {
//         // Transform the orders data to flatten items while preserving order info
//         const transformedOrders = response.data.orders.flatMap(order =>
//           order.items.map(item => ({
//             ...item,
//             status: order.status,
//             payment: order.payment,
//             paymentMethod: order.paymentMethod,
//             date: order.date,
//             orderId: order._id // Include order ID for reference
//           }))
//         )
//         setOrderData(transformedOrders.reverse())
//       }
//     } catch (error) {
//       console.error("Error loading orders:", error)
//       setError(error.response?.data?.message || "Failed to load orders")
//       if (error.response?.status === 401) {
//         // Handle unauthorized (token expired/invalid)
//         navigate('/login')
//       }
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     loadOrderData()
//   }, [token])

//   const formatDate = (timestamp) => {
//     const date = new Date(timestamp)
//     return date.toLocaleDateString('en-US', {
//       day: 'numeric',
//       month: 'short',
//       year: 'numeric'
//     })
//   }

//   if (loading) {
//     return <div className="text-center py-8">Loading your orders...</div>
//   }

//   if (error) {
//     return <div className="text-center py-8 text-red-500">{error}</div>
//   }

//   if (orderData.length === 0) {
//     return (
//       <div className="text-center py-8">
//         <p>No orders found</p>
//         <button
//           onClick={() => navigate('/')}
//           className="mt-4 bg-black text-white px-6 py-2 rounded"
//         >
//           Continue Shopping
//         </button>
//       </div>
//     )
//   }

//   return (
//     <div className='border-t pt-16'>
//       <div className='text-2xl'>
//         <Title text1={'MY'} text2={'ORDERS'} />
//       </div>
//       <div>
//         {orderData.map((item, index) => (
//           <div key={`${item.orderId}-${index}`} className='border-gray-300 py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
//             <div className='border-gray-300 flex items-start gap-6 text-sm'>
//               <img
//                 className='w-16 sm:w-20 object-cover'
//                 src={item.image[0]}
//                 alt={item.name}
//               />
//               <div>
//                 <p className='sm:text-base font-medium'>{item.name}</p>
//                 <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
//                   <p className='text-lg'>{currency}{item.price}</p>
//                   <p>Quantity: {item.quantity}</p>
//                   <p>Size: {item.size}</p>
//                 </div>
//                 <p className='mt-2'>
//                   Date: <span className='text-gray-400'>{formatDate(item.date)}</span>
//                 </p>
//               </div>
//             </div>
//             <div className='md:w-1/2 flex justify-between'>
//               <div className='flex items-center gap-2'>
//                 <p className={`min-w-2 h-2 rounded-full ${
//                   item.status === 'shipped' ? 'bg-green-500' :
//                   item.status === 'processing' ? 'bg-yellow-500' :
//                   'bg-gray-500'
//                 }`}></p>
//                 <p className='text-sm md:text-base capitalize'>
//                   {item.status.replace(/-/g, ' ')}
//                 </p>
//               </div>
//               <button
//                 className='border-gray-400 border px-4 py-2 text-sm font-medium rounded-sm hover:bg-gray-100 transition'
//                 onClick={() => navigate(`/track-order/${item.orderId}`)}
//               >
//                 Track Order
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default Orders