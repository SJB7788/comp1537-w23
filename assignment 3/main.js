const unicorns = [
  {
    _id: '641ca133e4f3738662cc5850',
    name: 'Horny',
    dob: '1992-03-13T15:47:00.000Z',
    loves: ['carrot', 'papaya'],
    weight: 600,
    gender: 'm',
    vampires: 63,
    vaccinated: true,
  },
  {
    _id: '641ca133e4f3738662cc5851',
    name: 'Aurora',
    dob: '1991-01-24T21:00:00.000Z',
    loves: ['carrot', 'grape', 'sugar'],
    weight: 450,
    gender: 'f',
    vampires: 43,
    vaccinated: true,
  },
  {
    _id: '641ca133e4f3738662cc5852',
    name: 'Unicrom',
    dob: '1973-02-10T06:10:00.000Z',
    loves: ['energon', 'redbull'],
    weight: 984,
    gender: 'm',
    vampires: 182,
    vaccinated: true,
  },
  {
    _id: '641ca133e4f3738662cc5853',
    name: 'Roooooodles',
    dob: '1979-08-19T01:44:00.000Z',
    loves: ['apple'],
    weight: 575,
    gender: 'm',
    vampires: 99,
    vaccinated: true,
  },
  {
    _id: '641ca133e4f3738662cc5854',
    name: 'Solnara',
    dob: '1985-07-04T09:01:00.000Z',
    loves: ['apple', 'carrot', 'chocolate'],
    weight: 550,
    gender: 'f',
    vampires: 80,
    vaccinated: true,
  },
  {
    _id: '641ca133e4f3738662cc5855',
    name: 'Ayna',
    dob: '1998-03-07T16:30:00.000Z',
    loves: ['strawberry', 'lemon'],
    weight: 733,
    gender: 'f',
    vampires: 40,
    vaccinated: true,
  },
  {
    _id: '641ca133e4f3738662cc5856',
    name: 'Kenny',
    dob: '1997-07-01T17:42:00.000Z',
    loves: ['grape', 'lemon'],
    weight: 690,
    gender: 'm',
    vampires: 39,
    vaccinated: true,
  },
  {
    _id: '641ca133e4f3738662cc5857',
    name: 'Raleigh',
    dob: '2005-05-03T07:57:00.000Z',
    loves: ['apple', 'sugar'],
    weight: 421,
    gender: 'm',
    vampires: 2,
    vaccinated: true,
  },
  {
    _id: '641ca133e4f3738662cc5858',
    name: 'Leia',
    dob: '2001-10-08T21:53:00.000Z',
    loves: ['apple', 'watermelon'],
    weight: 601,
    gender: 'f',
    vampires: 33,
    vaccinated: true,
  },
  {
    _id: '641ca133e4f3738662cc5859',
    name: 'Pilot',
    dob: '1997-03-01T13:03:00.000Z',
    loves: ['apple', 'watermelon'],
    weight: 650,
    gender: 'm',
    vampires: 61,
    vaccinated: true,
  },
];

const searchBtnClick = () => {
  console.log('hasdjsldk');
  unicorns.map((unicorn) => {
    if (
      unicorn.weight >= $('#searchWeightInput1').val() &&
      unicorn.weight <= $('#searchWeightInput2').val()
    ) {
      $('#searchResult').append(JSON.stringify(unicorn));
    }
  });
};

function setup() {
  console.log('setup');

  $('#searchBtn').click(searchBtnClick);
}

$(document).ready(setup());
