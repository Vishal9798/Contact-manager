
let contacts = [];

function renderContact(contact) {
  const list = document.querySelector(".Contact_list");

  if (contact.deleted) {
    const item = document.querySelector(`[data-key='${contact.id}']`);
    if (item) item.remove();
    return;
  }

  const node = document.createElement("article");
  node.className = "person";
  node.setAttribute("data-key", contact.id);

  node.innerHTML = `
    <img src="${contact.imageurl}">
    <div class="contactdetail">
    
      <h1><i class="fas fa-user-circle contactIcon"></i> ${contact.name}</h1>
      <p><i class="fas fa-envelope contactIcon"></i> ${contact.email}</p>
      <p><i class="fas fa-phone-alt contactIcon"></i> ${contact.contactnumber}</p>
    </div>
    <button class="delete-contact js-delete-contact">
      <svg fill="var(--svgcolor)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
      </svg>
    </button>
  `;

  const deleteButton = node.querySelector(".js-delete-contact");
  deleteButton.addEventListener("click", () => {
    deleteContact(contact.id);
  });

  list.appendChild(node);
}


const list = document.querySelector(".Contact_list");
list.addEventListener("click", (event) => {
  if (event.target.classList.contains("js-delete-contact")) {
    const itemKey = event.target.closest("article").dataset.key;
    deleteContact(itemKey);
  }
});


list.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && event.target.classList.contains("js-delete-contact")) {
    const itemKey = event.target.closest("[data-key]").dataset.key;
    deleteContact(itemKey);
  }
});

function deleteContact(key) {
  const index = contacts.findIndex((item) => item.id === Number(key));
  if (index !== -1) {
    const updatedContactObject = { deleted: true, ...contacts[index] };
    contacts.splice(index, 1);
    renderContact(updatedContactObject);
  }
}

function addContact(name, email, imageurl, contactnumber, id) {
  const contactObject = {
    name: name,
    email: email,
    imageurl: imageurl,
    contactnumber: contactnumber,
    id: id || Date.now(),
  };

  contacts.push(contactObject);
  renderContact(contactObject);
}

const form = document.querySelector(".js-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("myEmail").value;
  const imageurl = document.getElementById("imgurl").value;
  const contactNumber = document.getElementById("myTel").value;
  addContact(fullName, email, imageurl, contactNumber);
  form.reset();
});

document.addEventListener("DOMContentLoaded", () => {
  const storedContacts = localStorage.getItem("contacts");
  if (storedContacts) {
    contacts = JSON.parse(storedContacts);
    contacts.forEach((contact) => {
      renderContact(contact);
    });
  }
});
