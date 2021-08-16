
create database project1
use project1

create table tblUser(
	useremail nvarchar(255) primary key,
	username varchar(40) not null,
	userphone varchar(15) unique not null,
	userpassword nvarchar(20) not null,
	userapartment varchar(40) not null,
	userstreet varchar(40),
	usertown varchar(40) not null,
	userstate varchar(40) not null,
	userpincode varchar(40) not null,
	usercountry varchar(40) not null
)
insert into tblUser(useremail,username,userphone,userpassword,userapartment,userstreet,usertown,userstate,userpincode,usercountry)
values('mattesoumyareddy@gmail.com','SoumyaReddy',9874763245,'soumya@1','nagar','Hill road','Hyderabad','Telangana',432001,'India')

insert into tblUser(useremail,username,userphone,userpassword,userapartment,userstreet,usertown,userstate,userpincode,usercountry)values
('kirti@gmail.com','kirti',7874564781,'kirti@1','kirti-01','fort road','mumbai','Maharashtra',431001,'India')

create table tblCategory(
	categoryid int primary key identity,
	categoryname nvarchar(max) not null,
	categorydescription nvarchar(max),
)
insert into tblCategory values('Mobile and Accessories','Mobile devices')
insert into tblCategory values('TV and Home Entertainment','TV and Home devices')
insert into tblCategory values('Watches','Wrist & Wall Hanging Watch')
insert into tblCategory values('Shoes','Footware')
insert into tblCategory values('Clothing','Fashion')
select * from tblCategory

create table tblRetailer(
	retailerid int primary key identity,
	retailername varchar(40) not null,
	retaileremail nvarchar(40) unique not null,
	retailerpassword nvarchar(40) not null,
	approved int default 0
)

insert into tblRetailer(retailername,retaileremail,retailerpassword) values('Varad','varad@gmail.com','varad@123')
insert into tblRetailer(retailername,retaileremail,retailerpassword,approved) values('Ashwin','Ashwin@gmail.com','ashwin@123',1)
insert into tblRetailer(retailername,retaileremail,retailerpassword,approved) values('Mayur','mayur@gmail.com','mayur@123',1)
select * from tblRetailer

create table tblProduct(
	productid int primary key identity,
	productname nvarchar(max),
	productprice float ,
	productquantity  int,
	productdescription nvarchar(max),
	productbrand varchar(45),
	productimage1 nvarchar(max),
	retailerid int references tblRetailer(retailerid),
	categoryid int references tblCategory(categoryid)
)
select * from tblUser
insert into tblProduct(productname,productprice ,productquantity,productdescription ,productbrand ,retailerid,categoryid)
values ('redmi note 9',45000,10,'color:blue','redmi',3,1),
 ('Charger',95000,17,'color:grey','realme',2,2),
  ('Shirt',600,10,'color:gold','zara',2,5),
   ('kurta',1050,10,'color:yellow','biba',2,5),
    ('headphones',45000,10,'color:black,water resistant','boat',3,2),
	('shoes',10050,10,'color:beige','puma',3,4),
	('rolex-10',10050,10,'color:silver','rolex',2,3)
select * from tblProduct

create table tblCart(
	cartid int identity,
	useremail nvarchar(255) references tblUser(useremail),
	productid int references tblProduct(productid),
	cartquantity int,
	Primary key(cartid, productid)
)
insert into tblCart(useremail,productid,cartquantity)values
('soumya@gmail.com',2,2),('kirti@gmail.com',3,1),('soumya@gmail.com',4,5),('kirti@gmail.com',5,2)

create table tblOrder(
	orderid int identity,
	orderdate date ,
	useremail nvarchar(255) references tblUser(useremail),
	productid int references tblProduct(productid),
	retailerid int references tblRetailer(retailerid),
	orderquantity int,
	Primary key(orderid, productid)
)
alter table tblOrder alter column orderdate nvarchar(20) not null
alter table tblOrder alter column orderdate nvarchar(max) not null

alter table tblUser alter column userpassword nvarchar(max) not null

insert into tblOrder(orderdate,useremail,productid,retailerid,orderquantity)values
('2021-08-04','kirti@gmail.com',2,2,4),
('2021-07-07','kirti@gmail.com',3,2,3),
('2021-08-04','soumya@gmail.com',4,3,2),
('2021-05-08','soumya@gmail.com',3,3,2),
('2021-07-12','kirti@gmail.com',4,3,3)

