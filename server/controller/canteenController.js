const CanteenItem = require('../model/CanteenItem');  // Canteen item schema
const fs = require('fs'); // To handle file system operations for deleting the old image

// Add a new canteen item with image upload
exports.addCanteenItem = async (req, res) => {
  const { name, price, cookingTime, description,day } = req.body;
console.log(req.file,req.body,"file")
  // Check if image was uploaded
  if (!req.file) {
    return res.status(400).json({ error: 'Image upload is required' });
  }
 
  try {
    // Store only the relative path for the image URL
    const imageUrl = `/uploads/${req.file.filename}`;

    const newItem = new CanteenItem({
      name,
      price,
      cookingTime,
      description,
      day,
      imageUrl,  // Store the relative path to the image
      adminId: req.user.id,
    });

    await newItem.save();
    res.status(201).json({ message: 'Item added successfully', newItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


// Update a canteen item with optional image update
exports.updateCanteenItem = async (req, res) => {
  const { itemId } = req.params;
  const { name, price, cookingTime, description } = req.body;

  try {
    // Find the existing item
    const item = await CanteenItem.findById(itemId);
    console.log(item,req.user.id,"from canteen update")
    if (!item || item.adminId.toString() !== req.user.id) {
      return res.status(404).json({ error: 'Item not found or unauthorized' });
    }

    // Update fields only if provided in the request body
    item.name = name || item.name;
    item.price = price || item.price;
    item.cookingTime = cookingTime || item.cookingTime;
    item.description = description || item.description;

    // Check if a new image was uploaded
    if (req.file) {
      // Delete the old image file if a new image is uploaded
      const oldImagePath = path.join(__dirname, '..', item.imageUrl); // Convert relative path to absolute path

      if (item.imageUrl && fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }

      // Update the image URL with the new image's relative path
      item.imageUrl = `/uploads/${req.file.filename}`;
    }

    // Save the updated item
    await item.save();
    res.status(200).json({ message: 'Item updated successfully', item });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete a canteen item
exports.deleteCanteenItem = async (req, res) => {
  const { itemId } = req.params;

  try {
    const item = await CanteenItem.findById(itemId);
    if (!item || item.adminId.toString() !== req.user.id) {
      return res.status(404).json({ error: 'Item not found or unauthorized' });
    }

    await item.deleteOne();
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


exports.AllItems = async (req, res) => {
const adminId=req.query.adminId || req.body.adminId;
// console.log(adminId,"admin id")
  try {
    const item = await CanteenItem.find({adminId:adminId});
    console.log(item,"item data",adminId)

    res.status(200).json({ message: 'Item get successfully',item });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}; 


