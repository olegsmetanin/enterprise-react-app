import * as dotenv from 'dotenv'
import {v4 as uuidV4} from 'uuid'

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

const users_data = [
  {
    id: uuidV4(),
    firstname: 'firstname',
    secondname: 'secondname',
    display_name: 'name',
    role_id: 'user'
  }
]

const blog_posts = [
  {
    title: 'Initial post',
    content: 'Initial content',
    user_id: users_data[0].id,
    published_date: new Date(),
    status: 'published'
  }
]

async function run() {
  await db.tx(function (t) {
    return t.batch([
      t.none('CREATE EXTENSION if not exists citext'),

      // Users
      t.none('drop table if exists users'),

      t.none(`create table users (
        id uuid not null,
        firstname varchar(255) not null,
        secondname varchar(255) not null,
        display_name varchar(255) not null,

        facebook varchar(255) null,

        role_id varchar(36) not null,

        email varchar(255) null,
        email_confirm_token varchar(255) null,
        email_confirmed boolean not null default(false),
        phone varchar(20) null,
        phone_confirm_token int null,
        phone_confirmed boolean not null default(false),

        created_at timestamp with time zone not null default now(),
        updated_at timestamp with time zone not null default now(),

        constraint users_id_pk primary key(id),
        constraint users_email_unique unique(email)
      )`),

      // Roles
      t.none('drop table if exists role_permissions'),
      t.none('drop table if exists roles'),
      t.none('drop table if exists permissions'),

      t.none(`create table roles (
        id varchar(36) not null,

        created_at timestamp with time zone not null default now(),
        updated_at timestamp with time zone not null default now(),

        constraint roles_id_pk primary key(id)
      )`),
      t.none(`create table permissions (
        id varchar(255) not null,

        created_at timestamp with time zone not null default now(),
        updated_at timestamp with time zone not null default now(),

        constraint permissions_id_pk primary key(id)
      )`),
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
      t.none(pgp.helpers.insert(role_permissions_data, ['role_id', 'permission_id'], 'role_permissions')),
      t.none(pgp.helpers.insert(users_data, ['id', 'firstname', 'secondname', 'display_name', 'role_id'], 'users')),

      // Blog
      t.none('drop table if exists blog_comments'),
      t.none('drop table if exists blog_tags'),
      t.none('drop table if exists blog_users'),
      t.none('drop table if exists blog_posts'),

      t.none(`create table blog_posts (
        id SERIAL not null,
        title citext not null,
        content citext not null,
        user_id uuid not null,
        published_date timestamp with time zone not null default now(),
        status varchar(255) not null,

        created_at timestamp with time zone not null default now(),
        updated_at timestamp with time zone not null default now(),

        constraint blog_posts_id_pk primary key(id)
      )`),
      t.none(`create table blog_tags (
        id SERIAL not null,
        post_id int not null,
        tag citext null,

        created_at timestamp with time zone not null default now(),
        updated_at timestamp with time zone not null default now(),

        constraint blog_tags_id_pk primary key(id),
        constraint blog_tags_post_id_fk foreign key (post_id) references blog_posts (id)
      )`),
      t.none(`create table blog_users (
        id SERIAL not null,
        name citext not null,
        facebook varchar(255) null,
        link varchar(255) not null,

        created_at timestamp with time zone not null default now(),
        updated_at timestamp with time zone not null default now(),

        constraint blog_users_id_pk primary key(id)
      )`),
      t.none(`create table blog_comments (
        id SERIAL not null,
        post_id int not null,
        user_id int not null,
        is_reply_to int not null,
        content citext null,
        status varchar(255) not null,

        created_at timestamp with time zone not null default now(),
        updated_at timestamp with time zone not null default now(),

        constraint blog_comments_id_pk primary key(id),
        constraint blog_comments_post_id_fk foreign key (post_id) references blog_posts (id),
        constraint blog_comments_user_id_fk foreign key (user_id) references blog_users (id)
      )`),
      t.none(pgp.helpers.insert(blog_posts, ['title', 'content', 'user_id', 'published_date', 'status'], 'blog_posts'))
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