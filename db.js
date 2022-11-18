const mongoose = require("mongoose");

const Connection = () => {
  mongoose
    .connect(process.env.DB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then((data) => {
      console.log(data.connection.host, "db connected");
    });
  // .catch((err) => {
  //   console.log(err);
  // });

  //   try {
  //     mongoose.connect(
  //       process.env.DB,
  //       {
  //         useUnifiedTopology: true,
  //         useNewUrlParser: true,
  //       },
  //       () => {
  //         console.log("database connected");
  //       }
  //     );
  //   } catch (error) {
  //     console.log("from database connection", error);
  //   }
};

module.exports = Connection;
