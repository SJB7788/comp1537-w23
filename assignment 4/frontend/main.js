const setup = () => {
  console.log('setup');
  $('.name-btn').click(async () => {
    const query = {
      type: 'nameSearch',
      name: $('#uni-name').val(),
      projectionFilters: {
        name: true,
        weight: false,
      },
    };

    const res = await axios.post('http://localhost:3000/search', query);
    $('.result').empty();
    $('.result').html(JSON.stringify(res.data));
  });
};

$(document).ready(setup);
