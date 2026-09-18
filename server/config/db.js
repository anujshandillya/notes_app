import mongoose from "mongoose";

const MONGO_URI = "mongodb+srv://anujsharmawork11:j20iPH2qi0EUcoNc@ssd.ivvaefr.mongodb.net/?appName=ssd";

const ConnectToDB = async () => {
    mongoose.connect(MONGO_URI).then(() => {
        console.log("Connected to DB Successfully... Starting Server");
        return 200;
    }).catch((error) => {
        console.error(`${error} did not connect`);
        return 500;
    });
}

export default ConnectToDB;
