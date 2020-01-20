
exports.up = function(knex) {
    return knex.schema
    .createTable('users', users => {
        users.increments();


        users
            .string('username', 128)
            .notNullable()
            .unique();

        users
            .string('password', 128)
            .notNullable();

    }).createTable('snacks', snacks => {
        snacks.increments();


        snacks
            .string('favoritesnack', 128)
            .notNullable()

        snacks
            .integer('user_id')
            .unsigned()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')

    })

};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
};
