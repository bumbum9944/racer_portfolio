create table if not exists user(
    id int not null AUTO_INCREMENT,
    name varchar(50) not null,
    email varchar(100) not null,
    password varchar(100) not null,
    primary key (id)
);

create table if not exists profile(
    id int not null AUTO_INCREMENT,
    introduction text default null,
    image varchar(255) default null,
    user int not null,
    primary key (id),
    foreign key (user) 
    references user (id)
    on delete cascade
);

create table if not exists education(
    id int not null AUTO_INCREMENT,
    degree varchar(100) not null,
    schoolName varchar(100) not null,
    major varchar(100) default null,
    user int not null,
    primary key (id),
    foreign key (user) 
    references user (id)
    on delete cascade
);

create table if not exists award(
    id int not null AUTO_INCREMENT,
    name varchar(100) not null,
    description text default null,
    user int not null, 
    primary key (id),
    foreign key (user) 
    references user (id)
    on delete cascade
);

create table if not exists project(
    id int not null AUTO_INCREMENT,
    name varchar(100) not null,
    description text default null,
    startDate date not null,
    endDate date not null,
    user int not null, 
    primary key (id),
    foreign key (user)
    references user (id)
    on delete cascade
);

create table if not exists license(
    id int not null AUTO_INCREMENT,
    name varchar(100) not null,
    issuer varchar(100) not null,
    acquisitionDate date not null,
    user int not null, 
    primary key (id),
    foreign key (user) 
    references user (id)
    on delete cascade
);