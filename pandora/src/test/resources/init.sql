TRUNCATE TABLE pitch;
TRUNCATE TABLE location_properties;
TRUNCATE TABLE location CASCADE;

INSERT INTO Location (id, created_date, name, city, address_line, postal_code, contact_name, email, phone_number, geom)
VALUES (nextval('location_seq'), current_timestamp, 'Futballaréna', 'Budapest', 'Fehérvári út, 124-126.', '1116',
        'Contact Person', 'footballarena@email.com', '+36701234567', ST_GeomFromText('POINT(47.45940712213912 19.041099755902156)', 4326));
INSERT INTO location_properties (location_id, properties)
VALUES
(currval('location_seq'), 'SHOWER'),
(currval('location_seq'), 'CHANGING_ROOM');

INSERT INTO Location (id, created_date, name, city, address_line, postal_code, contact_name, email, phone_number, geom)
VALUES (nextval('location_seq'), current_timestamp, 'Gold Center', 'Budapest', 'Budafoki út 113.', '1117',
        'Contact Person', 'goldcenter@email.com', '+36701234567', ST_GeomFromText('POINT(47.463883339446056 19.051970458259163)', 4326));
INSERT INTO location_properties (location_id, properties)
VALUES
(currval('location_seq'), 'FREE_PARKING'),
(currval('location_seq'), 'SHOWER'),
(currval('location_seq'), 'CHANGING_ROOM');

INSERT INTO Location (id, created_date, name, city, address_line, postal_code, contact_name, email, phone_number, geom)
VALUES (nextval('location_seq'), current_timestamp, 'BME Sportkozpont', 'Budapest', 'Bertalan Lajos utca 4-6.', '1111',
        'Contact Person', 'goldcenter@email.com', '+36701234567', ST_GeomFromText('POINT(47.4798687338902 19.057300884915392)', 4326));
INSERT INTO location_properties (location_id, properties)
VALUES
(currval('location_seq'), 'FREE_PARKING'),
(currval('location_seq'), 'CHANGING_ROOM');


INSERT INTO Location (id, created_date, name, city, address_line, postal_code, contact_name, email, phone_number, geom)
VALUES (nextval('location_seq'), current_timestamp, 'Metrosport', 'Budapest', 'Csömöri utca 158.', '1162',
        'Contact Person', 'metrosport@email.com', '+36701234567', ST_GeomFromText('POINT(47.53295737576328 19.168729790146887)', 4326));
INSERT INTO location_properties (location_id, properties)
VALUES
(currval('location_seq'), 'FREE_PARKING'),
(currval('location_seq'), 'CHANGING_ROOM');

INSERT INTO Location (id, created_date, name, city, address_line, postal_code, contact_name, email, phone_number, geom)
VALUES
(nextval('location_seq'), current_timestamp, 'ELTE Sporttelep', 'Budapest', 'Bogdánfy út 10/a', '1111',
        'Contact Person', 'eltesporttelep@email.com', '+36701234567', ST_GeomFromText('POINT(47.53295737576328 19.168729790146887)', 4326));
INSERT INTO location_properties (location_id, properties)
VALUES
(currval('location_seq'), 'FREE_PARKING'),
(currval('location_seq'), 'CHANGING_ROOM');

INSERT INTO Location (id, created_date, name, city, address_line, postal_code, contact_name, email, phone_number, geom)
VALUES
    (nextval('location_seq'), current_timestamp, 'Mérnök utcai sporttelep', 'Budapest', 'Mérnök u. 35', '1119',
     'Contact Person', 'eltesporttelep@email.com', '+36701234567', ST_GeomFromText('POINT(47.464952256569426 19.040326093252357)', 4326));
INSERT INTO location_properties (location_id, properties)
VALUES
(currval('location_seq'), 'FREE_PARKING'),
(currval('location_seq'), 'CHANGING_ROOM'),
(currval('location_seq'), 'SHOWER');