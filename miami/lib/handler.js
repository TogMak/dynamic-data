const fs = require('fs');
const path = require('path');

// Include the navigation data
let navigation = require("../data/navigation.json");

// Helper function to read email list safely
const getEmailList = () => {
    try {
        const data = fs.readFileSync(path.join(__dirname, '../data/emails.json'), 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading emails.json:", err);
        return { users: [] }; // Return an empty list if file doesn't exist or has an error
    }
};

// Save email list back to file
const saveEmailList = (data) => {
    try {
        fs.writeFileSync(path.join(__dirname, '../data/emails.json'), JSON.stringify(data, null, 2), 'utf8');
    } catch (err) {
        console.error("Error writing to emails.json:", err);
    }
};

// 📌 Render the signup form
exports.newsletterSignup = (req, res) => {
    res.render('newsletter-signup', { csrf: 'supersecret', nav: navigation });
};

// 📌 Process form submission
exports.newsletterSignupProcess = (req, res) => {
    console.log("Received form data:", req.body);

    let eList = getEmailList(); // Load fresh data

    // Ensure required fields exist
    if (!req.body.email) {
        console.error("Error: Missing email field");
        return res.status(400).send("Invalid request, missing email.");
    }

    eList.users.push(req.body); // Add new user

    saveEmailList(eList); // Save updated list

    console.log("User added successfully:", req.body);
    res.redirect(303, '/newsletter/list');
};

// 📌 Show all newsletter signups
exports.newsletterSignupList = (req, res) => {
    let eList = getEmailList();

    console.log("Loaded user list:", eList);
    res.render('userspage', { users: eList.users, nav: navigation });
};

// 📌 Show details for a specific user by email
exports.newsletterUser = (req, res) => {
    let eList = getEmailList();
    let userDetails = eList.users.filter(user => user.email === req.params.email);

    console.log("User details:", userDetails);
    res.render('userdetails', { users: userDetails, nav: navigation });
};

// 📌 Delete a user by email
exports.newsletterUserDelete = (req, res) => {
    let eList = getEmailList();
    let filteredUsers = eList.users.filter(user => user.email !== req.params.email);

    console.log("Deleting user:", req.params.email);
    
    saveEmailList({ users: filteredUsers });

    res.redirect(303, '/newsletter/list');
};

//Code that I might need to implement
// delete require.cache[require.resolve("../data/emails.json")];