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

update ecommerce_db.products
set `image` = ELT (
    FLOOR(RAND()*7)+1,
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/6810b042-133f-498e-9f94-bf95a2dd9500/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/4049c189-08f3-4ca1-c3c6-8540d870d100/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/e45683d7-a0cf-4232-ecd0-7eee799b7800/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/0f313a16-b614-48c8-76e0-7f649845bf00/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/e81d5c6b-2d98-4983-d762-ccc00a9a9600/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/f95a0a5f-f6f3-4b24-1a87-41f515fcee00/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/2b8414da-0690-4f55-d79a-8ce54cf98000/public')
where id > 0 and product_category_id = 2;

select * from ecommerce_db.products;


update ecommerce_db.products
set `image` = ELT (
    FLOOR(RAND()*10)+1,
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/2d4f8de8-b3d9-44b4-9c60-8133f48fcb00/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/e45d4238-0654-4e3e-97cd-920c2df57f00/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/7c2d0820-d15c-4ee0-eee9-071046f31600/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/681555a3-8da6-4de2-3fa9-77f9185c9600/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/8473a218-2a75-4390-3059-236e59d36b00/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/570dc80e-a709-4bbf-cde2-493a7c6af900/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/5f5a37f6-fa6d-459c-b598-6d17df8e9c00/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/829a6dec-1e63-43d0-b6ef-1d39ad1a5900/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/6080a6c1-5115-4367-4673-63083e3d9600/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/e922957c-6790-4048-c439-d8899b108800/public')
where id > 0 and product_category_id = 3;

select * from ecommerce_db.products;

update ecommerce_db.products
set `image` = ELT (
    FLOOR(RAND()*10)+1,
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/72df5eca-8678-4f49-3080-e92c8c48c900/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/2aca00c2-af5f-4839-4c22-98eeef3dbc00/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/f201eed5-cce4-4a94-0425-37f1b1de4800/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/08bc7afe-85f0-4cde-dea3-29642fff7100/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/38c53f93-57ae-434d-aa5c-c6baecdbac00/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/84b78dba-53cf-4887-eb60-c5f29de44000/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/fb5773b6-3990-44a4-f0d4-17947a36e200/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/4beb6c43-fb57-442e-3f86-187fa72de000/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/b8a18c65-6229-404d-3a85-665a6afa8300/public',
    'https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/d0c4c670-2cd8-411e-05cb-e40274c96400/public')
where id > 0 and product_category_id = 4;

select * from ecommerce_db.products;

