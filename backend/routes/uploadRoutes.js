import path from "path";
import express from "express";
import multer from "multer";


const router = express.Router();


const storage = multer.diskStorage({

    destination: (req, file, callbk) => {
        callbk(null, "uploads/");
    },


    filename: (req, file, callbk) => {
        const extname = path.extname(file.originalname);
        callbk(null, `${file.fieldname}-${Date.now()}${extname}`);
    },

});



const fileFilter = (req, file, callbk) => {

    const filetypes = /jpe?g|png|webp/;
    const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

    const extname = path.extname(file.originalname).toLowerCase();
    const mimetype = file.mimetype;

    if (filetypes.test(extname) && mimetypes.test(mimetype)) {
        callbk(null, true);
    } else {
        callbk(new Error("Uploading Images Only"), false);
    }
};



const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single("image");



router.post(
    "/",
    (req, res) => {

        uploadSingleImage(req, res, err => {

            if (err) {
                res.status(400).send({ message: err.message });
            } else if (req.file) {
                res.status(200).send({
                    message: "Image Uploaded Successfully",
                    image: `/${req.file.path}`
                })
            } else {
                req.status(400).send({ message: "No Image Provided" });
            };

        });
    }
);



export default router;