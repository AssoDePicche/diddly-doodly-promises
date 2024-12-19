export const publishers = [
  "Panini",
  "Pipoca & Nanquim",
  "JBC",
  "Devir",
  "Companhia das Letras",
  "HarperCollins",
  "Arqueiro",
  "Intrinseca",
  "Darkside",
  "Antofágica",
  "Principis"
];

export const populatePublisherSelect = (id) => {
  const select = document.getElementById(id);

  select.innerHTML = "";

  const option = document.createElement("option");

  option.textContent = "Select a Publisher";

  option.value = "";

  option.selected = true;

  option.disabled = true;

  select.appendChild(option);

  publishers.forEach((publisher, index) => {
    const option = document.createElement("option");

    option.value = index + 1;

    option.textContent = publisher;

    select.appendChild(option);
  });
}

export const fillBooksTable = async (books, table) => {
  books.forEach((book, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
    <th scope="row">${index + 1}</th>
    <td>${book.name || "NULL"}</td>
    <td>${book.publisher || "NULL"}</td>
    <td>${book.coverPrice || "NULL"}</td>
    <td>
      <button class="btn btn-sm btn-outline-primary edit-btn"
        data-bs-toggle="modal"
        data-bs-target="#editModal"
        data-index="${index}">
        <i class="bi bi-three-dots"></i
      </button>
    </td>
    `;

    table.appendChild(row);
  });

  const buttons = document.querySelectorAll(".edit-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const book = books[event.currentTarget.getAttribute("data-index")];

      document.getElementById("editBookName").value = book.name || "NULL";

      document.getElementById("editBookPublisher").selectedIndex = publishers.indexOf(book.publisher) + 1;

      document.getElementById("editBookCoverPrice").value = book.coverPrice || 0.00;

      document.getElementById("editBookPublishedAt").value = book.publishedAt || "1970-01-01";

      document.getElementById("editBookDescription").value = book.description || "No description given";
    });
  });
};
