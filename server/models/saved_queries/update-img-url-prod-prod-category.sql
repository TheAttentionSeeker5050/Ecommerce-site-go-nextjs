-- update ecommerce_db.product_categories
-- 	set image_thumbnail_url = ( case
-- 		when url_formatted_name = 'food' then 'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/cd668e7b-8adb-41a1-28f9-e6eb1ca73a00/public'
--         when url_formatted_name = 'treats' then 'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/7eaa0f81-6292-48eb-69f6-7e186a8c6e00/public'
--         when url_formatted_name = 'beds-and-furniture' then 'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/7fad03a6-6ba9-47f1-1867-811dabce8d00/public'
--         when url_formatted_name = 'grooming-and-fur-care' then 'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/aa670001-35d9-4784-d17c-d5ba293bad00/public'
--         when url_formatted_name = 'medicines' then 'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/9267bb07-18c9-4e1a-0985-79ffdaface00/public'
--         when url_formatted_name = 'toys' then 'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/9267bb07-18c9-4e1a-0985-79ffdaface00/public'
--         when url_formatted_name = 'collars-and-leashes' then 'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/eda9b48f-8650-4909-03c5-f8237d762600/public'
--         when url_formatted_name = 'litter' then 'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/56445b34-a134-4836-6810-ef42bca73b00/public'
--         when url_formatted_name = 'habitat-supplies' then 'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/c929e9b1-5e2b-492e-468c-3dabb3b18b00/public'
--         
--         end)
--         where id > 0 and id<20
-- 	;

-- update ecommerce_db.product_categories
--     set image_thumbnail_url = 'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/c929e9b1-5e2b-492e-468c-3dabb3b18b00/public',
--     category_name = 'Habitat Supplies',
--     url_formatted_name = 'habitat-supplies'
--     where id = 9;

-- delete from ecommerce_db.product_categories where id=10;
select * from ecommerce_db.product_categories;