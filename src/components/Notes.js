
// const [items, setItems] = useState(JSON.parse(localStorage.getItem("cartItems")));


{/* <div className={`container ${styles.product}`}>
        <h2>Product Details</h2>
        <div>
          <Link to="/#products">&larr; Back To Products</Link>
        </div>
        {product === null ? (
          <img src={spinnerImg} alt="Loading" style={{ width: "50px" }} />
        ) : (
          <>
            <div className={styles.details}>
              <div className={styles.img}>
                <img src={product.imageURL} alt={product.title} />
              </div>
              <div className={styles.content}>
                <h3>{product.title}</h3>
                <p className={styles.price}>{`$${product.price}`}</p>
                <p>{product.desc}</p>
                <p>
                  <b>SKU</b> {product.id}
                </p>
                <p>
                  <b>Brand</b> {product.brand}
                </p>

                <div className={styles.count}>
                {/* {isCartAdded < 0 ? null : (
                    <>
                      <button
                        className="--btn"
                        // onClick={() => decreaseCart(product)}
                      >
                        -
                      </button>
                      <p>
                        <b>{cart.cartQuantity}</b>
                      </p>
                      <button
                        className="--btn"
                        // onClick={() => addToCart(product)}
                      >
                        +
                      </button>
                    </>
                  )} */}
    //             </div>
    //             <button
    //               className="--btn --btn-danger"
    //               onClick={() => addtoCart(item)}
    //             >
    //               ADD TO CART
    //             </button>
    //           </div>
    //         </div>
    //       </>
    //     )}
    //   </div> 

    // <Product>
    //         <ProductDetail>
    //           <Image src="https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1614188818-TD1MTHU_SHOE_ANGLE_GLOBAL_MENS_TREE_DASHERS_THUNDER_b01b1013-cd8d-48e7-bed9-52db26515dc4.png?crop=1xw:1.00xh;center,top&resize=480%3A%2A" />
    //           <Details>
    //             <ProductName>
    //               <b>Product:</b> JESSIE THUNDER SHOES
    //             </ProductName>
    //             <ProductId>
    //               <b>ID:</b> 93813718293
    //             </ProductId>
    //             <ProductColor color="black" />
    //             <ProductSize>
    //               <b>Size:</b> 37.5
    //             </ProductSize>
    //           </Details>
    //         </ProductDetail>
    //         <PriceDetail>
    //           <ProductAmountContainer>
    //             <p>ADD</p>
    //             <ProductAmount>2</ProductAmount>
    //             <p>Subtract</p>
    //           </ProductAmountContainer>
    //           <ProductPrice>$ 30</ProductPrice>
    //         </PriceDetail>
    //       </Product>
    //       <Hr />
    //       <Product>
    //         <ProductDetail>
    //           <Image src="https://i.pinimg.com/originals/2d/af/f8/2daff8e0823e51dd752704a47d5b795c.png" />
    //           <Details>
    //             <ProductName>
    //               <b>Product:</b> HAKURA T-SHIRT
    //             </ProductName>
    //             <ProductId>
    //               <b>ID:</b> 93813718293
    //             </ProductId>
    //             <ProductColor color="gray" />
    //             <ProductSize>
    //               <b>Size:</b> M
    //             </ProductSize>
    //           </Details>
    //         </ProductDetail>
    //         <PriceDetail>
    //           <ProductAmountContainer>
    //             <p>Add</p>
    //             <ProductAmount>1</ProductAmount>
    //             <p>Subtract</p>
    //           </ProductAmountContainer>
    //           <ProductPrice>$ 20</ProductPrice>
    //         </PriceDetail>
    //       </Product>


    // AIzaSyAQjnM8DGi9Ytkg7FyCdvv2YRtMxDi5Y6w