select * from tblCategory
select * from tblProduct
insert into tblProduct(productname,productprice ,productquantity,productdescription ,productbrand ,retailerid,categoryid)
values ('rolex-10',10050,10,'color:silver','rolex',2,3),
('jeans',4000,10,'color:blue','dmx',3,5)
select *from tblOrder
create table tblcompare(
compareid int Primary key identity(101,1),
useremail nvarchar(255) references tblUser(useremail),
productid int references tblProduct(productid),
)
drop table tblcompare
insert into tblcompare(useremail,productid)
values('soumya@gmail.com',5)
select * from tblcompare
select * from tblUser
sp_help tblOrder

create table tblwishlist(
wishid int Primary key identity(101,1),
useremail nvarchar(255) references tblUser(useremail),
productid int references tblProduct(productid),
)
select * from tblwishlist

select * from tblUser
insert into tblProduct(productname,productprice ,productquantity,productdescription ,productbrand ,productimage1,retailerid,categoryid)
values ('fossil watch',4000,10,'Dial Color: Pink, Case Shape: Round
Band Color: Gold, Band Material: Stainless Steel','fossil','https://m.media-amazon.com/images/I/71b4P7Ilf5L._UL1500_.jpg',2,3)

insert into tblProduct(productname,productprice ,productquantity,productdescription ,productbrand ,productimage1,retailerid,categoryid)
values ('puma',4000,10,'Sole: Rubber Closure: Lace-UpShoe Width: Medium','fossil','https://m.media-amazon.com/images/I/51gIKlWew6S._UY625_.jpg',2,4)

UPDATE tblProduct SET 
    productimage1 = 'https://m.media-amazon.com/images/I/61xN6dVRL7L._AC_UY218_.jpg',
	productdescription='
Model Name	Redmi 9 Power
Wireless Carrier	Unlocked for All Carriers
Brand	Redmi'

WHERE
    productid=1;

UPDATE tblProduct SET 
    productimage1 = 'https://m.media-amazon.com/images/I/41p6D8mHIxS._AC_UY218_.jpg',
	productdescription='Special Feature	Travel, Lightweight Design, Short Circuit Protection, Fast Charging'
WHERE
    productid=2;
UPDATE tblProduct SET 
    productimage1 = 'https://m.media-amazon.com/images/I/61QwMfrVbaL._AC_UL320_.jpg',
	productdescription='Slim Fit , Fabric: 100% Cotton , Full Sleeve ,Casual Shirts'
WHERE
    productid=3;
UPDATE tblProduct SET 
    productimage1 = 'https://m.media-amazon.com/images/I/51jFPtv0PrS._AC_UL320_.jpg',
	productdescription='Style: Straight || Length: Calf Length || Sleeves: 3/4
Solid Kurta Set with Leheria Printed Dupatta'
WHERE
    productid=4;

UPDATE tblProduct SET 
    productimage1 = 'https://m.media-amazon.com/images/I/61LuTKQUDwL._SL1500_.jpg',
	productdescription='Brand	BoAt
Colour	Hazel Beige
Connector Type	Wireless
Model Name	Rockerz 450'
WHERE
    productid=5;

	
UPDATE tblProduct SET 
    productimage1 = 'https://m.media-amazon.com/images/I/81cj3e8uxOS._AC_UL320_.jpg',
	productdescription='Sole: Air Mix
Closure: Lace-Up
Shoe Width: Medium'
WHERE
    productid=6;
	UPDATE tblProduct SET 
    productimage1 = 'https://images-na.ssl-images-amazon.com/images/I/61IO4QZBkmL.jpg',
	productdescription='Rolex For Men
Size: 42-44mm
color: Gold'
WHERE
    productid=7;
	UPDATE tblProduct SET 
    productimage1 = 'https://images-na.ssl-images-amazon.com/images/I/71lCldVRVrS._UL1500_.jpg',
	productdescription='Rolex For Women
Size: 40-42mm
color: Gold
Compatible For Women'
WHERE
    productid=8;
		UPDATE tblProduct SET 
    productimage1 = 'https://images-na.ssl-images-amazon.com/images/I/81rcMJm4kFL._UL1500_.jpg',
	productdescription='BLUE JEAN FOR MEN
Size: LARGE
color: BLUE
Fit: SLIM '
WHERE
    productid=9;
select * from tblProduct

select * from tblRetailer

select * from tblOrder
sp_help tblorder
alter table tblOrder alter column orderdate nvarchar(max) not null;


select * from tblUser
sp_help tblUser
alter table tblUser alter column userpassword nvarchar(max) not null;