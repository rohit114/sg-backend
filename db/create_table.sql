
CREATE TABLE MT300 (
  id SERIAL PRIMARY KEY,
  tag text ,
  description text,
  "isPartingOfMatching" boolean,
  "matchedWith" text
);
 alter table mt300 add column "isHighlighted" boolean default false;


CREATE TABLE cpData (
  id SERIAL PRIMARY KEY,
  message text,
  dataObj json
);

CREATE TABLE sgData (
  id SERIAL PRIMARY KEY,
  message text,
  dataObj json
);

