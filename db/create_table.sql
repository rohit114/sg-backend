
CREATE TABLE MT300 (
  id SERIAL PRIMARY KEY,
  tag text ,
  description text,
  "isPartingOfMatching" boolean,
  "matchedWith" text
);

