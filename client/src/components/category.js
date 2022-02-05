import { useParams } from 'react-router-dom';

const Category = () => {
    const { categ } = useParams();
    return ( 
        <div>it's category : {categ}</div>
     );
}
 
export default Category;