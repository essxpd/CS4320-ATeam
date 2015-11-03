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
