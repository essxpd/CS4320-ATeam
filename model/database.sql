/*drop table if exists users;*/
create table users(
    Full_Name varchar(30),
	Title varchar(15), /*things like student, teacher, etc...*/
	Department varchar (30),
	SSO varchar (15) PRIMARY KEY,
	Employee_ID varchar (15),
	Campus_Address varchar (50),
	Phone_Number varchar(13), /*not sure if "()" or "-" will count in this so I made the max 13*/ 
	Ferpa_Score varchar(10),
	User_Type Varchar(15)
);

/*drop table if exists authentication;*/
create table authentication(
	SSO varchar(15) PRIMARY KEY,
	Password_Hash char(40) NOT NULL,
	Salt char(40) NOT NULL,
	FOREIGN KEY (SSO) REFERENCES users(SSO)
);

/*drop table if exists log;*/
create table log(
	Time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	SSO varchar(15),
	Action varchar(30),
    FOREIGN KEY (SSO) REFERENCES users(SSO)
);

INSERT INTO testAuth.users VALUES ('H.M. Murdock','applicant','Computer Science','100','200','1234 University Drive','(573)882-5555','84','user');
INSERT INTO testAuth.users VALUES ('Templeton Peck','applicant','Computer Science','103','203','1234 University Drive','(573)882-5555','84','user');
INSERT INTO testAuth.users VALUES ('Bosco Baracus','administrator','Computer Science','101','201','1234 University Drive','(573)882-5555','87','admin');
INSERT INTO testAuth.users VALUES ('John Hannibal Smith','employer','Computer Science','102','202','1234 University Drive','(573)882-5555','89','employer');
INSERT INTO testAuth.users VALUES ('Melinda Culea','employer','journalism','104','204','1234 University Drive','(573)882-5555','87','user');
INSERT INTO testAuth.users VALUES ('Marla Heasley','applicant','journalism','105','205','1234 University Drive','(573)882-5555','94','user');

INSERT INTO testAuth.authentication (SSO,Password_Hash,Salt) VALUES ('100','6435c3078ea74984bbccc96a08163354be73d978','300');
INSERT INTO testAuth.authentication (SSO,Password_Hash,Salt) VALUES ('101','a36198109e6af9d3a7c65f7032f54c593d7198e6','301');
INSERT INTO testAuth.authentication (SSO,Password_Hash,Salt) VALUES ('102','ed9e03754160fa3649b55abdeca1f311368cd44c','302');
INSERT INTO testAuth.authentication (SSO,Password_Hash,Salt) VALUES ('103','23b5e78914e19f26731797c9c51588d6622a3c9f','303');
/*INSERT INTO testAuth.authentication (SSO,Password_Hash,Salt) VALUES ('104','76373766ce100393fabd011d5e856c3e1a722f57','9950fa661509b44cd695dc84a720875ed97eae55');
INSERT INTO testAuth.authentication (SSO,Password_Hash,Salt) VALUES ('105','76373766ce100393fabd011d5e856c3e1a722f57','9950fa661509b44cd695dc84a720875ed97eae55');*/
/*INSERT INTO testAuth.log (SSO,Action)VALUES ('100',$action);*/
