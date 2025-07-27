const hisaabModel = require("../models/hisaabModel.js");
const userModel = require("../models/userModel.js");

// module.exports.createHisaabController = async function (req, res) {
//   let { title, description, encrypted, shareable, passcode, editpermissions } = req.body;
// console.log('received hissab body: ',req.body)
//   encrypted = encrypted === 'on' || encrypted === true;
//   shareable = shareable === 'on' || shareable === true;
//   editpermissions = editpermissions === 'on' || editpermissions === true;

//   try {
//     const hisaab = await hisaabModel.create({
//       title,
//       description,
//       encrypted,
//       shareable,
//       passcode,
//       editpermissions,
//       user: req.user._id,
//     });

//     const user = await userModel.findOne({ email: req.user.email });
//     user.hisaabs.push(hisaab._id);
//     await user.save();

//     return res.status(201).json({ message: "Hisaab created successfully", hisaab });
//   } catch (err) {
//     return res.status(500).json({ error: err.message });
//   }
// };


// module.exports.createHisaabController = async function (req, res) {
//   try {
//     const {
//       title,
//       description,
//       encrypted = false,
//       shareable = false,
//       passcode = "",
//       editpermissions = false,
//     } = req.body;

//     console.log("Received hisaab body:", req.body);

//     const hisaab = await hisaabModel.create({
//       title,
//       description,
//       encrypted: Boolean(encrypted),
//       shareable: Boolean(shareable),
//       passcode,
//       editpermissions: Boolean(editpermissions),
//       user: req.user._id,
//     });

//     const user = await userModel.findOne({ email: req.user.email });
//     user.hisaabs.push(hisaab._id);
//     await user.save();

//     return res.status(201).json({
//       message: "Hisaab created successfully",
//       hisaab,
//     });
//   } catch (err) {
//     return res.status(500).json({ error: err.message });
//   }
// };

module.exports.createHisaabController = async function (req, res) {
  try {
    const {
      title,
      description,
      encrypted = false,
      shareable = false,
      passcode = "",
      editpermissions = false,
      amount = 0, // <-- Added default value for amount
    } = req.body;

    console.log("Received hisaab body:", req.body);

    const hisaab = await hisaabModel.create({
      title,
      description,
      encrypted: Boolean(encrypted),
      shareable: Boolean(shareable),
      passcode,
      editpermissions: Boolean(editpermissions),
      amount: Number(amount), // <-- Save amount
      user: req.user._id,
    });

    const user = await userModel.findOne({ email: req.user.email });
    user.hisaabs.push(hisaab._id);
    await user.save();

    return res.status(201).json({
      message: "Hisaab created successfully",
      hisaab,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


module.exports.readHisaabController = async function (req, res) {
  const id = req.params.id;

  try {
    const hisaab = await hisaabModel.findById(id);

    if (!hisaab) return res.status(404).json({ error: "Hisaab not found" });

    // If encrypted, don't send full data without passcode
    if (hisaab.encrypted) {
      return res.status(403).json({ requiresPasscode: true });
    }
console.log('hisaab mil gya')
    return res.status(200).json({ hisaab });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports.readVerifiedHisaabController = async function (req, res) {
  const id = req.params.id;
  const { passcode } = req.body;

  try {
    const hisaab = await hisaabModel.findById(id);
    if (!hisaab) return res.status(404).json({ error: "Hisaab not found" });

    if (hisaab.passcode !== passcode) {
      return res.status(403).json({ error: "Invalid passcode" });
    }

    console.log('verified hisaab mil gya')
    return res.status(200).json({ hisaab });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports.deleteController = async function (req, res) {
  const id = req.params.id;

  try {
    const hisaab = await hisaabModel.findById(id);
    if (!hisaab) return res.status(404).json({ error: "Hisaab not found" });

    await hisaabModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "Hisaab deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports.editHisaabController = async function (req, res) {
  const id = req.params.id;

  try {
    const hisaab = await hisaabModel.findById(id);
    if (!hisaab) return res.status(404).json({ error: "Hisaab not found" });

    return res.status(200).json({ hisaab });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// module.exports.editPostHisaabController = async function (req, res) {
//   const id = req.params.id;

//   try {
//     const hisaab = await hisaabModel.findById(id);
//     if (!hisaab) return res.status(404).json({ error: "Hisaab not found" });

//     hisaab.title = req.body.title;
//     hisaab.description = req.body.description;
//     hisaab.encrypted = req.body.encrypted === 'on' || req.body.encrypted === true;
//     hisaab.shareable = req.body.shareable === 'on' || req.body.shareable === true;
//     hisaab.passcode = req.body.passcode;
//     hisaab.editpermissions = req.body.editpermissions === 'on' || req.body.editpermissions === true;

//     await hisaab.save();

//     return res.status(200).json({ message: "Hisaab updated successfully", hisaab });
//   } catch (err) {
//     return res.status(500).json({ error: err.message });
//   }
// };

module.exports.editPostHisaabController = async function (req, res) {
  const id = req.params.id;

  try {
    const hisaab = await hisaabModel.findById(id);
    if (!hisaab) return res.status(404).json({ error: "Hisaab not found" });

    hisaab.title = req.body.title;
    hisaab.description = req.body.description;
    hisaab.amount = req.body.amount;  // <-- amount add kiya
    hisaab.encrypted = req.body.encrypted === 'on' || req.body.encrypted === true;
    hisaab.shareable = req.body.shareable === 'on' || req.body.shareable === true;
    hisaab.passcode = req.body.passcode;
    hisaab.editpermissions = req.body.editpermissions === 'on' || req.body.editpermissions === true;

    await hisaab.save();

    return res.status(200).json({ message: "Hisaab updated successfully", hisaab });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};



module.exports.readAllHisaabController = async(req,res)=>{
  try {
    const userId = req.user._id;

    const hisaabs = await hisaabModel.find({ user: userId });
    console.log(hisaabs)
    return res.status(200).json({ hisaabs });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}