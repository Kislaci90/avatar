truncate location_properties cascade;
truncate pitch_properties cascade;
truncate location cascade;
truncate pitch cascade;
truncate users cascade;

INSERT INTO location (id, name, description, website,
                      city, address_line, postal_code,
                      contact_name, email, phone_number,
                      geom, created_date)
VALUES (1,
        'Budapest Park',
        'Open air location for events and sports.',
        'https://budapestpark.hu',
        'Budapest',
        'Soroksári út 60.',
        '1095',
        'Kiss Gábor',
        'gabor.kiss@example.com',
        '+36 30 123 4567',
        ST_SetSRID(ST_MakePoint(19.0724, 47.4751), 4326),
        CURRENT_TIMESTAMP);

INSERT INTO location_properties (location_id, properties)
VALUES (1, 'SHOWER'),
       (1, 'FREE_PARKING');

-- 2
INSERT INTO location (id, name, description, website,
                      city, address_line, postal_code,
                      contact_name, email, phone_number,
                      geom, created_date)
VALUES (2, 'Városligeti Sportcentrum', 'Központi elhelyezkedés, jól megközelíthető.', 'https://varosligetisport.hu',
        'Budapest', 'Olof Palme sétány 5.', '1146', 'Szabó Dóra', 'dora.szabo@example.com', '+36 20 234 5678',
        ST_SetSRID(ST_MakePoint(19.0831, 47.5146), 4326), CURRENT_TIMESTAMP);

INSERT INTO location_properties
VALUES (2, 'CAFE'),
       (2, 'EQUIPMENT_RENTAL'),
       (2, 'SHOWER'),
       (2, 'FREE_PARKING'),
       (2, 'CHANGING_ROOM');

-- 3
INSERT INTO location (id, name, description, website,
                      city, address_line, postal_code,
                      contact_name, email, phone_number,
                      geom, created_date)
VALUES (3, 'Szegedi Fociaréna', 'Modern műfüves pályák, lelátóval.', 'https://szegedfoci.hu', 'Szeged',
        'Felső Tisza-part 15.', '6723', 'Nagy Péter', 'peter.nagy@example.com', '+36 70 345 6789',
        ST_SetSRID(ST_MakePoint(20.1601, 46.253), 4326), CURRENT_TIMESTAMP);

INSERT INTO location_properties
VALUES (3, 'SHOWER'),
       (3, 'CHANGING_ROOM');

-- 4
INSERT INTO location (id, name, description, website,
                      city, address_line, postal_code,
                      contact_name, email, phone_number,
                      geom, created_date)
VALUES (4, 'Debreceni Stadion', 'Professzionális stadion és edzőpályák.', 'https://debrecenisport.hu', 'Debrecen',
        'Nagyerdei körút 12.', '4032', 'Tóth Emese', 'emese.toth@example.com', '+36 30 456 7890',
        ST_SetSRID(ST_MakePoint(21.6299, 47.5459), 4326), CURRENT_TIMESTAMP);

INSERT INTO location_properties
VALUES (4, 'SHOWER'),
       (4, 'CHANGING_ROOM');

-- 5
INSERT INTO location (id, name, description, website,
                      city, address_line, postal_code,
                      contact_name, email, phone_number,
                      geom, created_date)
VALUES (5, 'Győri Sporttelep', 'Kisebb edzőpályák utánpótlásnak.', 'https://gyorisport.hu', 'Győr', 'Sport utca 1.',
        '9021', 'Balogh László', 'laszlo.balogh@example.com', '+36 70 111 2222',
        ST_SetSRID(ST_MakePoint(17.6371, 47.6875), 4326), CURRENT_TIMESTAMP);

INSERT INTO location_properties
VALUES (5, 'FREE_PARKING'),
       (5, 'CHANGING_ROOM');

-- 6
INSERT INTO location (id, name, description, website,
                      city, address_line, postal_code,
                      contact_name, email, phone_number,
                      geom, created_date)
VALUES (6, 'Pécsi Fociközpont', 'Sportolási lehetőség gyerekeknek is.', 'https://pecsifoci.hu', 'Pécs',
        'Verseny utca 4.', '7624', 'Molnár Ádám', 'adam.molnar@example.com', '+36 30 333 4444',
        ST_SetSRID(ST_MakePoint(18.2293, 46.0727), 4326), CURRENT_TIMESTAMP);

INSERT INTO location_properties
VALUES (6, 'CAFE'),
       (6, 'SHOWER');

-- 7
INSERT INTO location (id, name, description, website,
                      city, address_line, postal_code,
                      contact_name, email, phone_number,
                      geom, created_date)
