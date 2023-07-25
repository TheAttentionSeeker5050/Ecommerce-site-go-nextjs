update ecommerce_db.products
-- set image = 'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/2f42d007-fb4a-44e0-568b-e28824699000/public'
-- where product_category_id != 1;

update ecommerce_db.products
set `image` = ELT(
    FLOOR(RAND()*8)+1, 
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/f92ec7ed-f753-43c1-ab80-f80a662d4400/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/58a35ce5-5717-4229-604f-3405a5484d00/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/ddafaecb-1356-45c0-cb6d-dd15c7967200/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/0ea17aa8-1eea-47fe-08de-83c3b122ba00/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/e50cd081-cfe3-4829-4abb-1b5bbbe94100/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/7e97131f-6e85-46e8-9314-d00c21c1be00/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/573c48fc-6599-4600-c20a-03b9d708b200/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/1d17de58-0b77-42dc-562c-d9f68b5eef00/public')

where id > 0 and product_category_id = 1;

select * from ecommerce_db.products;
