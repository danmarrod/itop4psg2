swal({
  text: "An itop RESTAPI query test",
  content: "input",
  button: {
    text: "Search!",
    closeModal: false,
  },
})
  .then(() => {
    return fetch(
      `http://localhost/webservices/rest.php?version=1.3&&json_data={
       "operation": "core/get",
       "class": "Person",
       "key": "SELECT Person WHERE email LIKE '%.com'",
       "output_fields": "friendlyname, email" }`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Basic admin:admin",
        },
      }
    );
  })
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    //const query = JSON.stringify(json.objects);
    const query = console.log(json);
    if (!query) {
      return swal("No query results!");
    }
    swal({
      title: "Top result:",
      text: query,
    });
  })
  .catch((err) => {
    if (err) {
      swal("Oh noes!", "The AJAX request failed!", "error");
    } else {
      swal.stopLoading();
      swal.close();
    }
  });


Swal.fire({
  icon: "question",
  title: "Coste de los servicios de la organización x",
  input: "text",
  inputAttributes: {
    autocapitalize: "off",
  },
  showCancelButton: true,
  confirmButtonText: "Buscar",
  showLoaderOnConfirm: true,
  preConfirm: (org) => {
    const dl_organization = window.dataLayer[1].organization;
    if (!org) org = dl_organization;
    return fetch(
      `http://localhost/webservices/rest.php?version=1.3&&json_data={ 
      "operation": "core/get", 
      "class": "CustomerContract", 
      "key": "SELECT CustomerContract AS c WHERE c.organization_name LIKE '%${org}%' AND c.cost > 0", 
      "output_fields": "name, organization_name, cost" }`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Basic admin:admin",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .catch((error) => {
        Swal.showValidationMessage(`Request failed: ${error}`);
      });
  },
  allowOutsideClick: () => !Swal.isLoading(),
}).then((result) => {
  console.log(result);
  if (result.isConfirmed) {
    let total_cost = 0;
    //console.log(result.value.objects["CustomerContract::2"].fields.cost);
    for (const obj in result.value.objects) {
      total_cost += parseFloat(result.value.objects[obj].fields.cost);
    }
    Swal.fire({
      icon: "success",
      title: `COSTE TOTAL: ${total_cost.toFixed(2)} €`,
    });
  }
});

await Swal.fire({
  title: "Top drawer 👋",
  position: "top",
  confirmButtonText: "CONSULTA 1",
  cancelButtonText: "CONSULTA 2",
  showClass: {
    popup: `
      animate__animated
      animate__fadeInDown
      animate__faster
    `,
  },
  hideClass: {
    popup: `
      animate__animated
      animate__fadeOutUp
      animate__faster
    `,
  },
  grow: "row",
  showConfirmButton: true,
  showCloseButton: true,
});