VALUES (7, 'Kecskeméti Sportpálya', 'Helyi versenyek és edzések helyszíne.', 'https://kecskemetisport.hu', 'Kecskemét',
        'József Attila utca 5.', '6000', 'Horváth Réka', 'reka.horvath@example.com', '+36 70 555 6666',
        ST_SetSRID(ST_MakePoint(19.6945, 46.9062), 4326), CURRENT_TIMESTAMP);

INSERT INTO location_properties
VALUES (7, 'SHOWER'),
       (7, 'FREE_PARKING');

-- 8
INSERT INTO location (id, name, description, website,
                      city, address_line, postal_code,
                      contact_name, email, phone_number,
                      geom, created_date)
VALUES (8, 'Miskolci Futballközpont', 'Széles közönség számára nyitva.', 'https://miskolcfoci.hu', 'Miskolc',
        'Nagy Lajos király útja 10.', '3525', 'Pintér Lili', 'lili.pinter@example.com', '+36 30 777 8888',
        ST_SetSRID(ST_MakePoint(20.7815, 48.1031), 4326), CURRENT_TIMESTAMP);

INSERT INTO location_properties
VALUES (8, 'CHANGING_ROOM'),
       (8, 'FREE_PARKING');

-- 9
INSERT INTO location (id, name, description, website,
                      city, address_line, postal_code,
                      contact_name, email, phone_number,
                      geom, created_date)
VALUES (9, 'Érdi Foci Center', 'Edzésekhez és amatőr meccsekhez ideális.', 'https://erdfoci.hu', 'Érd',
        'Futball utca 3.', '2030', 'Jakab Norbert', 'norbert.jakab@example.com', '+36 70 888 9999',
        ST_SetSRID(ST_MakePoint(18.9027, 47.3915), 4326), CURRENT_TIMESTAMP);

INSERT INTO location_properties
VALUES (9, 'EQUIPMENT_RENTAL'),
       (9, 'FREE_PARKING');

-- 10
INSERT INTO location (id, name, description, website,
                      city, address_line, postal_code,
                      contact_name, email, phone_number,
                      geom, created_date)
VALUES (10, 'Soproni Sportaréna', 'Határon túlról is jönnek ide focizni.', 'https://sopronarena.hu', 'Sopron',
        'Bécsi út 12.', '9400', 'Szűcs Ákos', 'akos.szucs@example.com', '+36 20 999 0000',
        ST_SetSRID(ST_MakePoint(16.5845, 47.6817), 4326), CURRENT_TIMESTAMP);

INSERT INTO location_properties
VALUES (10, 'CAFE'),
       (10, 'SHOWER');

-- 1. pitch
INSERT INTO pitch (id, name, location_id, description, surface_type, type, created_date)
VALUES (1, 'Center Court', 1, 'Description of this pitch','ARTIFICIAL_GRASS', 'FIVE_A_SIDE', CURRENT_TIMESTAMP);

INSERT INTO pitch_properties (pitch_id, properties)
VALUES (1, 'LIGHTING'),
       (1, 'COVERED');

-- 2. pitch
INSERT INTO pitch (id, name, location_id, description, surface_type, type, created_date)
VALUES (2, 'Street Pitch', 1, 'Description of this pitch', 'CONCRETE', 'SEVEN_A_SIDE', CURRENT_TIMESTAMP);

INSERT INTO pitch_properties (pitch_id, properties)
VALUES (2, 'COVERED');

-- 3. pitch
INSERT INTO pitch (id, name, location_id, description, surface_type, type, created_date)
VALUES (3, 'Rooftop Arena', 1, 'Description of this pitch', 'TURF', 'FULL_SIZE', CURRENT_TIMESTAMP);

INSERT INTO pitch_properties (pitch_id, properties)
VALUES (3, 'COVERED'),
       (3, 'LIGHTING');

INSERT INTO users (id, full_name, email, password, created_date, last_modified_date, created_by, last_modified_by)
VALUES (2,
        'Regular User',
        'user@example.com',
        '$2a$10$ZPdQkCGizD3KTVPHe5t0x.kHHUc7C4oHR9uOkiOJZ4cy.4W4MPMea', -- 'user123'
        now(),
        now(),
        'system',
        'system');

INSERT INTO users (id, full_name, email, password, created_date, last_modified_date, created_by, last_modified_by)
VALUES (1,
        'Admin User',
        'admin@example.com',
        '$2a$10$XvmCXTExbJYcRy0fWk9caOJMsibWDEws0ElxqyQP9qGNCnLQscOnO', -- 'admin123'
        now(),
        now(),
        'system',
        'system');