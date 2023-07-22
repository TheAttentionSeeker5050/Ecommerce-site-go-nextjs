-- delete from ecommerce_db.product_categories where id > 0;

insert into ecommerce_db.product_categories (ecommerce_db.product_categories.category_name, ecommerce_db.product_categories.url_formatted_name)
values (
	'Food', 'food'
);

insert into ecommerce_db.product_categories (ecommerce_db.product_categories.category_name, ecommerce_db.product_categories.url_formatted_name)
values (
	'Treats', 'treats'
);


insert into ecommerce_db.product_categories (ecommerce_db.product_categories.category_name, ecommerce_db.product_categories.url_formatted_name)
values (
	'Beds and Furniture', 'beds-and-furniture'
);

insert into ecommerce_db.product_categories (ecommerce_db.product_categories.category_name, ecommerce_db.product_categories.url_formatted_name)
values (
	'Grooming and Fur Care', 'grooming-and-fur-care'
);

insert into ecommerce_db.product_categories (ecommerce_db.product_categories.category_name, ecommerce_db.product_categories.url_formatted_name)
values (
	'Medicines', 'medicines'
);

insert into ecommerce_db.product_categories (ecommerce_db.product_categories.category_name, ecommerce_db.product_categories.url_formatted_name)
values (
	'Toys', 'toys'
);

insert into ecommerce_db.product_categories (ecommerce_db.product_categories.category_name, ecommerce_db.product_categories.url_formatted_name)
values (
	'Collars and Leashes', 'collars-and-leashes'
);

insert into ecommerce_db.product_categories (ecommerce_db.product_categories.category_name, ecommerce_db.product_categories.url_formatted_name)
values (
	'Litter', 'litter'
);


insert into ecommerce_db.product_categories(ecommerce_db.product_categories.category_name, ecommerce_db.product_categories.url_formatted_name)
values (
	'Habitat Supplies', 'habitat-supplies'
);

commit;
select * from ecommerce_db.product_categories;
