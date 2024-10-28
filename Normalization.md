# Normalization of Tables Created

## Overview
Explanation of the normalization of the tables created for this project and how they are each in 3NF (third normal form).

## Tables

### Movies Table
The movies table is in 3NF as all non-key attributes are independent of eachother. Each attribute contains atomic values, all non-key attributes depend only on the primary key, and there are no transitive dependencies among non-key attributes meaning they are independent of eachother.

## Customers Table
Similar to the movies table, the customers table meets the requirments of 3NF because it has atomic values in each attribute, ensures that all non-key attributes are dependent on the primary key, and has no transitive dependencies among non-key attributes.

## Rentals Table
The rentals table adheres to the requirements of 3NF as each row represents a unique transaction, the non-key attributes are fully dependent on the primary key, and there are no transitive dependencies among the non-key attributes. Additionaly, the use of foreign keys to link the tables ensures there is no data duplication and redundancy and the delete anomolies are minimized by using 'ON DELETE CASCADE' constraints maintaining database consistency.
