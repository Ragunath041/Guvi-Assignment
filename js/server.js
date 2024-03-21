const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017';

// Database Name
const dbName = 'user_profiles';

async function fetchProfileData() {
    try {
        // Create a new MongoClient
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        // Connect to the MongoDB server
        await client.connect();
        console.log('Connected to MongoDB');

        // Select the database
        const db = client.db(dbName);

        // Get the collection
        const collection = db.collection('profiles');

        // Query documents to fetch user profile data
        const queryResult = await collection.findOne({ /* add condition to match the user */ });
        console.log('Profile data:', queryResult);

        // Close the connection
        await client.close();

        // Return the fetched profile data
        return queryResult;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function updateProfileData(profileUpdates) {
    try {
        // Create a new MongoClient
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        // Connect to the MongoDB server
        await client.connect();
        console.log('Connected to MongoDB');

        // Select the database
        const db = client.db(dbName);

        // Get the collection
        const collection = db.collection('profiles');

        // Update the document with new profile data
        const updateResult = await collection.updateOne({ /* add condition to match the user */ }, { $set: profileUpdates });
        console.log('Modified count:', updateResult.modifiedCount);

        // Close the connection
        await client.close();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// Fetch profile data and populate on the profile page
async function populateProfilePage() {
    try {
        const profileData = await fetchProfileData();
        // Populate profile data on the profile page
        // For example:
        document.getElementById('name').textContent = profileData.name;
        document.getElementById('email').textContent = profileData.email;
        document.getElementById('dob').textContent = profileData.dob;
        document.getElementById('age').textContent = profileData.age;
        document.getElementById('gender').textContent = profileData.gender;
        document.getElementById('phone').textContent = profileData.phone;
    } catch (error) {
        console.error('Error:', error);
    }
}

// Call the function to populate profile data on page load
populateProfilePage();

// Function to handle profile updates
function handleProfileUpdate() {
    // Fetch updated profile data from the form
    const updatedProfile = {
        name: document.getElementById('nameInput').value,
        email: document.getElementById('emailInput').value,
        dob: document.getElementById('dobInput').value,
        age: document.getElementById('ageInput').value,
        gender: document.getElementById('genderInput').value,
        phone: document.getElementById('phoneInput').value
    };

    // Update profile data in MongoDB
    updateProfileData(updatedProfile)
        .then(() => {
            console.log('Profile updated successfully');
            // Optionally, update the profile data displayed on the profile page
            populateProfilePage();
        })
        .catch(error => {
            console.error('Error updating profile:', error);
            // Handle error
        });
}
