import AppNav from "../AppNav/AppNav"

const Product = () => {
    return (
        <div className="product">

            <AppNav />
            
            <div className="about">
                <img src="img-1.jpg" alt="" id="product-img"/>
                <div className="data">
                    <h2>About WorldWide</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo est
                        dicta illum vero culpa cum quaerat architecto sapiente eius non
                        soluta, molestiae nihil laborum, placeat debitis, laboriosam at fuga
                        perspiciatis?
                    </p>
                    <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis
                        doloribus libero sunt expedita ratione iusto, magni, id sapiente
                        sequi officiis et.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Product
