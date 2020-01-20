
exports.up = function(knex) {
    return schema
    .createTable('users', users => {
        users.increments();


        users
            .string('username', 128)
            .notNullable()
            .unique();

        users
            .string('password', 128)
            .notNullable();




    })

};

exports.down = function(knex) {
  
};
