const { Op } = require('sequelize');
const { posting, review, user } = require('../models');
const fs = require('fs');
const { profile } = require('console');



exports.addProduct = async (req, res) => {

    try {
        
        let { name, description } = req.body

        console.log(name, description);

        if (name == null || description == null ) {
            return res.status(400).json({
                message: "data postingan tidak lengkap"
            })
        }

        

        // const newProduct = await product.create({
        //     name: name,
        //     description: description,
        //     price: price,
        //     categoryId: findCategory.id,
        //     stock: stock,
        //     image: req.file.path
        // })

        const newProduct = await posting.create({
            name: name,
            description: description,
            // price: price,
            // categoryId: findCategory.id,
            // stock: stock,
            // image: req.file ? req.file.path : null
        });


        res.status(201).json({
            message: "berhasil menambah product",
            data: newProduct
        })
    } catch (error) {
        res.status(500).json(error.message)
    }

}



exports.readProducts = async (req, res) => {
    try {
      // Mengambil semua produk dari database
      const Postings = await posting.findAndCountAll();
      
      // Memeriksa jika daftar produk kosong
      if (Postings.length === 0) {
        return res.status(404).json({ message: 'Tidak ada produk yang ditemukan' });
      }
      
      // Mengirim respons dengan daftar produk yang ditemukan
      res.status(200).json({ Postings });
    } catch (error) {
      // Mengirim respons jika terjadi kesalahan
      console.error("Error while fetching products:", error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// FILTER DATA TANPA PAGINATION

// exports.readProducts = async (req, res) => {

//     try {

//         const { name } = req.query;
//         console.log(name);

//         let productData = ""
//         if (name){
//                 const products = await product.findAll({
//                     where: {
//                         name: {
//                             [Op.like]: "%" + name + "%"
//                         }
//                     }
//                 });


//             productData = products


//         } else {
//             const products = await product.findAll();

//             productData = products
//         }

//         if(productData == "") {
//             return res.status(404).json({
//                 message: "product filter tidak ditemukan"
//             })
//         }


//         return res.status(200).json({
//             data: productData
//         })
//     } catch (error) {
//         return res.status(500).json({
//             error: error
//         })
//     }

// }



// exports.detailProduct = async (req, res) => {
//     const id = req.params.id;

//     const productData = await product.findByPk(id);

//     if(!productData) {
//         res.status(404).json({
//             message: "produk yang ada cari tidak ada"
//     })

//     console.log(productData);

//     return res.status(200).json({
//         data: productData
//     })

//     }
// }


exports.detailProduct = async (req, res) => {


    try {
        let id = req.params.id;

        const postingData = await posting.findByPk(id, {
            include: [
                {
                    model: review,
                    attributes: { exclude: ["user_id", "posting_id"] },
                    include: [
                        {
                            model: user,
                            attributes: ["name"],
                            include: [
                                {
                                    model: profile,
                                    attributes: ["age", "image"]
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        
        if (!postingData) {
            res.status(404).json({
                message: "postingan yang ada cari tidak ada"
            })
        }

        return res.status(200).json({
            data: postingData,
        })

    } catch (error) {
        res.status(500).json({
            error: error
        })
    }

}


// exports.updateProduct = async(req, res) => {
//     const idParams = req.params.id
//     let {  } = req.body

//     const productData = await product.findByPk(idParams);

//     if(!productData) {
//         res.status(404).json({
//             message: "product id tidak ditemukan"
//         })
//     }

//     const file = req.file

//     if(file) {
//         const namwImage = productData.image.replace
//     }
// }


exports.updateProduct = async (req, res) => {


    try {
        const idParams = req.params.id;
        const { name, description } = req.body;

        const postingData = await posting.findByPk(idParams);

        if (!postingData) {
            return res.status(404).json({
                message: "Postingan dengan ID tidak ditemukan"
            });
        }



        // Update product data
        postingData.name = name || postingData.name;
        postingData.description = description || postingData.description;




        // Save the updated product
        await postingData.save();

        res.status(200).json({
            message: "Berhasil update postingan",
            data: postingData
        });
    } catch (error) {
        res.status(500).json({
            message: "Gagal mengupdate postingan",
            error: error.message
        });
    }
};



exports.destroyProduct = async (req, res) => {

    try {
        const postingId = req.params.id;

        const postingData = await posting.findByPk(postingId);


        if (!postingData) {
            return res.status(404).json({
                message: "Postingan tidak ditemukan"
            });
        }

        await posting.destroy({
            where: {
                id: postingId
            }
        });

        return res.status(204).json({
            message: "Postingan berhasil dihapus"
        });

    } catch (error) {

        
        return res.status(500).json({
            message: "Terjadi kesalahan saat menghapus postingan",
            error: error.message
        });
    }
};




// exports.destroyProduct = async (req, res) => {
//     try {
//         const productData = await product.findOne({
//             where: {
//                 id: req.params.id
//             }
//         })

//         if (!productData) {
//             return res.status(404).json({
//                 message: "Product tidak ditemukan"
//             });
//         }

//         await product.destroy({
//             where: {
//                 id: productData.id
//             }
//         });

//         res.status(204).json({
//             message: "product berhasil delete"
//         });
//     } catch (error) {
//         console.error(error); // Log kesalahan
//         res.status(500).json({ message: "Terjadi kesalahan saat menghapus berita" });
//     }
// }
