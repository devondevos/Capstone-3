// Import necessary modules
import express from "express";
import bodyParser from "body-parser";

// Create an Express application
const app = express();
const PORT = 3000;

// Configure middleware for handling URL-encoded form data
app.use(bodyParser.urlencoded({ extended:true }));

// Set the 'views' directory and the view engine to EJS
app.set('views', 'views');
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Array to store todo items
let todoArray = [];

// Handle PUT requests to '/editItem' endpoint
app.put('/editItem', (req, res) => {
    const indexToEdit = req.body.index;
    const updatedItem = req.body.updatedItem;

    // Ensure the index is valid
    if (indexToEdit >= 0 && indexToEdit < todoArray.length) {
        // Update the todoArray on the server side
        todoArray[indexToEdit] = updatedItem;

        // Send a JSON response with the updated todoArray to the UI
        res.json({ values: todoArray });
    }
});

// Handle POST requests to '/form' endpoint
app.post('/form', (req, res) => {
    // Retrieve the value of the 'listItem' field from the form
    const item = req.body.listItem;

    // Add the item to the todoArray
    todoArray.push(item);

    // Send a JSON response with the updated todoArray to the client
    res.json({ values: todoArray });
});

// Handle DELETE requests to '/removeItem' endpoint
app.delete('/removeItem', (req, res) => {
    // Retrieve the index of the item to be removed from the request body
    const indexToRemove = req.body.index;

    // Remove the item from the todoArray if the index is valid
    if (indexToRemove >= 0 && indexToRemove < todoArray.length) {
        todoArray.splice(indexToRemove, 1);
    }

    // Send a JSON response with the updated todoArray to the client
    res.json({ values: todoArray });
});

// Handle GET requests to the root ('/') endpoint
app.get('/', (req, res) => {
    // Render the 'index' view and pass the todoArray as a parameter
    res.render('index', { todoArray });
});

// Handle GET requests to '/contact' endpoint
app.get('/contact', (req, res) => {
    // Render the 'contact' view
    res.render('contact');
});

// Handle GET requests to '/about' endpoint
app.get('/about', (req, res) => {
    // Render the 'about' view
    res.render('about');
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

/*

1. Express Setup: Creates an Express application, configures middleware for handling form data, sets the view engine to EJS, and serves static files.
2. todoArray: An array to store todo items.
3. PUT /editItem: Handles requests to edit an item. Updates todoArray based on the provided index and sends the updated array as a JSON response.
4. POST /form: Handles form submissions. Adds the submitted item to todoArray and sends the updated array as a JSON response.
5. DELETE /removeItem: Handles requests to remove an item. Removes the item from todoArray based on the provided index and sends the updated array as a JSON response.
6. GET /: Renders the 'index' view and passes todoArray as a parameter.
7. GET /contact, /about: Renders the 'contact' and 'about' views, respectively.
8. Server Start: Starts the server and listens on the specified port.

*/