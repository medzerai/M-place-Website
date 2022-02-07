import { useParams } from 'react-router-dom';


const Product = () => {
    const { categ ,sousCateg,sousSousCateg,product} = useParams();
    return ( 
        <div>{categ.replaceAll("_", " ") +" > "+sousCateg.replaceAll("_", " ")+" > "+sousSousCateg.replaceAll("_", " ")+" > "+product.replaceAll("_", " ")}</div>
     );
}
 
export default Product;