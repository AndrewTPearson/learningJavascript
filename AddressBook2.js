/* Known bugs:
1. Page reloads whenever you use the search bar, and the results therefore immediately disappear [FIXED]
2. If one clicks Search! with an empty string, the first contact and the Delete Contact button reappear. This is not intended, but I
feel that providing it is showing the same contact that is deleted, this is not an immense probelm.
3. If one displays a contact for whom the program does not have all details, a comma appears after "address". I am quite aware of why
this is happening, but my one attempt at fixing it created other problems. Ultimately does not seem like a massive problem.
4. The "I'm sorry I can't find that search result" text appears four times. [FIXED]
5. The validation to require names is not working, e.g. it is possible to enter empty contacts. This does not seem like a massive problem,
but would be good to fix.
*/

const listOfContacts = [];
let displayedContact = null;

class contact {
    constructor (firstName, surname, phoneNumber, addressLine1, addressLine2, postCode) {
        this._firstName = firstName,
        this._surname = surname,
        this._phoneNumber = phoneNumber,
        this._addressLine1 = addressLine1,
        this._addressLine2 = addressLine2,
        this._postCode = postCode
    }
    get firstName() {return this._firstName};
    get surname() {return this._surname};
    get phoneNumber() {return this._phoneNumber};
    get addressLine1() {return this._addressLine1};
    get addressLine2() {return this._addressLine2};
    get postCode() {return this._postCode};
}
function searchWithString(str) {
    let tempArray = listOfContacts.map(contact => { return contact.firstName.toLowerCase()} );
    let result = tempArray.findIndex(name => name.includes(str.toLowerCase()));
    if (result != -1) {return listOfContacts[result]};
    tempArray = listOfContacts.map(contact => { return contact.surname.toLowerCase() });
    result = tempArray.findIndex(name => name.includes(str.toLowerCase()));
    return listOfContacts[result];
}
function searchName(name) {
    let wantedContact = searchWithString(name);
    if (wantedContact) {
        displayContact(wantedContact);
    } else { const notFoundText = $('<p>');
    notFoundText.text("I'm sorry, we couldn't find that person among your contacts");
    notFoundText.css('color', 'red');
    notFoundText.addClass('unsuccessfulSearch');
    $("#searchArea").append(notFoundText);
    }
}
function deleteContact(contactForDeletion) {
    let temp = listOfContacts.findIndex((contact) => (contactForDeletion === contact));
    listOfContacts.splice(temp, 1);
    $(".contactDisplay").addClass('hide');
}
function submitNewContact(event) {
    // I have adapted the code below from code at https://stackoverflow.com/questions/67464598/html-forms-and-js-backend
    event.preventDefault();
    const tempFirstName = document.getElementById("firstName").value;
    const tempSurname = document.getElementById("surname").value;
    const tempPhoneNumber = document.getElementById("phoneNumber").value;
    const tempAddressLine1 = document.getElementById("addressLine1").value;
    const tempAddressLine2 = document.getElementById("addressLine2").value;
    const tempPostCode = document.getElementById("postCode").value;
    listOfContacts[listOfContacts.length] = new contact(tempFirstName, tempSurname, tempPhoneNumber, tempAddressLine1, tempAddressLine2, tempPostCode);
    updateContactsList();
}
function displayContact(contact) {
    displayedContact = contact;
    $(".contactDisplay").removeClass('hide');
    $("#displayName").text(contact.firstName + ' ' + contact.surname);
    $("#displayPhoneNumber").text('Telephone: ' + contact.phoneNumber);
    $("#displayAddress1").text('Address: ' + contact.addressLine1 + ', ' + contact.addressLine2);
    $("#displayPostCode").text('Post Code: ' + contact.postCode);
}
function updateContactsList() {
    $('#existingContactsList').empty();
    listOfContacts.forEach((contact) => {
        let temp = $('<li>');
        temp.addClass('addingContact');
        temp.text(contact.firstName + ' ' + contact.surname);        
        $('#existingContactsList').append(temp);
    })
    tempList = document.querySelectorAll(".addingContact");
    for (let i=0; i < tempList.length; i++) {
        tempList[i].addEventListener("click", function () {
            displayContact(listOfContacts[i])})
        }
    }
function hideDisplayedContact() {
    displayedContact = null;
    $(".contactDisplay").addClass('hide');
}
let newContactButton = document.querySelector("#showNewContactForm");
newContactButton.addEventListener("click", function() {
    let temp = $("#newContactForm");
    temp.removeClass('hide');
})
let deleteContactButton = document.querySelector(".deleteContactButton");
deleteContactButton.addEventListener("click", function() {
    if (displayedContact) {
        deleteContact(displayedContact);
        updateContactsList();
    }
});
let searchButton = document.querySelector(".searchButton");
searchButton.addEventListener('click', function() {
    deleteUnsuccessfulSearchMessages();
    hideDisplayedContact();
    searchName(document.getElementById('search').value);
});
function deleteUnsuccessfulSearchMessages() {
    $(".unsuccessfulSearch").remove();
}

updateContactsList();

// For testing purposes
listOfContacts[0] = Dummy = new contact('Dummy', 'MacDummyson', '3456', '1 Dumb Lane', 'Dumberwell', 'SE21');
listOfContacts[1] = Andrew = new contact('Andrew', 'Pearson', '0123', 'Lewisham', 'London', 'SE13');
listOfContacts[2] = Anu = new contact('Anuoluwapo', 'Oloruntola', '1234', 'Lee', 'London', 'SE12');
listOfContacts[3] = Chris = new contact('Christopher', "Pearson", '2345', 'Kings Norton', 'Birmingham', 'B30 1DL');
function addRob() {
    Rob = new contact('Robert', 'Oliver', '4567', 'Lewisham', 'London', 'SE13');
    listOfContacts.push(Rob);
    updateContactsList();
}
function addIfe() {
    Ife = new contact('Ifeoluwa', 'Oloruntola', '5678', 'Lewisham', 'London', 'SE14');
    listOfContacts.push(Ife);
    updateContactsList();
}
updateContactsList();