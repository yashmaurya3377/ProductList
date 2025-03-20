import React, { useState } from 'react'

const Product = () => {
  const localdrive = JSON.parse(localStorage.getItem('product')) || []
  const [product, setproduct] = useState(localdrive)
  const [name, setname] = useState()
  const [price, setprice] = useState()
  const [quantity, setquantity] = useState()
  const addproduct = () => {
 
    if (!name || !price || !quantity) {
          alert("enter full detail of product")
            return
        }
        const existingProductIndex = product.findIndex((p) => p.name === name);

  if (existingProductIndex !== -1) {
    // If the product exists, update its quantity
    const updatedProduct = [...product];
    updatedProduct[existingProductIndex].quantity += parseFloat(quantity);
    setproduct(updatedProduct);
    localStorage.setItem('product', JSON.stringify(updatedProduct));
    return
  }
    const newProduct ={name,price:parseFloat(price),quantity:parseFloat(quantity) };
    const updateproduct = [...product, newProduct]
    setproduct(updateproduct)
    localStorage.setItem('product',JSON.stringify(updateproduct))
    
  }


  const deleteproduct =(index) => {
    const filterproduct=product.filter((_,element)=>element !==index)
    setproduct(filterproduct)
    localStorage.setItem('product',JSON.stringify(filterproduct))
  }
const total=product.reduce((sum,element)=>sum + element.price * element.quantity,0)

  return (
    <div className='d-flex flex-wrap mt-4 '>
         <div className='container bg-danger-subtle p-3 col-lg-6 '>
      <h3 className='text-center p-2 text-decoration-underline' >product Manager</h3>
      <label htmlFor="" className='form-label fw-bold'> product Name</label>
      <input type="text" name="" id=" " className='form-control' placeholder='Enter Product Name' value={name} onChange={(e) => setname(e.target.value)} />
      <label htmlFor="" className='form-label fw-bold'> product   Price</label>
      <input type="text" name="" id=" " className='form-control' placeholder='Enter Product price' value={price} onChange={(e) => setprice(e.target.value)} />
      <label htmlFor="" className='form-label fw-bold'> product Quantatiy</label>
      <input type="number" name="" id=" " className='form-control' placeholder='quantity' value={quantity} onChange={(e) => setquantity(e.target.value)} />
      <select name="" id="" className=' form-select w-50 text-center ms-2 mt-2'>
        <option value="">available</option>
        <option value="">not available</option>
      </select>
      <button className='btn btn-outline-info text-danger mt-3 w-75' onClick={addproduct} >Add product</button>

    </div>
      <div className='container bg-danger-subtle p-3 col-lg-5'>
      <h3 className='text-center p-2 text-decoration-underline' >product list</h3>
        <div  style={{ maxHeight: '400px', overflowY: 'auto' }}>
        <table className='table table-striped  '>
        <thead>
          <tr className='table-dark'style={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#343a40' }}>
            <th>
              sr.no
            </th>
            <th>
              product Name
            </th>
            <th>
              price
            </th>
            <th>
              quantity
            </th>
            <th>
              action
            </th>
          </tr>
        </thead>
        <tbody>
          {
           product.map((element, index) => (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{element.name}</td>
                <td>{element.price}</td>
                <td>{element.quantity}</td>
                <td><button className='btn btn-outline-danger' onClick={()=>deleteproduct(index)} >delete</button></td>
            </tr>
        ))

          }

        </tbody>
      </table>
        </div>
          <h3>Total:&#8377;{total}</h3>
      </div>
    </div>
  )
}

export default Product


