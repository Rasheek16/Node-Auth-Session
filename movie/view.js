export function render(movies) {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Movie List</title>
    <link rel="stylesheet" href="style.css"/>
</head>
<body>
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Title</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        ${movies
          .map(
            (movie) => `<tr>
                        <td>${movie.id}</td>
                        <td>${movie.title}</td>
                        <td><a href="/movie/delete/${movie.id}">Delete</a></td>
                        <td><a href="/movie/form/${movie.id}">edit</a></td>
                      </tr>`
          )
          .join("")}
      </tbody>
    </table>
    <a href="/movie/form">new</a>
</body>
</html>
`;
}
