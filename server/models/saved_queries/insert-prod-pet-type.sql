-- delete from ecommerce_db.product_pet_types where id > 0;

insert into ecommerce_db.product_pet_types (ecommerce_db.product_pet_types.pet_name, ecommerce_db.product_pet_types.url_formatted_name)
values ('Dogs', 'dogs');
insert into ecommerce_db.product_pet_types (ecommerce_db.product_pet_types.pet_name, ecommerce_db.product_pet_types.url_formatted_name)
values ('Cats', 'cats');
insert into ecommerce_db.product_pet_types (ecommerce_db.product_pet_types.pet_name, ecommerce_db.product_pet_types.url_formatted_name)
values ('Birds', 'birds');
insert into ecommerce_db.product_pet_types (ecommerce_db.product_pet_types.pet_name, ecommerce_db.product_pet_types.url_formatted_name)
values ('Hamsters, Guinea Pigs, Rabbits & Small Mammals', 'small-mammals');
insert into ecommerce_db.product_pet_types (ecommerce_db.product_pet_types.pet_name, ecommerce_db.product_pet_types.url_formatted_name)
values ('Reptiles', 'reptiles');

commit;
select * from ecommerce_db.product_pet_types;