var express = require("express");
var router = express.Router();
var client = require("../../connection/elk");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("Elk");
});

/** Check Connect */
router.get("/check", function(req, res, next) {
  //check connect
  client.ping(
    {
      requestTimeout: 3000 //ms
    },
    (err, res1, sta) => {
      if (err) {
        return console.error(`Error connect:::`, err);
      }

      console.log(`isOkay::: connect`);
      res.send("isOkay::: connect");
    }
  );
});

/** Create */
router.post("/create", function(req, res, next) {
  const { index } = req?.body;
  client.indices.create(
    {
      index //tao index như các db khác
    },
    (err, res1, sta) => {
      // console.log(`err, res, sta:::`, err, res, sta);
      // res.send(`err, res, sta:::`, err, res, sta);
      res.send("tạo mới thành công: ", index);
    }
  );
  // res.send("elk");
});

/**
 * Add data to Index
 */
router.post("/add", function(req, res, next) {
  const { index, type, id, data } = req?.body;

  client.index(
    {
      index,
      id,
      type,
      body: data
    },
    (err, res1, sta) => {
      // console.log(`err, res, sta:::`, err, res1, sta);
      console.log({ err });
      if (!err) res.send("Thêm thành công");

      res.send("Thêm thất bại.");
    }
  );
  // res.send("1");
});

router.get("/get/:index/:type", function(req, res, next) {
  // console.log({ req });
  const { index, type } = req?.params;

  console.log(res?.params);


  client.search(
    {
      index,
      type,
      // body: {
      //   query: {
      //     match_all: {
      //     }
      //   }
      // }
    },
    (err, res1, sta) => {
      // console.log(`err, res, sta:::`, err, res, sta);
      res.send(res1.hits.hits);
    }
  );
});

module.exports = router;
