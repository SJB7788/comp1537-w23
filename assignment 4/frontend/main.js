const setup = () => {
  console.log("setup");
  $(".name-btn").click(() => {
    const query = {
      type: "nameSearch",
      name: $("#uni-name").val(),
    };

    axios.post("http://localhost:3000/search", query);
  });
};

$(document).ready(setup);
