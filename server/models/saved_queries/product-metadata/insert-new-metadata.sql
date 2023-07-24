-- SELECT * FROM ecommerce_db.metadata;

delete from ecommerce_db.metadata where id > 0;

-- dog food types

insert into ecommerce_db.metadata (filter_type,url_formatted_filter_type,filter_value,url_formatted_filter_value, product_category_id) 
values ("Food Type","food-type", "Dry Food", "dry-food", 1);

insert into ecommerce_db.metadata (filter_type,url_formatted_filter_type,filter_value,url_formatted_filter_value, product_category_id) 
values ("Food Type","food-type", "Canned Food", "canned-food", 1);

insert into ecommerce_db.metadata (filter_type,url_formatted_filter_type,filter_value,url_formatted_filter_value, product_category_id) 
values ("Food Type","food-type", "Food Toppers", "food-toppers", 1);

insert into ecommerce_db.metadata (filter_type,url_formatted_filter_type,filter_value,url_formatted_filter_value, product_category_id) 
values ("Food Type","food-type", "Fresh & Frozen Food", "fresh-frozen-food", 1);

insert into ecommerce_db.metadata (filter_type,url_formatted_filter_type,filter_value,url_formatted_filter_value, product_category_id) 
values ("Food Type","food-type", "Milk Replacers", "milk-replacers", 1);

insert into ecommerce_db.metadata (filter_type,url_formatted_filter_type,filter_value,url_formatted_filter_value, product_category_id) 
values ("Food Type","food-type", "Puppy Food", "puppy-food", 1);


-- dog food brands

insert into ecommerce_db.metadata (filter_type,url_formatted_filter_type,filter_value,url_formatted_filter_value, product_category_id)
values ("Brand","brand", "Whipped Paw", "whipped-paw",1);

insert into ecommerce_db.metadata (filter_type,url_formatted_filter_type,filter_value,url_formatted_filter_value, product_category_id)
values ("Brand","brand", "Dogo Dawg", "dogo-dawg",1);

insert into ecommerce_db.metadata (filter_type,url_formatted_filter_type,filter_value,url_formatted_filter_value, product_category_id)
values ("Brand","brand", "Bark A Boo", "bark-a-boo",1);

insert into ecommerce_db.metadata (filter_type,url_formatted_filter_type,filter_value,url_formatted_filter_value, product_category_id)
values ("Brand","brand", "Pawfect", "pawfect", 1);

insert into ecommerce_db.metadata (filter_type,url_formatted_filter_type,filter_value,url_formatted_filter_value, product_category_id)
values ("Brand","brand", "Pawsome Food Express", "pawsome-food-express",1);

insert into ecommerce_db.metadata (filter_type,url_formatted_filter_type,filter_value,url_formatted_filter_value, product_category_id)
values ("Brand","brand", "Dog On A Stick", "dog-on-a-stick",1);

-- puppy life stages

insert into ecommerce_db.metadata (filter_type,url_formatted_filter_type,filter_value,url_formatted_filter_value, product_category_id)
values ("Life Stage","life-stage", "Puppy", "puppy", 1);

insert into ecommerce_db.metadata (filter_type,url_formatted_filter_type,filter_value,url_formatted_filter_value, product_category_id)
values ("Life Stage","life-stage", "Adult", "adult", 1);

insert into ecommerce_db.metadata (filter_type,url_formatted_filter_type,filter_value,url_formatted_filter_value, product_category_id)
values ("Life Stage","life-stage", "Senior", "senior", 1);

-- dog food flavors

insert into ecommerce_db.metadata (filter_type,url_formatted_filter_type,filter_value,url_formatted_filter_value, product_category_id)
values ("Flavor","flavor", "Beef", "beef", 1);

insert into ecommerce_db.metadata (filter_type,url_formatted_filter_type,filter_value,url_formatted_filter_value, product_category_id)
values ("Flavor","flavor", "Chicken", "chicken", 1);

insert into ecommerce_db.metadata (filter_type,url_formatted_filter_type,filter_value,url_formatted_filter_value, product_category_id)
values ("Flavor","flavor", "Lamb", "lamb", 1);

insert into ecommerce_db.metadata (filter_type,url_formatted_filter_type,filter_value,url_formatted_filter_value, product_category_id)
values ("Flavor","flavor", "Turkey", "turkey", 1);

insert into ecommerce_db.metadata (filter_type,url_formatted_filter_type,filter_value,url_formatted_filter_value, product_category_id)
values ("Flavor","flavor", "Salmon", "salmon", 1);

insert into ecommerce_db.metadata (filter_type,url_formatted_filter_type,filter_value,url_formatted_filter_value, product_category_id)
values ("Flavor","flavor", "Duck", "duck", 1);

insert into ecommerce_db.metadata (filter_type,url_formatted_filter_type,filter_value,url_formatted_filter_value, product_category_id)
values ("Flavor","flavor", "Pork", "pork", 1);

select * from ecommerce_db.metadata;