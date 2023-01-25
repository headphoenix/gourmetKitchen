import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  getDocs,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { db, firestore, storage } from "../../../firebase.config";
import styles from "./ViewProducts.module.scss";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Loader from "../../Loader";
import { deleteObject, ref } from "firebase/storage";
import Notiflix from "notiflix";
import { getAllFoodItems } from "../../../utils/firebaseFunctions";

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getAllFoodItems();
  }, []);

  const getAllFoodItems = async () => {
    setIsLoading(true);

    try {
      const items = await getDocs(
        query(collection(firestore, "foodItems"), orderBy("id", "desc"))
      );
    
      const allProducts = items.docs.map((doc) => doc.data());
      setProducts(allProducts)
      setIsLoading(false)

    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };


  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      "Delete Product!!!",
      "You are about to delete this product",
      "Delete",
      "Cancel",
      function okCb() {
        deleteProduct(id, imageURL);
      },
      function cancelCb() {
        console.log("Delete Canceled");
      },
      {
        width: "320px",
        borderRadius: "3px",
        titleColor: "orangered",
        okButtonBackground: "orangered",
        cssAnimationStyle: "zoom",
      }
    );
  };

  const deleteProduct = async (id, imageURL) => {
    try {
      await deleteDoc(doc(firestore, "foodItems", id));
      const storageRef = ref(storage, imageURL);
      await deleteObject(storageRef);
      await deleteDoc(doc(firestore, "foodItems", id));
      toast.success("Product deleted successfully.");
      getAllFoodItems()
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.table}>
        <h2>All Products</h2>

        {products.length === 0 ? (
          <p>No product found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            {products.map((product, index) => {
              const { id, title, price, imageURL, category } = product;
              return (
                <tbody>
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={imageURL}
                        alt={title}
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>{title}</td>
                    <td>{category}</td>
                    <td>{`$${price}`}</td>
                    <td className={styles.icons}>
                    <Link to={`/admin/add-product/${id}`} >
                        <FaEdit size={20} color="green" />
                      </Link>
                      &nbsp;
                      <FaTrashAlt
                        size={18}
                        color="red"
                        onClick={() => confirmDelete(id, imageURL)}
                      />
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        )}
      </div>
    </>
  );
};

export default ViewProducts;