import { refresh_every } from "./refresh.js";
import { fillBooksTable, populatePublisherSelect } from "./books.js";
import { request } from "./http.js";
import { Cookies } from "./cookies.js";

refresh_every(10);

const homePage = document.getElementById("home__page");
const booksPage = document.getElementById("books__page");
const usersPage = document.getElementById("users__page");

const homeLink = document.getElementById("home__page__link");
const booksLink = document.getElementById("books__page__link");
const usersLink = document.getElementById("users__page__link");

document.addEventListener("DOMContentLoaded", () => {
  populatePublisherSelect("editBookPublisher");
  populatePublisherSelect("newBookPublisher");

  if (Cookies.contains("session")) {
    usersLink.innerHTML = "Logout";
  } else {
    usersLink.innerHTML = "Sign up";
    booksLink.style.display = "none";
  }
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
  const books = await request("POST", "http://localhost:8080/books", {}, true);
  fillBooksTable(books, document.querySelector("tbody"));

  hideHomePage();
  booksPage.style.display = "block";
  usersPage.style.display = "none";
  updateActiveLink(booksLink);
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

const updateActiveLink = (activeLink) => {
  [homeLink, booksLink, usersLink].forEach((link) => link.classList.remove("active"));
  activeLink.classList.add("active");
};

document.getElementById("saveChanges").addEventListener("click", () => {
  const body = getBookDetails("edit");
  bootstrap.Modal.getInstance(document.getElementById("editModal")).hide();
});

document.getElementById("saveNewBook").addEventListener("click", () => {
  const body = getBookDetails("new");
  bootstrap.Modal.getInstance(document.getElementById("newBookModal")).hide();
});

const getBookDetails = (prefix) => {
  const name = document.getElementById(`${prefix}BookName`).value;
  const select = document.getElementById(`${prefix}BookPublisher`);
  const publisher = select.options[select.selectedIndex].text;
  const coverPrice = document.getElementById(`${prefix}BookCoverPrice`).value;
  const publishedAt = document.getElementById(`${prefix}BookPublishedAt`).value;
  const description = document.getElementById(`${prefix}BookDescription`).value;

  return { name, publisher, coverPrice, publishedAt, description };
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
  request("POST", "http://localhost:8081/login", body).then((response) => {});
});

document.getElementById("signupButton").addEventListener("click", () => {
  const body = getAuthDetails("signup");
  request("POST", "http://localhost:8081/users", body).then((response) => {});
});

const getAuthDetails = (prefix) => {
  const username = document.getElementById(`${prefix}Username`).value;
  const password = document.getElementById(`${prefix}Password`).value;
  const email = prefix === "signup" ? document.getElementById("signupEmail").value : undefined;

  return email ? { username, email, password } : { username, password };
};
