import userModel from "../models/userModel.js"

// add products to cart
const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1
            }
            else {
                cartData[itemId][size] = 1
            }
        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }
        await userModel.findByIdAndUpdate(userId, { cartData })

        res.json({ sucess: true, message: "Added To Cart" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


// update user cart
// const updateCart = async (req, res) => {
//     try {
//         const { userId, itemId, size, quantity } = req.body
//         const userData = await userModel.findById(userId)
//         let cartData = await userData.cartData;
//         cartData[itemId][size] = quantity

//         await userModel.findByIdAndUpdate(userId, { cartData })
//         res.json({ sucess: true, message: "Cart Updated" })

//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message })
//     }
// }

const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body;
        const userData = await userModel.findById(userId);
        let cartData = userData.cartData || {}; // Initialize if undefined

        // Initialize the item object if it doesn't exist
        if (!cartData[itemId]) {
            cartData[itemId] = {};
        }

        // Update the quantity for the specific size
        cartData[itemId][size] = quantity;

        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Cart Updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}



// add user cart data
// const getUserCart = async (req, res) => {
//  try {
//     const {userId} = req.body
//     let userData= await userModel.findById(userId)
// res.json({success:true, cartData})
//  } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message })
//  }
// }

const getUserCart = async (req, res) => {
    try {
       const { userId } = req.body
       const userData = await userModel.findById(userId)
       const cartData = userData.cartData 
       res.json({ success: true, cartData })
    } catch (error) {
       console.log(error);
       res.json({ success: false, message: error.message })
    }
   }
   

export { addToCart, updateCart, getUserCart }