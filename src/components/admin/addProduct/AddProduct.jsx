import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  addDoc,
  Timestamp,
} from "firebase/firestore";

import { toast } from "react-toastify";

import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdFoodBank,
  MdAttachMoney,
} from "react-icons/md";
import { categories } from "../../../utils/data";
import Loader from "../../Loader";

import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import { firestore, storage } from "../../../firebase.config";
import {
  getAllFoodItems,
  saveItem,
  save,
} from "../../../utils/firebaseFunctions";
import { actionType } from "../../../context/reducer";
import { useStateValue } from "../../../context/StateProvider";

import { useNavigate, useParams } from "react-router-dom";

const initialState = {
  title: "",
  imageAsset: null,
  price: 0,
  category: null,
  desc: "",
};

const AddProduct = () => {
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [{ foodItems }, dispatch] = useStateValue();
  const [uploadProgress, setUploadProgress] = useState(0);

  const { id } = useParams();
  const products = foodItems;
  const productEdit = products?.find((item) => item.id === id) || {extras: []};

  const [extras, setExtras] = useState(productEdit?.extras || []);

  const [extraName, setExtraName] = useState("");
  const [extraPrice, setExtraPrice] = useState(0);

  const inputRef = useRef(null);

  const [product, setProduct] = useState(() => {
    const newState = detectForm(
      id,
      { ...initialState, extras: extras, imageAsset: productEdit?.imageAsset },
      productEdit
    );
    if (!newState.imageAsset && productEdit) {
      newState.imageAsset = productEdit.imageURL;
    }
    return newState;
  });

  const { title, desc, imageAsset, price, category, pack } = product;
 
  const addExtra = () => {
    if (!extraName || !extraPrice) {
      setAlertStatus("danger");
      setMsg("Extra name and price are required.");
      setFields(true);
      setTimeout(() => {
        setFields(false);
      }, 4000);
    } else {
      const updatedExtras = productEdit
        ? [...productEdit.extras, { name: extraName, price: extraPrice }]
        : [...extras, { name: extraName, price: extraPrice }];
        setExtras([...extras, { name: extraName, price: extraPrice }]);
      setProduct({ ...product, extras: updatedExtras });
      setExtraName("");
      setExtraPrice(0);
      setAlertStatus("success");
      setMsg("Extra added successfully.");
      setFields(true);
      setTimeout(() => {
        setFields(false);
      }, 4000);
  
    }
  }; 
  
  const handleFileChange = () => {
    if (inputRef.current && inputRef.current.files.length > 0) {
        uploadImage(inputRef.current.files[0]);
    }
}
  
  // useEffect(() => {
  //   setProduct({ ...product, extras });
  // }, [extras]);

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
        setFields(true);
        setMsg("Error while uploading : Try AGain 🙇");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({...product, imageAsset: downloadURL});
          setIsLoading(false);
          setFields(true);
          setMsg("Image uploaded successfully 😊");
          setAlertStatus("success");
          setTimeout(() => {
            setFields(false);
          }, 4000);
        });
      }
    );
  };

  const deleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() => {
      setProduct({ ...product, imageAsset: null });
      setIsLoading(false);
      setFields(true);
      setMsg("Image deleted successfully 😊");
      setAlertStatus("success");
      setTimeout(() => {
        setFields(false);
      }, 4000);
    });
  };

  const saveDetails = () => {
    setIsLoading(true);
    try {
      if (!title || !desc || !imageAsset || !price || !category) {
        setFields(true);
        setMsg("Required fields can't be empty");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      } else {
        const data = {
          id: `${Date.now()}`,
          title: title,
          imageURL: imageAsset,
          category: category,
          desc: desc,
          qty: 1,
          price: price,
          extras: extras,
        };
        saveItem(data);
        setIsLoading(false);
        setFields(true);
        setMsg("Data Uploaded successfully 😊");
        setAlertStatus("success");
        setTimeout(() => {
          setFields(false);
        }, 4000);
        clearData();
      }
    } catch (error) {
      console.log(error);
      setFields(true);
      setMsg("Error while uploading : Try AGain 🙇");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }

    fetchData();
  };

  const clearData = () => {
    setProduct({ ...initialState });
  };

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };

  //console.log(id)

  // const finalProduct = {
  //   id: productEdit?.id,
  //   calories: productEdit?.calories,
  //   title: productEdit?.title,
  //   price: productEdit?.price,
  //   category: productEdit?.category,
  //   imageAsset: productEdit?.imageURL,
  //   qty: productEdit?.qty,
  // }
  // console.log(finalProduct);
  //console.log(initialState)

  const handleExtraChange = (event, index) => {
    const updatedExtras = [...extras];
    updatedExtras[index] = {
      ...updatedExtras[index],
      [event.target.name]: event.target.value,
    };
    setExtras(updatedExtras);
  };
  
  const handleDeleteExtra = (index) => {
    const updatedExtras = [...extras];
    updatedExtras.splice(index, 1);
    setExtras(updatedExtras);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  //console.log(product);

  const navigate = useNavigate();

  function detectForm(id, f1, f2) {
    if (id === "ADD") {
      return f1;
    }
    return f2;
  }

  const editProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (product.imageURL !== productEdit.imageURL) {
      if (productEdit.imageURL) {
        const storageRef = ref(storage, productEdit.imageAsset);
        deleteObject(storageRef);
      }
    } else {
      productEdit.imageURL = product.imageURL;
    }

    try {
      const data = {
        title: title,
        imageURL: productEdit.imageURL,
        category: category,
        desc: desc,
        qty: 1,
        price: price,
        extras: extras,
      };
      setDoc(doc(firestore, "foodItems", id), data, {
        merge: true,
      });
      setIsLoading(false);
      setMsg("Data Edit successfully 😊");
      toast.success("Product Edited Successfully");
      navigate("/admin/all-products");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const handleChange = (event, index) => {
    const newExtras = [...productEdit.extras];
    newExtras[index][event.target.name] = event.target.value;
    setProduct({ ...product, extras: newExtras });
  };

  const handleDelete = (index) => {
    const newExtras = [...productEdit.extras];
    newExtras.splice(index, 1);
    setProduct({ ...product, extras: newExtras });
  };

  // useEffect(() => {
  //   setExtras([...extras, { name: extraName, price: extraPrice }]);
  // }, [extras]);

  const deleteExtra = (index) => {
    const newExtras = [...extras];
    newExtras.splice(index, 1);
    setExtras(newExtras);
    setAlertStatus("success");
    setMsg("Extra deleted successfully.");
    setFields(true);
    setTimeout(() => {
      setFields(false);
    }, 4000);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-[90%] md:w-[50%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
              alertStatus === "danger"
                ? "bg-red-400 text-red-800"
                : "bg-emerald-400 text-emerald-800"
            }`}
          >
            {msg}
          </motion.p>
        )}
        <h2>{detectForm(id, "Add New Product", "Edit Product")}</h2>
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdFastfood className="text-xl text-gray-700" />
          <input
            type="text"
            required
            name="title"
            value={title}
            onChange={(e) => handleInputChange(e)}
            placeholder="Give me a title..."
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>

        <div className="w-full">
          <select
            name="category"
            onChange={(e) => handleInputChange(e)}
            className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
          >
            <option value="other" className="bg-white">
              Select Category
            </option>
            {categories &&
              categories.map((item) => (
                <option
                  key={item.id}
                  className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                  value={item.urlParamName}
                >
                  {item.name}
                </option>
              ))}
          </select>
        </div>
        <div>
        <h3>Extras</h3>
  {extras.map((extra, index) => (
    <div key={index}>
      <label>Extra name:</label>
      <input
        type="text"
        value={extra.name}
        name='name'
        onChange={(e) => handleExtraChange(e, index)}
      />
      <label>Extra price:</label>
      <input
        type="number"
        value={extra.price}
        name='price'
        onChange={(e) => handleExtraChange(e, index)}
      />
      <button onClick={() => handleDeleteExtra(index)}>Delete</button>
    </div>
  ))}
          <input
            type="text"
            placeholder="Extra name"
            value={extraName}
            onChange={(e) => setExtraName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Extra price"
            value={extraPrice}
            onChange={(e) => setExtraPrice(e.target.value)}
          />
          <button onClick={addExtra}>Add extra</button>
        </div>

        <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-340 cursor-pointer rounded-lg">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!imageAsset ? (
                <>
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                      <p className="text-gray-500 hover:text-gray-700">
                        Click here to upload
                      </p>
                    </div>
                    <input
                      type="file"
                      name="uploadimage"
                      accept="image/*"
                      onChange={uploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative h-full">
                    <img
                      src={imageAsset}
                      alt="uploaded image"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
                      onClick={deleteImage}
                    >
                      <MdDelete className="text-white" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
         

        <div className="w-full h-full flex flex-col items-center gap-3">
          <div className="w-full h-200 py-2 border-b border-gray-300 flex items-center gap-2">
            <MdFoodBank className="text-gray-700 text-2xl" />
            <textarea
              className="w-full h-64 resize-none leading-5 text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
              required
              value={desc}
              name="desc"
              onChange={(e) => handleInputChange(e)}
              placeholder="Description"
            />
          </div>

          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <p className="text-gray-700 text-2xl">GHS</p>
            <input
              type="text"
              required
              value={price}
              name="price"
              onChange={(e) => handleInputChange(e)}
              placeholder="Price"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>
        </div>

        <div className="flex items-center w-full">
          <button
            type="button"
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
            onClick={detectForm(id, saveDetails, editProduct)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;

// 2. Add an input field where I can edit/add Extras like size, different ingredients, and preferences with their price increments to a particular food item I want the extras to be added and saved to firebase much like the products too.
// So that when a customer is trying to order a food item as he chooses his/her preferences the prices increase accordingly.
// 3. Whenever I try to edit a food item, the image disappears and I have to re-upload it. Fix this bug.
