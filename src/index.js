
const guestForm = document.getElementById('guest-form');
const guestNameInput = document.getElementById('guest-name-input');
const guestList = document.getElementById('guest-list');
const messageBox = document.getElementById('message-box');
const messageContent = document.getElementById('message-content');

const MAX_GUESTS = 10;

function showMessage(message, type = 'warning') {
    messageContent.textContent = message;
    messageBox.classList.remove('hidden');

    messageBox.classList.remove('bg-yellow-100', 'border-yellow-400', 'text-yellow-700', 'bg-green-100', 'border-green-400', 'text-green-700', 'bg-red-100', 'border-red-400', 'text-red-700');
    if (type === 'warning') {
        messageBox.classList.add('bg-yellow-100', 'border-yellow-400', 'text-yellow-700');
    } else if (type === 'success') {
        messageBox.classList.add('bg-green-100', 'border-green-400', 'text-green-700');
    } else if (type === 'error') {
        messageBox.classList.add('bg-red-100', 'border-red-400', 'text-red-700');
    }

    setTimeout(() => {
        messageBox.classList.add('hidden');
    }, 3000);
}

// Function to create a new guest list item with RSVP toggle functionality
function createGuestListItem(name) {
    const listItem = document.createElement('li');
    listItem.className = 'flex items-center justify-between bg-gray-50 p-4 rounded-md shadow-sm border border-gray-200';

    // A container for the guest's name and RSVP status
    const detailsContainer = document.createElement('div');
    detailsContainer.className = 'flex items-center flex-grow';

    const guestNameSpan = document.createElement('span');
    guestNameSpan.textContent = name;
    guestNameSpan.className = 'text-gray-800 font-medium text-lg mr-4';

    // This span will show "Attending" or "Not Attending"
    const rsvpStatusSpan = document.createElement('span');
    rsvpStatusSpan.textContent = '(Not Attending)'; // Start as "Not Attending"
    rsvpStatusSpan.className = 'text-red-600 font-semibold text-sm'; // Red color for "Not Attending"

    // We'll store the RSVP status directly on the list item using a "data attribute"
    listItem.dataset.rsvpStatus = 'not-attending'; // 'attending' or 'not-attending'

    detailsContainer.appendChild(guestNameSpan);
    detailsContainer.appendChild(rsvpStatusSpan);

    // A container for our buttons
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'flex space-x-2'; // Adds space between the buttons

    // The "Toggle RSVP" button
    const toggleRsvpButton = document.createElement('button');
    toggleRsvpButton.textContent = 'Toggle RSVP';
    toggleRsvpButton.className = 'bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50';

    toggleRsvpButton.addEventListener('click', function() {
        // If current status is 'not-attending', change to 'attending'
        if (listItem.dataset.rsvpStatus === 'not-attending') {
            listItem.dataset.rsvpStatus = 'attending';
            rsvpStatusSpan.textContent = '(Attending)';
            rsvpStatusSpan.classList.remove('text-red-600'); // Remove red
            rsvpStatusSpan.classList.add('text-green-600'); // Add green
            showMessage(`"${name}" is now Attending.`, 'success');
        } else { // Otherwise, change to 'not-attending'
            listItem.dataset.rsvpStatus = 'not-attending';
            rsvpStatusSpan.textContent = '(Not Attending)';
            rsvpStatusSpan.classList.remove('text-green-600'); // Remove green
            rsvpStatusSpan.classList.add('text-red-600'); // Add red
            showMessage(`"${name}" is now Not Attending.`, 'warning');
        }
        console.log(`Toggled RSVP for ${name} to ${listItem.dataset.rsvpStatus}`);
    });

    // The "Remove" button (same as before)
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.className = 'bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50';

    removeButton.addEventListener('click', function() {
        guestList.removeChild(listItem);
        showMessage(`"${name}" removed from list.`, 'success');
        console.log(`Removed guest: ${name}`);
    });

    buttonsContainer.appendChild(toggleRsvpButton); // Add toggle button to button container
    buttonsContainer.appendChild(removeButton);    // Add remove button to button container

    listItem.appendChild(detailsContainer); // Add name and status to list item
    listItem.appendChild(buttonsContainer); // Add buttons to list item

    return listItem;
}


// We "listen" for the form to be submitted
guestForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Stop page reload

    const guestName = guestNameInput.value.trim();

    if (!guestName) {
        showMessage('Please enter a guest name.', 'warning');
        return;
    }

    if (guestList.children.length >= MAX_GUESTS) {
        showMessage(`Guest list is full! Maximum ${MAX_GUESTS} guests allowed.`, 'error');
        guestNameInput.value = '';
        return;
    }

    const newGuestItem = createGuestListItem(guestName);
    guestList.appendChild(newGuestItem);
    guestNameInput.value = '';

    showMessage(`"${guestName}" added!`, 'success');
    console.log(`Added guest: ${guestName}`);
});

console.log('Guest list application now includes RSVP toggle functionality!');
