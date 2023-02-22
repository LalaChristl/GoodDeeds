import Marker from "../models/Marker.js";

export const addMarker = async (req, res) => {
  try {
    console.log("🌞~ Marker add hello", req.body);

    // const newMap = await Map.create(req.body);
    // console.log("~ module.exports.add= ~ newMap", newMap);

    const createdMarker = await Marker.create({
      address: req.body.address,
      coordinates: [req.body.lng, req.body.lat],
    });
    console.log("🌞~ createdMarker", createdMarker);

    // if (!newMap) return res.send({ success: false, errorId: 2 });

    res.send({ success: true, marker: createdMarker });
  } catch (error) {
    console.log("🌞~ Marker add error", error.message);

    res.send({ success: false, error: error.message });
  }
};

export const listMarker = async (req, res) => {
  try {
    // const skip = req.query.skip === undefined ? 0 : Number(req.query.skip);

    console.log("Hello 🌞from map list");

    const marker = await Marker.find().select(" -__v");
    // .skip(skip)
    // .limit(1000000000000000000000000000000000000000)
    // .sort("-_id")
    console.log("marker-list", marker);

    res.send({ success: true, marker });
  } catch (error) {
    console.log("🌞markers.list-error", error.message);

    res.send({ success: false, error: error.message });
  }
};

export const editMarker = async (req, res) => {
  try {
    console.log("Hello 🌞from edit marker", req.params);

    const marker = await Marker.findById(req.params._id).select("-__v");

    console.log("Module.exports editMarker", marker);

    if (!user) return res.send({ success: false, errorId: 1 });

    res.send({ success: true, marker });
  } catch (error) {
    console.log("Error 🌞 editmarker user", error.message);
    res.send({ success: false, error: error.message });
  }
};

export const deleteMarker = async (req, res) => {
  try {
    console.log("Hello from marker delete", req.params);

    const deletedMarker = await Marker.findByIdAndDelete(req.params._id);

    console.log("Module.exports 🌞deleteMarker", deletedMarker);

    if (!deletedMarker) return res.send({ success: false, errorId: 1 });

    res.send({ success: true });
  } catch (error) {
    console.log("Error delete 🌞marker", error.message);
    res.send({ success: false, error: error.message });
  }
};

export const searchMarker = async (req, res) => {
  try {
    console.log("---------------------------------- ");
    console.log("🌞~ marker search hello", req.body);

    const filter = {};

    if (req.body.address) {
      const regExp = new RegExp(req.body.address, "i");
      // console.log("🚀 ~ module.exports.search= ~ regExp", regExp)

      filter.address = regExp;
    }

    // if (req.body.minPrice > 0 || req.body.maxPrice > 0) {
    //   filter.price = {
    //     $gte: req.body.minPrice,
    //     $lte: req.body.maxPrice,
    //   };
    // }
    console.log("----------------------------");
    console.log("🚀 ~ module.exports.search= ~ filter", filter);

    const marker = await Marker.find(filter).select(" -__v");

    // const products = await Product.find({
    //     name: regExp,
    //     price: {
    //         $gte: req.body.minPrice,
    //         $lte: req.body.maxPrice
    //     }

    // })
    console.log("🌞~ module.exports.search= ~ marker", marker);

    res.send({ success: true, marker });
  } catch (error) {
    console.log("🌞~ marker search error", error.message);

    res.send({ success: false, error: error.message });
  }
};
