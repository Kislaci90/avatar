-- random magyar város lista
WITH cities AS (
    SELECT unnest(ARRAY[
        'Budapest','Szeged','Debrecen','Győr','Pécs','Kecskemét',
        'Miskolc','Székesfehérvár','Nyíregyháza','Szolnok',
        'Tatabánya','Zalaegerszeg','Kaposvár','Békéscsaba',
        'Sopron','Eger','Dunaújváros','Veszprém'
        ]) AS city
)

INSERT INTO location (
    id,
    name,
    description,
    website,
    city,
    address_line,
    postal_code,
    contact_name,
    email,
    phone_number,
    geom,
    created_date
)
SELECT
    100 + gs,
    'Sport Center ' || gs,
    'Test location description ' || gs,
    'https://sport' || gs || '.hu',
    (SELECT city FROM cities ORDER BY random() LIMIT 1),
    'Sport utca ' || gs,
    (1000 + gs)::text,
    'Contact ' || gs,
    'contact' || gs || '@example.com',
    '+36 30 ' || (1000000 + gs),
    ST_SetSRID(
            ST_MakePoint(
                    16 + random()*6,
                    46 + random()*3
            ),
            4326
    ),
    CURRENT_TIMESTAMP
FROM generate_series(1,100) gs;

INSERT INTO location_properties (location_id, properties)
SELECT
    l.id,
    p.property
FROM location l
         JOIN (
    SELECT unnest(ARRAY[
        'SHOWER',
        'FREE_PARKING',
        'CAFE',
        'CHANGING_ROOM',
        'EQUIPMENT_RENTAL'
        ]) property
) p ON random() < 0.4
WHERE l.id >= 100;

INSERT INTO pitch (
    id,
    name,
    location_id,
    description,
    surface_type,
    type,
    created_date
)
SELECT
    2000 + gs AS id,
    'Pitch ' || gs AS name,
    loc_array[1 + floor(random() * array_length(loc_array, 1))::int] AS location_id,
    'Generated pitch ' || gs AS description,
    surface_array[floor(random() * array_length(surface_array,1) + 1)::int] AS surface_type,
    type_array[floor(random() * array_length(type_array,1) + 1)::int] AS type,
    CURRENT_TIMESTAMP AS created_date
FROM generate_series(1,300) gs,
     LATERAL (SELECT ARRAY_AGG(id ORDER BY id) AS loc_array FROM location WHERE id >= 100) locs,
     LATERAL (SELECT ARRAY['ARTIFICIAL_GRASS','TURF','CONCRETE','HARDCOURT','GRASS','ASPHALT'] AS surface_array) sa,
     LATERAL (SELECT ARRAY['FIVE_A_SIDE','SEVEN_A_SIDE','FULL_SIZE','HALF_SIZE','INDOOR','OUTDOOR'] AS type_array) ta;

INSERT INTO pitch_properties (pitch_id, properties)
SELECT
    p.id,
    prop.property
FROM pitch p
         JOIN (
    SELECT unnest(ARRAY[
        'LIGHTING',
        'COVERED'
        ]) property
) prop ON random() < 0.5
WHERE p.id >= 2000;