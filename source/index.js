import { fillBooksTable, populatePublisherSelect } from "./books.js";
import { request } from "./http.js";
import { Cookies } from "./cookies.js";

const homePage = document.getElementById("home__page");

const booksPage = document.getElementById("books__page");

const usersPage = document.getElementById("users__page");

const homeLink = document.getElementById("home__page__link");

const booksLink = document.getElementById("books__page__link");

const usersLink = document.getElementById("users__page__link");

document.addEventListener("DOMContentLoaded", () => {
  populatePublisherSelect("editBookPublisher");

  populatePublisherSelect("newBookPublisher");

  if (!Cookies.contains("session")) {
    usersLink.innerHTML = "Sign up";

    booksLink.style.display = "none";

    return;
  }

  usersLink.innerHTML = "Logout";

  usersLink.addEventListener("click", () => {
      request("POST", "/logout", {}, true)
        .then(response => {

          if (response.code !== 200) {
            return;
          }

          Cookies.remove("session");

          booksLink.style.display = "block";

          showBooksPage();
      });
    });
});

const hideHomePage = () => {
  homePage.className = "";

  homePage.style.display = "none";
};

document.getElementById("callToAction").addEventListener("click", () => {
  hideHomePage();

  booksPage.style.display = "none";

  usersPage.style.display = "block";

  updateActiveLink(usersLink);
});

homeLink.addEventListener("click", () => {
  showHomePage();
});

booksLink.addEventListener("click", async () => {
  showBooksPage()
});

usersLink.addEventListener("click", () => {
  hideHomePage();

  booksPage.style.display = "none";

  usersPage.style.display = "block";

  updateActiveLink(usersLink);
});

const showHomePage = () => {
  homePage.classList.add(
    "container-fluid",
    "vh-100",
    "d-flex",
    "justify-content-center",
    "align-items-center"
  );

  homePage.style.display = "block";

  booksPage.style.display = "none";

  usersPage.style.display = "none";

  updateActiveLink(homeLink);
};

const showBooksPage = async () => {
  const response = await request("GET", "/books", {}, Cookies.contains("session"));

  if (response === null || response.code !== 200) {
    return;
  }

  const books = response.payload;

  if (books.length === 0) {
    document.getElementsByTagName("table")[0].style.display = "none";
  } else {
    booksPage.querySelector("div:first-of-type").style.display = "none";

    fillBooksTable(books, document.querySelector("tbody"));
  }

  hideHomePage();

  booksPage.style.display = "block";

  usersPage.style.display = "none";

  updateActiveLink(booksLink);
};

const updateActiveLink = (activeLink) => {
  [homeLink, booksLink, usersLink].forEach((link) => link.classList.remove("active"));

  activeLink.classList.add("active");
};

document.getElementById("saveChanges").addEventListener("click", () => {
  const body = getBookDetails("edit");

  bootstrap.Modal.getInstance(document.getElementById("editModal")).hide();

  request("PUT", "/books", body, Cookies.contains("session")).then(
    response => {
      window.location.refresh();
    }
  );
});

document.getElementById("saveNewBook").addEventListener("click", () => {
  const body = getBookDetails("new");

  bootstrap.Modal.getInstance(document.getElementById("newBookModal")).hide();

  request("POST", "/books", body, Cookies.contains("session"))
    .then(response => {
    if (response.code === 201) {
      showBooksPage();
    }
  });
});

const getBookDetails = (prefix) => {
  const name = document.getElementById(`${prefix}BookName`).value;

  const select = document.getElementById(`${prefix}BookPublisher`);

  const publisher = select.options[select.selectedIndex].text;

  const coverPrice = document.getElementById(`${prefix}BookCoverPrice`).value;

  const publishedAt = document.getElementById(`${prefix}BookPublishedAt`).value;

  return { name, publisher, coverPrice, publishedAt };
};

const loginForm = document.getElementById("login-form");

const signupForm = document.getElementById("signup-form");

loginForm.querySelector("button:last-of-type").addEventListener("click", () => {
  toggleForms(loginForm, signupForm);
});

signupForm.querySelector("button:last-of-type").addEventListener("click", () => {
  toggleForms(signupForm, loginForm);
});

const toggleForms = (hideForm, showForm) => {
  hideForm.style.display = "none";

  showForm.style.display = "block";
};

document.getElementById("loginButton").addEventListener("click", () => {
  const body = getAuthDetails("login");

  request("POST", "/login", body)
    .then(response => {
      if (response.code !== 200) {
        return;
      }

      Cookies.add("session", JSON.stringify(response.payload));

      booksLink.style.display = "block";

      showBooksPage();

      usersLink.innerHTML = "Logout";

      usersLink.addEventListener("click", () => {
        request("POST", "/logout", {}, Cookies.contains("session"))
          .then(response => {
            if (response.code !== 200) {
              return;
            }

          Cookies.remove("session");

          booksLink.style.display = "none";

          showBooksPage();
      });
    });
  });
});

document.getElementById("signupButton").addEventListener("click", () => {
  const body = getAuthDetails("signup");

  request("POST", "/users", body).then(response => {
    if (response.code === 201) {
      toggleForms(signupForm, loginForm);
    }
  });
});

const getAuthDetails = (prefix) => {
  const username = document.getElementById(`${prefix}Username`).value;

  const password = document.getElementById(`${prefix}Password`).value;

  const email = prefix === "signup" ? document.getElementById("signupEmail").value : undefined;

  return email ? { username, email, password } : { username, password };
};

/*
request("POST", "/books", {
  name: "Amazing Spider-Man",
  publisher: "Panini",
  coverPrice: 45.00,
  publishedAt: "2022-07-27",
  description: ""
}, Cookies.contains("session")).then(console.log);
*/

request("GET", "/users").then(console.log)
