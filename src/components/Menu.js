import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, CardMedia, Typography, Grid, Button, TextField } from "@mui/material";

const Menu = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [editingId, setEditingId] = useState(null); // Track which item is being edited
  const [editedPrice, setEditedPrice] = useState(""); // Track edited price

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=") // Fetch food data
      .then((response) => response.json())
      .then((data) => {
        if (data.meals) {
          const formattedItems = data.meals.slice(1, 21).map((meal, index) => ({
            id: meal.idMeal,
            name: meal.strMeal,
            price: Math.floor(Math.random() * 300) + 100, // Random price
            image: meal.strMealThumb,
          }));
          setFoodItems(formattedItems);
        }
      })
      .catch((error) => console.error("Error fetching food items:", error));
  }, []);

  // Handle Delete
  const handleDelete = (id) => {
    setFoodItems(foodItems.filter((item) => item.id !== id));
  };

  // Handle Edit Click
  const handleEditClick = (id, currentPrice) => {
    setEditingId(id);
    setEditedPrice(currentPrice);
  };

  // Handle Image Change
  const handleImageChange = (event, id) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFoodItems((prevItems) =>
          prevItems.map((item) => (item.id === id ? { ...item, image: reader.result } : item))
        );
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Price Change
  const handlePriceChange = (event) => {
    setEditedPrice(event.target.value);
  };

  // Handle Save
  const handleSave = (id) => {
    setFoodItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, price: editedPrice } : item))
    );
    setEditingId(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ textAlign: "center", mb: 3 }}>
        Menu
      </Typography>
      <Grid container spacing={3}>
        {foodItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <Card>
              <CardMedia component="img" height="200" image={item.image} alt={item.name} />
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>

                {editingId === item.id ? (
                  <>
                    {/* Edit Price */}
                    <TextField
                      label="Price"
                      type="number"
                      value={editedPrice}
                      onChange={handlePriceChange}
                      fullWidth
                      sx={{ mb: 1 }}
                    />

                    {/* Edit Image */}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, item.id)}
                      style={{ display: "none" }}
                      id={`file-input-${item.id}`}
                    />
                    <label htmlFor={`file-input-${item.id}`}>
                      <Button component="span" color="primary" sx={{ mb: 1 }}>
                        Upload Image
                      </Button>
                    </label>

                    {/* Save Button */}
                    <Button color="success" onClick={() => handleSave(item.id)}>
                      Save
                    </Button>
                  </>
                ) : (
                  <>
                    <Typography variant="body2">Price: ₹{item.price}</Typography>

                    {/* Edit Button */}
                    <Button color="primary" sx={{ mt: 1, mr: 1 }} onClick={() => handleEditClick(item.id, item.price)}>
                      Edit
                    </Button>

                    {/* Delete Button */}
                    <Button color="error" sx={{ mt: 1 }} onClick={() => handleDelete(item.id)}>
                      Delete
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Menu;
