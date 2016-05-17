
import '../imports/api/rooms.js';
import '../imports/api/reservations.js';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

//https://github.com/themeteorchef/base/tree/v3.0.0/server/modules
Meteor.startup(() => {
  // code to run on server at startup
  // run populate database
if (Meteor.users.find().fetch().length === 0) {
    console.log("user created");
var _id =   Accounts.createUser({
        username: 'username',
        password: 'asdfasdf',
    });
    console.log(_id);
    Roles.setUserRoles( _id, 'admin' );
  };
});

/*
  let administrators = [
    {
      name: { first: 'Admin' },
      login: 'admin',
      email: 'azretali@mail.ru',
      password: 'admin'
    }
  ];

  let generateAccounts = () => {
    let fakeUserCount = 5,
        usersExist    = _checkIfAccountsExist( administrators.length + fakeUserCount );

    if ( !usersExist ) {
      _createUsers( administrators );
      _createUsers( _generateFakeUsers( fakeUserCount ) );
    }
  };

  let _checkIfAccountsExist = ( count ) => {
    let userCount = Meteor.users.find().count();
    return userCount < count ? false : true;
  };

  let _createUsers = ( users ) => {
    for ( let i = 0; i < users.length; i++ ) {
      let user       = users[ i ],
          userExists = _checkIfUserExists( user.email );

        if ( !userExists ) {
          let userId  = _createUser( user ),
              isAdmin = _checkIfAdmin( user.email );

          if ( isAdmin ) {
            Roles.setUserRoles( userId, 'admin' );
          } else {
            Roles.setUserRoles( userId, 'employee' );
          }
        }
    }
  };

  let _checkIfUserExists = ( email ) => {
    return Meteor.users.findOne( { 'emails.address': email } );
  };

  let _checkIfAdmin = ( email ) => {
    return _.find( administrators, ( admin ) => {
      return admin.email === email;
    });
  };

  let _createUser = ( user ) => {
    Accounts.createUser({
      email: user.email,
      password: user.password,
      profile: {
        name: user.name
      }
    });
  };

  let _generateFakeUsers = ( count ) => {
    let users = [];

    for ( let i = 0; i < count; i++ ) {
      users.push({
        name: { first: faker.name.firstName(), last: faker.name.lastName() },
        email: faker.internet.email(),
        password: 'password'
      });
    }

    return users;
  };

//  Modules.server.generateAccounts = generateAccounts;
});
*/
//https://docs.mongodb.org/manual/aggregation/#single-purpose-agg-operations
//this allows for simple querying and aggregating for amount of conflicts
//good method for extracting data
//just collection of start and end dates per day, substract from amount
//render template per room
//find reservation


//use $where for dates, and cursor to array for schedule and out for scheduledb
//https://docs.mongodb.org/manual/aggregation/#single-purpose-agg-operations
//this allows for simple querying and aggregating for amount of conflicts
//good method for extracting data
//just collection of start and end dates per day, substract from amount
//render template per room
//find reservation


//use $where for dates, and cursor to array for schedule and out for scheduledb


//http://stackoverflow.com/questions/22676470/how-to-display-meteor-user-profile-data-in-the-view
//also documentations on user profile publish


//in order to keep sync and other improvements $where may be used for straight up js for compare
//2 collections, or perform function here
//alternative of out/outer left join https://docs.mongodb.org/manual/reference/operator/aggregation/lookup/
//as this non-natural operation that hypothetically isn't supported on free license
//i've decided to implement update functions on front end, as well as write functions.
/*
Meteor.users.aggregate([
  { $match: {profile: {reservation: { datestart: {$mt{new Date}}}}},
  { $sort: { datestart: 1} }
  //group follows $field syntax, datestart is embedded
  { $group: {id: this.userId, datestart: { $push: $datestart}}}}
  { $out: "<output-collection>" }
])
*/


/*
Meteor.users.deny({
  update: function() {return true;}
});
*/
