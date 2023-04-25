const setup = () => {
  console.log("setup");
  $(".name-btn").click(async () => {
    let name_box;
    let weight_box;
    if ($('#uni-filter-name').is(':checked')) {
      name_box = true
    } else {name_box = false}
    if ($('#uni-filter-weight').is(':checked')) {
      weight_box = true
    } else {weight_box = false}
    const query = {
      type: "nameSearch",
      name: $("#uni-name").val(),
      projectionFilters: {
        name: name_box,
        weight: weight_box,
      },
    };
    // const res = await axios.post(
    //   "https://easy-hen-wrap.cyclic.app/search",
    //   query
    const res = await axios.post(
      "https://easy-hen-wrap.cyclic.app/search",
      query
    );
    $(".result").empty();
    $(".result").html(JSON.stringify(res.data));
  });

  $(".weight-btn").click(async () => {
    let name_box;
    let weight_box;
    if ($('#uni-filter-name').is(':checked')) {
      name_box = true
    } else {name_box = false}
    if ($('#uni-filter-weight').is(':checked')) {
      weight_box = true
    } else {weight_box = false}
    const query = {
      type: "weightSearch",
      min_weight: $("#uni-min-weight").val(),
      max_weight: $("#uni-max-weight").val(),
      projectionFilters: {
        name: name_box,
        weight: weight_box,
      },
    };
    const res = await axios.post(
      "https://easy-hen-wrap.cyclic.app/search",
      query
    );
    $(".result").empty();
    $(".result").html(JSON.stringify(res.data));
  });

  $(".food-btn").click(async () => {
    let name_box;
    let weight_box;
    if ($('#uni-filter-name').is(':checked')) {
      name_box = true
    } else {name_box = false}
    if ($('#uni-filter-weight').is(':checked')) {
      weight_box = true
    } else {weight_box = false}

    if ($('#uni-apple').is(':checked')) {
      apple = "apple"
    } else {
      apple = "definetly not in"
    }
    if ($('#uni-carrot').is(':checked')) {
      carrot = "carrot"
    } else {
      carrot = "definetly not in"
    }
    
    const query = {
      type: "foodSearch",
      food1 : apple,
      food2 : carrot,
      projectionFilters: {
        name: name_box,
        weight: weight_box,
      },
    };

    const res = await axios.post(
      "https://easy-hen-wrap.cyclic.app/search",
      query
    )
    $(".result").empty();
    $(".result").html(JSON.stringify(res.data));
  });
};

$(document).ready(setup);
