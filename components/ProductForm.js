import { useState } from "react";
import axios from 'axios';
import { useRouter } from "next/router";

export default function ProductForm(
    {
        title: existingTitle,
        description: existingDescription,
        price: existingPrice,
    }){
    const [title,setTitle] = useState(existingTitle || '');
    const [description,setDescription] = useState(existingDescription || '');
    const [price,setPrice] = useState(existingPrice || '');
    const[goToProducts,setGoToProducts] = useState(false);
    const router = useRouter();
    async function createProduct(ev){
        ev.preventDefault();
        const data ={title,description,price};
        await axios.post('/api/products',data);
        setGoToProducts(true);
    }
    if(goToProducts){        
        router.push('/products');
    }
    return(
        
            <form onSubmit={createProduct}>
            
            <label>Product Name</label>
            <input type="text"
            placeholder="Product Name" 
            value={title} onChange={ev => setTitle(ev.target.value)}/>
            <label>Description</label>
            <textarea placeholder="Description"
            value={description} 
            onChange={ev => setDescription(ev.target.value)}></textarea>
            <label>Price (in BDT) </label>
            <input type="number" placeholder="Price"
            value={price} onChange={ev => setPrice(ev.target.value)}/>
            <button className="btn-primary">Save</button>
            </form>
        
    )
}