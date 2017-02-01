import * as dotenv from 'dotenv'

import * as pgPromise from 'pg-promise'

dotenv.config({
  path: '.env'
})

const DB_CONNECTION = process.env.DB_CONNECTION

let pgp: pgPromise.IMain = pgPromise()
let db: pgPromise.IDatabase<any> = pgp(DB_CONNECTION)


const roles_data = [
  {id: 'user'},
  {id: 'admin'}
]

const permissions_data = [
  {id: 'post.view'},
  {id: 'post.delete'}
]

const role_permissions_data = [
  {role_id: 'user', permission_id: 'post.view'},
  {role_id: 'admin', permission_id: 'post.view'},
]

async function run() {
  await db.tx(function (t) {
    return t.batch([
      t.none("drop table if exists users"),
      t.none(`create table users (
        id uuid not null,
        fbid varchar(255) not null,
        firstname varchar(255) not null,
        secondname varchar(255) not null,
        role_id varchar(36) not null,
        email varchar(255) not null,
        email_confirm_token uuid null,
        email_confirmed boolean not null default(false),
        phone varchar(20) null,
        phone_confirm_token int null,
        phone_confirmed boolean not null default(false),

        created_at timestamp with time zone not null default now(),
        updated_at timestamp with time zone not null default now(),

        constraint users_id_pk primary key(id),
        constraint users_email_unique unique(email)
      )`),
      t.none("drop table if exists roles"),
      t.none(`create table roles (
        id varchar(36) not null,

        created_at timestamp with time zone not null default now(),
        updated_at timestamp with time zone not null default now(),

        constraint roles_id_pk primary key(id)
      )`),
      t.none("drop table if exists permissions"),
      t.none(`create table permissions (
        id varchar(255) not null,

        created_at timestamp with time zone not null default now(),
        updated_at timestamp with time zone not null default now(),

        constraint permissions_id_pk primary key(id)
      )`),
      t.none("drop table if exists role_permissions"),
      t.none(`create table role_permissions (
        id SERIAL not null,
        role_id varchar(36) not null,
        permission_id varchar(255) not null,

        created_at timestamp with time zone not null default now(),
        updated_at timestamp with time zone not null default now(),

        constraint role_permissions_id_pk primary key(id),
        constraint role_permissions_role_id_fk foreign key (role_id) references roles (id),
        constraint role_permissions_permission_id_fk foreign key (permission_id) references permissions (id)
      )`),

      t.none(pgp.helpers.insert(roles_data, ['id'], 'roles')),
      t.none(pgp.helpers.insert(permissions_data, ['id'], 'permissions')),
      t.none(pgp.helpers.insert(role_permissions_data, ['role_id', 'permission_id'], 'role_permissions'))
          ])
      })
          .then(function () {
              console.log("*** SUCCESS ***")
          })
          .catch(function (error) {
              console.log("FAILED:", error)
          })
  pgp.end()
}

run()