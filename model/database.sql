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
	Registration_Date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	Active_Requests int,
	Date_Approved date,
	Request_Submitted date,
    SSO varchar(15),
    FOREIGN KEY (SSO) REFERENCES users(SSO)
);

INSERT INTO testAuth.users VALUES ('H.M. Murdock','applicant','Computer Science','100','200','1234 University Drive','(573)882-5555','84','user');
INSERT INTO testAuth.users VALUES ('Templeton Peck','applicant','Computer Science','103','203','1234 University Drive','(573)882-5555','84','user');
INSERT INTO testAuth.users VALUES ('Bosco Baracus','administrator','Computer Science','101','201','1234 University Drive','(573)882-5555','87','admin');
INSERT INTO testAuth.users VALUES ('John Hannibal Smith','employer','Computer Science','102','202','1234 University Drive','(573)882-5555','89','employer');

INSERT INTO testAuth.authentication (SSO,Password_Hash,Salt) VALUES ('100','caf1f32ed6147cb1dbb33d75396dc82f2b013b09','9950fa661509b44cd695dc84a720875ed97eae55');
INSERT INTO testAuth.authentication (SSO,Password_Hash,Salt) VALUES ('101','317c35a9e3e66b882605c76f2465a6c82d6074c7','9950fa661509b44cd695dc84a720875ed97eae55');
INSERT INTO testAuth.authentication (SSO,Password_Hash,Salt) VALUES ('102','dc5e016f163aeb69207fa16d6da8c390a3f21dbe','9950fa661509b44cd695dc84a720875ed97eae55');
INSERT INTO testAuth.authentication (SSO,Password_Hash,Salt) VALUES ('103','76373766ce100393fabd011d5e856c3e1a722f57','9950fa661509b44cd695dc84a720875ed97eae55');

INSERT INTO testAuth.log (Active_Requests,Date_Approved,SSO)VALUES ('0','11/3/2015','100');
INSERT INTO testAuth.log (Active_Requests,Date_Approved,SSO)VALUES ('0','11/3/2015','101');
INSERT INTO testAuth.log (Active_Requests,Date_Approved,SSO)VALUES ('0','11/3/2015','102');
INSERT INTO testAuth.log (Active_Requests,Date_Approved,SSO)VALUES ('0','11/3/2015','103');