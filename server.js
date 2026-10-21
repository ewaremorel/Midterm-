/**
 * Midterm API Project - COMP229
 * Implement the six equipment API endpoints described in README.md.
 * Use the array index as the ID: index 0 is the first equipment item.
 * Add exactly two personalized items to the five supplied below.
 */
import express from 'express';

const app = express();
app.use(express.json());

let equipment = [
  { name: 'USB Microphone', category: 'audio', brand: 'AudioLab', year: 2021, quantity: 5 },
  { name: 'LED Panel', category: 'lighting', brand: 'BrightWorks', year: 2022, quantity: 4 },
  { name: 'Network Switch', category: 'networking', brand: 'NetCore', year: 2020, quantity: 3 },
  { name: 'Cable Tester', category: 'tools', brand: 'TestPro', year: 2019, quantity: 6 },
  { name: 'Studio Headphones', category: 'audio', brand: 'SoundCraft', year: 2023, quantity: 8 },

    // Two personalized portable items for my student ID 301559258
  { name: 'Portable Bluetooth Speaker', category: 'audio', brand: 'SoundWave', year: 2024, quantity: 3 },
  { name: 'Portable SSD', category: 'storage', brand: 'DataDrive', year: 2023, quantity: 6 }
];

app.get('/api/equipment', (req, res) => {

  // check whether the array is empty and return 404 if it is.
  if (equipment.length === 0) {
    res.status(404).send('No equipment found');
  } else {
    res.status(200).json(equipment);
  }
});

// Keep the filter route before /:id.
app.get('/api/equipment/filter', (req, res) => {
  
  const category = req.query.category;
  if (!category) {
    res.status(400).send('Category query parameter is required');
    return;
  }
  const filteredEquipment = equipment.filter(item => item.category === category);
  if (filteredEquipment.length === 0) {
    res.status(404).send(`No equipment found for category: ${category}`);
  } else {
    res.status(200).json(filteredEquipment);
  }
});

app.get('/api/equipment/:id', (req, res) => {
  
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 0 || id >= equipment.length) {
    res.status(404).send(`Equipment with ID ${id} not found`);
  } else {
    res.status(200).json(equipment[id]);
  }
});

app.post('/api/equipment', (req, res) => {
 const newItem = req.body;
  // Validate the new item
  if (!newItem.name || !newItem.category || !newItem.brand || !newItem.year || !newItem.quantity) {
    res.status(400).send('All fields (name, category, brand, year, quantity) are required');
    return;
  }
  equipment.push(newItem);
  res.status(201).json({
    message: 'Equipment added successfully.',
    equipment: newItem });
});

app.put('/api/equipment/:id', (req, res) => {
  const id = Number(req.params.id);
  if (id >= equipment.length || id < 0) {
    return res.status(404).send(`Equipment with ID ${id} not found`);
  }
  const updatedItem = req.body;
  // Validate the updated item
  if (!updatedItem.name || !updatedItem.category || !updatedItem.brand || !updatedItem.year || !updatedItem.quantity) {
    return res.status(400).send('All fields (name, category, brand, year, quantity) are required');
  }
  equipment[id] = updatedItem;
  res.status(200).json({
    message: 'Equipment updated successfully.',
    equipment: updatedItem
  });
});

app.delete('/api/equipment/:id', (req, res) => {
  const id = Number(req.params.id);
  if (id >= equipment.length || id < 0) {
    return res.status(404).send(`Equipment with ID ${id} not found`);
  }
  equipment.splice(id, 1);
  res.status(200).json({
    message: 'Equipment deleted successfully.'
  });
});
 

const PORT = process.env.PORT || 3000;
app.listen(PORT, '127.0.0.1', err => {
  if (err) {
    console.error(`Cannot start on port ${PORT}: ${err.message}`);
    process.exitCode = 1;
    return;
  }
  console.log(`Server is running on http://localhost:${PORT}`);
});
