-- GET a list of ALL the myPangea Entries
"select id, date, city, country, diary, photo, UserID from entries"

--Get an entry by ID
"select * from entries where id = ?"

-- delete an entry by ID if you own the ID (same USERID)
"delete from entries where id = ? and UserId = ?"

--create a new entry but only if you own it (same userID)
"insert into entries(date, city, country, photo, diary, userID) values (?, ?, ?, ?, ?, ?)"

-- edit an entry if you have userID
"update entries set date = ?, city = ?, country = ?, photo = ?, diary = ? where id = ? and userID = ? "

-- registers/creates a new user 
"insert into users(first_name, last_name, email, passwordHash) values (?, ?, ?, ?)"

-- logs in a new user
"select id, first_name, last_name, passwordHash from users where email = ?"